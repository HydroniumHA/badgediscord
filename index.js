const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require("discord.js");

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

console.log("Connexion au bot...");
bot.login(process.env["TOKEN"])
    .then(() => console.log("Connecté au bot !"))
    .catch((error) => console.log("Impossible de se connecter au bot - " + error));

const cooldowns = new Map();

bot.on("ready", async () => {
    await bot.application.commands.set([
        {
            name: "ping",
            description: "Pong!"
        },
        {
            name: "mention",
            description: "Mentionne un utilisateur plusieurs fois",
            options: [
                {
                    name: "utilisateur",
                    description: "L'utilisateur à mentionner",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: "nombre",
                    description: "Nombre de fois où mentionner (max 5)",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        }
    ]);

    console.log("Le bot est prêt !");
});

bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
        interaction.reply("Pong!");
    }

    if (interaction.commandName === "mention") {
        const user = interaction.options.getUser("utilisateur");
        let count = interaction.options.getInteger("nombre");

        if (count > 20) count = 20; // Limite à 5 mentions max

        const userId = interaction.user.id;
        const now = Date.now();
        const cooldownAmount = 10 * 1000; // 10 secondes

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = Math.ceil((expirationTime - now) / 1000);
                return interaction.reply({ content: `⏳ Attends encore ${timeLeft} secondes avant de réutiliser cette commande !`, ephemeral: true });
            }
        }

        cooldowns.set(userId, now);
        setTimeout(() => cooldowns.delete(userId), cooldownAmount);

        let message = `${user} `.repeat(count);
        await interaction.reply(message);
    }
});

const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Je suis online !✅'));
app.listen(port, () => console.log(`Your app is listening at http://localhost:${port}`));
