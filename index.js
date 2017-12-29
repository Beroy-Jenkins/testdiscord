var Discord = require('discord.io');
var root_folder = __dirname + "/";
var prefix = "?";
var fs = require('fs');
var request = require('request');

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


// enventos baseado em mensagens
bot.on('message', function(user, userID, channelID, message, rawEvent) {
    var message_command = message.toLowerCase();
    if (rawEvent.d.author.bot != true ) {

        if (message_command.startsWith(prefix + "edit ")) {

            if (message_command.startsWith(prefix + "edit avatar")) {
                if (rawEvent.d.attachments.length > 0) {

                    if ((rawEvent.d.attachments[0].url.endsWith(".png")) || (rawEvent.d.attachments[0].url.endsWith(".jpg")) || (rawEvent.d.attachments[0].url.endsWith(".gif"))) {

                        if (rawEvent.d.attachments[0].url.endsWith(".png")) { var finalfile_name = "png"; } else if (rawEvent.d.attachments[0].url.endsWith(".jpg")) { var finalfile_name = "jpg"; } else if (rawEvent.d.attachments[0].url.endsWith(".gif")) { var finalfile_name = "gif"; }

                        fs.unlink(root_folder + "custom_avatar." + finalfile_name, function() {


                            var download = function(uri, filename, callback) {
                                request.head(uri, function(err, res, body) {
                                    bot.sendMessage({ to: channelID, message: "**Downloading Image...** " });
                                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                                });
                            };

                            download(rawEvent.d.attachments[0].url, root_folder + "custom_avatar." + finalfile_name, function() {
                                bot.editUserInfo({ avatar: fs.readFileSync(root_folder + "custom_avatar." + finalfile_name, 'base64') });
                                bot.sendMessage({ to: channelID, message: "**Download complete. Yaaaaaay new avatar!** " });
                            });

                        });

                    } else { bot.editUserInfo({ avatar: fs.readFileSync(root_folder + "data/bot_image/avatar.png", 'base64') }); }
                } else { bot.editUserInfo({ avatar: fs.readFileSync(root_folder + "data/bot_image/avatar.png", 'base64') }); }
            } else if (message_command.startsWith(prefix + "edit username ")) {
                bot.editUserInfo({ username: message.replace(prefix + "edit username ", "") });
            }

}






    }
});

// bot.createDMChannel("152145019296284672", function(err, myprivatechannel) {
//     if (err) { console.log(err); } else {
//     bot.sendMessage({ to: myprivatechannel.id, message: "oi"});
//     }
// });

setTimeout(function(){
    bot.sendMessage({ to: "152145019296284672", message: "--boop--"});
    bot.sendMessage({ to: "156247284475101185", message: ":oi: "});
    bot.sendMessage({ to: "298878817664237569", message: ":crystal_ball: "});
    // bot.sendMessage({ to: "152145019296284672", message: "oi"});
    // bot.sendMessage({ to: "152145019296284672", message: "oi"});
     },5000);

