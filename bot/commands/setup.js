const Discord = require('discord.js')
const mongo = require('../src/connect')

function alreadyDone(id){
    return new Discord.MessageEmbed()
        .setColor('#ff4b5c')
        .setDescription(`<@${id}> This server is already registered`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function success(id){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setDescription(`<@${id}> This server is successfully registered`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function noAdmin(id){
    return new Discord.MessageEmbed()
        .setColor('#ff4b5c')
        .setDescription(`<@${id}> You're not a Admin`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

module.exports = {
    name: 'setup',
    description: 'Helps to Register Server',
    cooldown: 3,
    guildOnly: true,
    async execute(message, args) {
        message.delete()
        if(message.member.hasPermission('ADMINISTRATOR')){
            mongo.validateConfig(message.guild.id,(result)=>{
                if(result){
                    return message.channel.send(alreadyDone(message.author.id)).then(msg=>{
                        msg.delete({timeout:15000})
                    })
                }
                else{
                    mongo.setupDB(message.author.id,message.guild.id,(res)=>{
                        if(res){
                            return message.channel.send(success(message.author.id)).then(msg=>{
                                msg.delete({timeout:15000})
                            })
                        }
                    })
                }
            })
        }
        else{
            return message.channel.send(noAdmin(message.author.id)).then(msg=>{
                msg.delete({timeout: 15000})
            })
        }
    }
}