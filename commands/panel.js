const Discord = require('discord.js')
const mongo = require('../src/connect.js')

function noAdmin(id){
    return new Discord.MessageEmbed()
        .setColor('#ff4b5c')
        .setDescription(`<@${id}> You're not a Admin`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function alreadyDone(id){
    return new Discord.MessageEmbed()
        .setColor('#ff4b5c')
        .setDescription(`<@${id}> This server has already have panel. You can't create another one`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function panelMenu(){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setTitle('Spotify Ticket')
        .setDescription('Please React to this ticket which justifies your problem')
        .addField('General Questions','❓\n',true)
        .addField('\u200B','\u200B',true)
        .addField('Paypal Related Queries','💳\n',true)
        .addField('Reselling Related Queries','🎵\n',true)
        .addField('\u200B','\u200B',true)
        .addField('Kicked From Plan','🛠️\n',true)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

module.exports = {
    name: 'panel',
    description: 'Redeem the Order',
    cooldown: 3,
    guildOnly: true,
    async execute(message, args) {
        message.delete()
        if(message.member.hasPermission('ADMINISTRATOR')){
            mongo.validateGuild(message.guild.id,(result)=>{
                if(result){
                    return message.channel.send(alreadyDone(message.author.id)).then(msg=>{
                        msg.delete({timeout:15000})
                    })
                }
                else{   
                    message.channel.send(panelMenu()).then(msg=>{
                        mongo.createPanel(message.guild.id,message.author.id,msg.id,async (res)=>{
                            if(res){
                                await msg.react('❓')
                                await msg.react('💳')
                                await msg.react('🎵')
                                await msg.react('🛠️')
                            }
                        })
                    })
                }
            })
            
        }
        else{
            return message.channel.send(noAdmin(message.author.id)).then(msg=>{
                msg.delete({timeout:15000})
            })
        }
    }
}