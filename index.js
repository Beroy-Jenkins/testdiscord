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
    bot.sendMessage({ to: meuId, message: "Pronto 3 " });

});

bot.on('disconnect', function (erMsg, code) {
    console.log('Bot disconnected from Discord with code ' + code + ' for reason:\n' + erMsg);
    bot_online = false;
    if (shutdown_detected == false) { bot.connect(); }
});

//test

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
            help (user, userID, channelID, message, rawEvent); 
        } else if (message_command.startsWith(prefix + "fale")) {
            fale (user, userID, channelID, message, rawEvent);
        } else if (message_command.startsWith(prefix + "userinfo")) {
            userinfo (user, userID, channelID, message, rawEvent);
        } else if ( message_command.startsWith(prefix +  "ment")){
            ment (user, userID, channelID, message, rawEvent);
        } else if ( message_command.startsWith(prefix +  "all")){
            all (user, userID, channelID, message, rawEvent);
        } else if ( message_command.startsWith(prefix +  "test")){
            test (user, userID, channelID, message, rawEvent);
        } else if (message_command.startsWith(prefix + "random")) {
            random (user, userID, channelID, message, rawEvent);
        } else if (message_command.startsWith(prefix + "ppt")) {
            ppt (user, userID, channelID, message, rawEvent);
        }else if (message_command.startsWith(prefix + "5test")) {
            channel_perm(channelID, {
                "type": "", 
                "once": "deny", 
                "perm": "SEND_MESSAGES", 
                "roleID": "",
                "number": true
               });
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
    bot.sendMessage({ to: "156247284475101185", message: ":oi: " });
    bot.sendMessage({ to: "243037223610482688", message: "Vai se Fuder" });
    bot.sendMessage({ to: "217840242789580801", message: "Vai se Fuder" });
}, 5000);// enventos baseado em mensagens



function help (user, userID, channelID, message, rawEvent) {
    bot.sendMessage({ to: channelID, message:"```||test\n||random\n||ppt\n||fale```" });
}

function fale (user, userID, channelID, message, rawEvent) {
    var message_command = message.substring(6,message.length);    
    bot.sendMessage({ to: channelID, message: message_command });
     bot.deleteMessage({
        channelID: channelID,
        messageID: rawEvent.d.id
    });
}
function userinfo (user, userID, channelID, message, rawEvent) {
    if(message.mentions.users.first()) { //Check if the message has a mention in it.
        let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
        let output = user.username + user.discriminator /*Username and Discriminator*/ +
        "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
        message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
        message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
    }
}
function ment (user, userID, channelID, message, rawEvent) {
    var s = message_command.replace(/[^0-9\.]+/g, '');
            bot.sendMessage({
                to: channelID,
                message: "<@" + s + ">"
            });
}
function all (user, userID, channelID, message, rawEvent) {
    bot.sendMessage({
        to: channelID,
        message: bot.getAllUsers()
    });
}
function random (user, userID, channelID, message, rawEvent) {
    bot.sendMessage({ to: channelID, message:  user + " " + getRandomInt(0,100)});
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
              }
}
function ppt (user, userID, channelID, message, rawEvent) {
        var jogador1 = userID;
        if (message_command.startsWith(prefix + "ppt"+" ")) {
            var jogador2 = message_command.substring(6, message_command.length)
            bot.sendMessage({ to: channelID, message: "<@"+jogador1+">"+" "+jogador2});
        }else{
            bot.sendMessage({ to: channelID, message:  "bot"});
            console.log(jogador2,jogador1)  
        }
}
function test (user, userID, channelID, message, rawEvent) {
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
                , { name: "bot", id: "396872885882322965", message: "Beroy's Dog" }
                , { name: "test", id: "id", message: "messagem" }
             ];     
        console.log(usernalista);
        for (var i=0; i< test.length; i++ ){
            if(userID === test[i].id){
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



function fale (user, userID, channelID, message, rawEvent) {
}

function channel_perm(roles, data) {

    if ((typeof roles == "string") && (bot.channels[roles])) {
        roles = bot.channels[roles].permissions;
    }

    if (Object.prototype.toString.call(roles) == "[object Object]") {

        function get_perm_l(the_value) {
            var permission_allow = [];
            var permission_deny = [];

            function insert_ind(finalxs1, finalxs2, boxtypexs) {
                var tv_here = 1 << Discord.Permissions[finalxs1] & finalxs2;
                if ((data) && (data.number == true)) {} else {
                    if (tv_here == 0) {
                        var tv_here = false;
                    } else {
                        var tv_here = true;
                    }
                }
                if (boxtypexs == "allow") {
                    permission_allow = { "number": Discord.Permissions[finalxs1], "value": tv_here };
                } else if (boxtypexs == "deny") {
                    permission_deny = { "number": Discord.Permissions[finalxs1], "value": tv_here };
                }
            }

            if ((data) && (data.perm)) {

                if (data.once == "allow") {
                    if (the_value.allow) {
                        insert_ind(data.perm, the_value.allow, "allow");
                    }
                } else if (data.once == "deny") {
                    if (the_value.deny) {
                        insert_ind(data.perm, the_value.deny, "deny");
                    }
                } else {
                    if ((the_value.allow) && (the_value.deny)) {
                        insert_ind(data.perm, the_value.allow, "allow");
                        insert_ind(data.perm, the_value.deny, "deny");
                    }
                }

            } else {

                for (var items in Discord.Permissions) {

                    if ((data) && (data.type == "allow")) {
                        if (the_value.allow) {
                            insert_ind(items, the_value.allow, "allow");
                        }
                    } else if ((data) && (data.type == "deny")) {
                        if (the_value.deny) {
                            insert_ind(items, the_value.deny, "deny");
                        }
                    } else {
                        if ((the_value.allow) && (the_value.deny)) {
                            insert_ind(items, the_value.allow, "allow");
                            insert_ind(items, the_value.deny, "deny");
                        }
                    }

                }

            }

            if ((data) && (data.once == "allow")) {
                if ((the_value.allow) && (data.per == true)) {
                    return { "value": permission_allow, "per": the_value.allow };
                } else {
                    return permission_allow;
                }
            } else if ((data) && (data.once == "deny")) {
                if ((the_value.deny) && (data.per == true)) {
                    return { "value": permission_deny, "per": the_value.deny };
                } else {
                    return permission_deny;
                }
            } else {
                if ((data) && (data.per == true)) {
                    if ((the_value.allow) && (the_value.deny)) {
                        return { "deny": permission_deny, "allow": permission_allow, "d": the_value.allow, "a": the_value.deny };
                    } else {

                        if (the_value.allow) {
                            return { "deny": permission_deny, "allow": permission_allow, "a": the_value.deny };
                        } else
                        if (the_value.deny) {
                            return { "deny": permission_deny, "allow": permission_allow, "d": the_value.allow };
                        } else {
                            return { "deny": permission_deny, "allow": permission_allow };
                        }

                    }
                } else {
                    return { "deny": permission_deny, "allow": permission_allow };
                }
            }

        }

        // Select Role or User to get the list

        function get_selector(data2) {
            if ((data2 == "role") || (data2 == "user")) {

                var the_list = {};
                if (data2 == "role") {
                    if ((data) && (data.roleID)) {
                        if (roles.role[data.roleID]) {
                            var the_list = get_perm_l(roles.role[data.roleID]);
                        } else if (data.auto == true) {
                            if (roles.role) {
                                for (var k3 in roles.role) {
                                    the_list[k3] = get_perm_l(roles.role[k3]);
                                }
                            } else {
                                var the_list = null;
                            }
                        } else {
                            var the_list = null;
                        }
                    } else {
                        if (roles.role) {
                            for (var k3 in roles.role) {
                                the_list[k3] = get_perm_l(roles.role[k3]);
                            }
                        } else {
                            var the_list = null;
                        }
                    }
                } else if (data2 == "user") {
                    if ((data) && (data.userID)) {
                        if (roles.user[data.userID]) {
                            var the_list = get_perm_l(roles.user[data.userID]);
                        } else if (data.auto == true) {
                            if (roles.user) {
                                for (var k3 in roles.user) {
                                    the_list[k3] = get_perm_l(roles.user[k3]);
                                }
                            } else {
                                var the_list = null;
                            }
                        } else {
                            var the_list = null;
                        }
                    } else {
                        if (roles.user) {
                            for (var k3 in roles.user) {
                                the_list[k3] = get_perm_l(roles.user[k3]);
                            }
                        } else {
                            var the_list = null;
                        }
                    }
                }
                return the_list;

            } else {
                return null;
            }
        }

        // Select only the permission variable list
        if ((data) && (data.type == "user")) {
            return get_selector("user");
        } else if ((data) && (data.type == "role")) {
            return get_selector("role");
        } else {
            return { "user": get_selector("user"), "role": get_selector("user") };
        }

    } else {
        return null;
    }

}