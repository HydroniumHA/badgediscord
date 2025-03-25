const {
  Client,
  GatewayIntentBits,
  ApplicationCommandOptionType,
} = require("discord.js");

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

console.log("Connexion au bot...");
bot
  .login(process.env["TOKEN"])
  .then(() => console.log("Connecté au bot !"))
  .catch((error) =>
    console.log("Impossible de se connecter au bot - " + error)
  );

// Cooldown global
let lastUsage = 0;
const globalCooldown = 30 * 1000; // 30 secondes

bot.on("ready", async () => {
  await bot.application.commands.set([
    {
      name: "ping",
      description: "Pong!",
    },
    {
      name: "mention",
      description: "Mentionne un utilisateur plusieurs fois",
      options: [
        {
          name: "utilisateur",
          description: "L'utilisateur à mentionner",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "nombre",
          description: "Nombre de fois où mentionner (max 20)",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
  ]);

  console.log("Le bot est prêt !");
});

bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }

  if (interaction.commandName === "mention") {
    const now = Date.now();

    if (now - lastUsage < globalCooldown) {
      const timeLeft = Math.ceil((lastUsage + globalCooldown - now) / 1000);
      return interaction.reply({
        content: `⏳ La commande est en cooldown ! Attendez encore ${timeLeft} secondes avant qu'un autre utilisateur puisse l'utiliser.`,
        ephemeral: true,
      });
    }

    lastUsage = now; // Met à jour le cooldown global

    const user = interaction.options.getUser("utilisateur");
    let count = interaction.options.getInteger("nombre");

    if (count > 20) count = 20; // Limite à 20 mentions max

    await interaction.reply({
      content: `Mention de ${user} en cours...`,
      ephemeral: true,
    });

    for (let i = 0; i < count; i++) {
      await interaction.channel.send(`${user}`);
    }
  }
});

// Express server
const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("Je suis online !✅"));
app.listen(port, () =>
  console.log(`Your app is listening at http://localhost:${port}`)
);
