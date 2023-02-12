const Discord = require('discord.js')
const mongo = require('../src/connect')
const chat = require('../Chat/cmd')

function ticketMessage(channel,user){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setTitle(`Transcript of ${user.name}#${user.tag}`)
        .addField('Ticket Owner',`<@${user.id}>`,true)
        .addField('Ticket Name',`${channel.name}`,true)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function transcriptMessage(){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setDescription('Transcript Saved')
}

function transcripting(){
    return new Discord.MessageEmbed()
        .setColor('#fbd46d')
        .setDescription('Transcript Saving')
}

function Wrong(auID){
    return new Discord.MessageEmbed()
        .setColor('#c70039')
        .setDescription(`<@${auID}> Something Went wrong. Ensure you have defined the proper transcript channel with $config transcript <channelID> command.`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function create_transcript(message,user){
    mongo.validateTicket_Channel(message.channel.id,(res)=>{
        if(res){
            mongo.validateConfig(message.guild.id,(config)=>{
                if(config){
                    message.channel.send(transcripting()).then(msg=>{
                        const webhookClient = new Discord.WebhookClient(`${config.transcript.webhookID}`, `${config.transcript.webhookToken}`);
                        chat.chatExport(message.channel.id,user.username).then(file=>{
                            const embed = new Discord.MessageEmbed()
                                .setColor('#bbf1c8')
                                .setTitle(`Transcript executed by ${user.tag}`)
                                .addField('Ticket Owner',`<@${res.authorID}>`,true)
                                .addField('Ticket Name',`${message.channel.name}`,true)
                                .setTimestamp()
                                .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');

                            webhookClient.send({
                                username: 'Transcript',
                                files: [`${file}`],
                                embeds: [embed]
                            }).then(m=>{
                                return msg.edit(transcriptMessage())
                            }).catch(err=>{
                                console.log(err)
                                return msg.edit(Wrong(user.id))
                            }).catch(err => {
                            console.log(err)
                            });
                        })
                    })
                    
                }
            })
        }
    })
}

module.exports = { create_transcript }
