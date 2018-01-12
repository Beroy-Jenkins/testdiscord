// -------------------------------------------------Variaveis Globais
var Discord = require('discord.io')
    ,root_folder = __dirname + "/"
    ,prefix = "||"
    ,fs = require('fs')
    ,request = require('request')
    ,meuId = "156247284475101185" 
    ;


var bot = new Discord.Client({
    autorun: true,
    //token: "Mzk2MDY0MTY4OTYyMjkzNzcw.DScOHg.gyMXnoIrNfwbOcikp2pwr1Dbf_k"
    token: "Mzk2ODcyODg1ODgyMzIyOTY1.DSnyoQ.dwzvFXB6D9x80105qckPWcdqsTQ"
});

var bot_online = false;
var shutdown_detected = false;
bot.on('ready', function (event) {

    console.log('Bot ' + bot.username + ' logged in - ' + bot.id + '\n');
    bot_online = true;
    bot.sendMessage({ to: meuId, message: "Pronto " });

});

bot.on('disconnect', function (erMsg, code) {
    console.log('Bot disconnected from Discord with code ' + code + ' for reason:\n' + erMsg);
    bot_online = false;
    if (shutdown_detected == false) { bot.connect(); }
});


// enventos baseado em mensagens
bot.on('message', function (user, userID, channelID, message, rawEvent) {
   
    var message_command = message.toLowerCase();
    if (!rawEvent.d.author.bot) {       //Varifica se não foi o bot q enviou as menssagens
        bot.sendMessage({ to: meuId, message: "sucess "+user });
        console.log(user);

         //----------------------------------------cria um canal pra encaminha minhas dms
         if(userID != meuId){
            bot.createDMChannel(userID, function (err, myprivatechannel) {
                if (channelID == myprivatechannel.id) {
                    var get_printshere = "";
                    if (rawEvent.d.attachments != undefined) { // verifica se há arquivos
                        if (rawEvent.d.attachments.length > 0) {
                            var get_printshere = "\n\n**Files:**\n"
                            for (i = 0; i < rawEvent.d.attachments.length; i++) {
                                var get_printshere = get_printshere + rawEvent.d.attachments[i].url + "\n";
                            }
                        }
                    }
                    bot.sendMessage({
                        to: meuId,
                        message: "<@" + userID + ">:\n" +
                            message + get_printshere
                    });
                }

            });
        }

          //--------------------      Comandos
        //     var person = bot.servers["369924373056061450"].members["156247284475101185"];
        // bot.sendMessage({ to: meuId, message: "id "+person.id});
        // bot.sendMessage({ to: meuId, message: "avatar "+person.avatar});
        //sendMessage({ to: channelID, message: my_message });

        if (message_command.startsWith(prefix + "help")) {
            bot.sendMessage({ to: channelID, message:"```||test\n||random\n||ppt\n||userinfo```" });

            }
        if (message_command.startsWith(prefix + "userinfo")) {
                if(message.mentions.users.first()) { //Check if the message has a mention in it.
                        let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
                        let output = user.username + user.discriminator /*Username and Discriminator*/ +
                        "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
                        message.channel.sendMessage(output); //We send the output in the current channel.
                } else {
                        message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
                }
        }
        if( message_command.startsWith(prefix +  "ment")){
            bot.sendMessage({
                to: channelID,
                message: "<@" + userID + ">"
                

            });
        }
        if( message_command.startsWith(prefix +  "all")){
            bot.sendMessage({
                to: channelID,
                message: bot.getAllUsers()
                

            });
        }

        if( message_command.startsWith(prefix +  "test")){
            if(userID === meuId ){
                bot.sendMessage({ to: channelID, message: userID + " " + user});
            } else {
                var  usernalista = false
                    , test = [
                        { name: "lanfour", id: "232940764609380352", message: " Irmão do Lanfive" }
                        , { name: "coffe", id: "298878817664237569", message: " With milk" }
                        , { name: "meli", id: "243037223610482688", message: " Vai se Fuder meli" }
                        , { name: "bmonster", id: "150772264948727810", message: " Ech" }
                        , { name: "isacc", id: "171264412785704960", message: " Bobo" }
                        , { name: "jasmin", id: "152145019296284672", message: " Bu!" }
                        , { name: "rafa", id: "214205021561159680", message: " Tnc rafa" }
                        , { name: "pedro", id: "204015663713484801", message: " Você é D+" }
                        , { name: "tonso", id: "251449899483267072", message: "Viciado" }
                        , { name: "grim", id: "217840242789580801", message: "Tnc grim" }
                        , { name: "prim", id: "251449909495070720", message: "Main adc" }
                        , { name: "dark", id: "241960248569626625", message: "Calma cara" }
                        , { name: "gordo", id: "260198885723471872", message: "Backstab" }
                        , { name: "test", id: "id", message: "messagem" }
                     ];     
                console.log(usernalista);
                for (var i=0; i< test.length; i++ ){
                    if(userID === test[i].name){
                        bot.sendMessage({ to: channelID, message: userID+ " " + user+ " " + test[i].message});
                        usernalista = true;
                        break;
                    }

                }
                if(!usernalista ){
                    bot.sendMessage({ to: channelID, message: ":pizza:"});
                }
                    
            }
        }

        if (message_command.startsWith(prefix + "random")) {
            bot.sendMessage({ to: channelID, message:  user + " " + getRandomInt(0,100)});
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
              }


        }
        if (message_command.startsWith(prefix + "ppt")) {
            var jogador1 = this.userID
            if (message_command.startsWith(prefix + "ppt " +"<@" + userID + ">")) {
                var jogador2 = this.userID
                bot.sendMessage({ to: channelID, message: jogador1+""+jogador2});
                console.log(jogador2,jogador1)
            }else{
            bot.sendMessage({ to: channelID, message:  "bot"});
            console.log(jogador2,jogador1)
            }
        }



        //---------------------Muda o avatar e o nome do bot
        if (message_command.startsWith(prefix + "edit")) {

            if (message_command.startsWith(prefix + "edit avatar")) {
                if (rawEvent.d.attachments.length > 0) {

                    if ((rawEvent.d.attachments[0].url.endsWith(".png")) || (rawEvent.d.attachments[0].url.endsWith(".jpg")) || (rawEvent.d.attachments[0].url.endsWith(".gif"))) {
                        if (rawEvent.d.attachments[0].url.endsWith(".png")) { var finalfile_name = "png"; }
                        else if (rawEvent.d.attachments[0].url.endsWith(".jpg")) { var finalfile_name = "jpg"; }
                        else if (rawEvent.d.attachments[0].url.endsWith(".gif")) { var finalfile_name = "gif"; }

                        fs.unlink(root_folder + "custom_avatar." + finalfile_name, function () {
                            var download = function (uri, filename, callback) {
                                request.head(uri, function (err, res, body) {
                                    bot.sendMessage({ to: channelID, message: "**Downloading Image...** " });
                                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                                });
                            };

                            download(rawEvent.d.attachments[0].url, root_folder + "custom_avatar." + finalfile_name, function () {
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

setTimeout(function () {
    //bot.sendMessage({ to: "152145019296284672", message: "--boop--" });
    bot.sendMessage({ to: "156247284475101185", message: ":oi: " });
    bot.sendMessage({ to: "243037223610482688   ", message: "Vai se Fuder" });
   // bot.sendMessage({ to: "273529325217906688", message: "gata nojenta" });
}, 5000);// enventos baseado em mensagens