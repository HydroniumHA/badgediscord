const { Client } = require("discord.js");

const bot = new Client({ intents: ["Guilds"] });
console.log("Connexion au bot...");
bot
  .login(process.env["TOKEN"])
  .then(() => console.log("Connecté au bot !"))
  .catch((error) =>
    console.log("Impossible de se connecter au bot - " + error)
  );

bot.on("ready", async () => {
  await bot.application.commands.set([
    {
      name: "ping",
      description: "Pong!",
    },
  ]);

  console.log("Le bot est prêt !");
});

bot.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") interaction.reply("Pong!");
});

const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("Je suis online !✅"));
app.listen(port, () =>
  console.log(`Your app is listening a http://localhost:${port}`)
);
