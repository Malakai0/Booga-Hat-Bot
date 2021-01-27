// https://glitch.com/edit/#!/booga-booga-twich-communication
const Discord = require('discord.js');
const express = require("express");
const fs = require('fs');

const app = express();
const client = new Discord.Client();

const BoogaDiscord = "615614976916324352";
const TwitchSubscriberRoleID = "629439055876325408";

const TRUE = "true";
const FALSE = "false";
const NULL = undefined;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

app.get("/", (request, response) => {
    var BoogaCord = client.guilds.cache.get(BoogaDiscord);
    var Username = request.headers['roblox-name'];
    if (BoogaCord !== NULL && Username !== NULL){
        
        var User = BoogaCord.members.cache.map((member) => member.nickname == Username);

        if (User !== NULL){
            var OwnsRole = User.roles.cache.has(TwitchSubscriberRoleID);

            if (OwnsRole){
                response.send(TRUE); // User IS subscribed to Soybeen's Twitch.
            }else{
                response.send(FALSE); // User is not subscribed to Soybeen's Twitch.
            }

        }else{
            response.send(FALSE); // User is not in Discord.
        }

    }else{
        response.send(FALSE); // Not in the server or an invalid request.
    }
});

const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

client.login(fs.readFileSync("token.txt", "utf-8"));