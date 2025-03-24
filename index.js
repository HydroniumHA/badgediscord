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
        interaction.reply("Mention!");
    }
});

const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Je suis online !✅'));
app.listen(port, () => console.log(`Your app is listening at http://localhost:${port}`));
