var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: "Mzk2MDY0MTY4OTYyMjkzNzcw.DScOHg.gyMXnoIrNfwbOcikp2pwr1Dbf_k"
});

var bot_online = false;
var shutdown_detected = false;
bot.on('ready', function(event) {

    console.log('Bot ' + bot.username + ' logged in - ' + bot.id + '\n');
    bot_online = true;

});

bot.on('disconnect', function(erMsg, code) {
    console.log('Bot disconnected from Discord with code ' + code + ' for reason:\n' + erMsg);
    bot_online = false;
    if (shutdown_detected == false) { bot.connect(); }
});