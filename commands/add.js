const Discord = require('discord.js')
const mongo = require('../src/connect');

function noArgs(id){
    return new Discord.MessageEmbed()
        .setColor('#ff4b5c')
        .setDescription(`<@${id}> You didn't specified any argument`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function added(id){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setDescription(`<@${id}> Added to Ticket`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function author(client,args){
    return new Promise((resolve,reject)=>{
        client.users.fetch(args[0]).then(au=>{
            resolve(au)
        }).catch(err=>{
            reject(err)
        })
    })
}

module.exports = {
    name: 'add',
    description: 'Adds new user to ticket',
    cooldown: 3,
    guildOnly: true,
    args: true,
    usage: `<@mention> || <MemberID> `,
    async execute(message, args, client) {
        message.delete()
        if(message.mentions.users.size){
            const ID = message.mentions.users.first()
            var auID = ID.id
            mongo.validateTicket_Channel(message.channel.id,(res)=>{
                if(res){
                    message.channel.updateOverwrite(auID, {VIEW_CHANNEL: true}, 'Added to Order').then(m=>{
                        mongo.updateTicketAdd(message.channel.id, auID, (r)=>{
                            if(r){
                                return message.channel.send(added(auID))
                            }
                        })
                    })
                }
            })
        }
        else{
            author(client,args).then(auID=>{
                mongo.validateTicket_Channel(message.channel.id,(res)=>{
                    if(res){
                        message.channel.updateOverwrite(auID, {VIEW_CHANNEL: true}, 'Added to Order').then(m=>{
                            mongo.updateTicketAdd(message.channel.id, auID.id, (r)=>{
                                if(r){
                                    return message.channel.send(added(auID.id))
                                }
                            })
                        })
                    }
                })
            })
        }
        
    }
}