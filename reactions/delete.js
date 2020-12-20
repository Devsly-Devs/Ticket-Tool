const Discord = require('discord.js')
const mongo = require('../src/connect')
const delay = require('delay')

function ticketMessage(){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setTitle('**Ticket Delete**')
        .setDescription(`This ticket will be deleted in 5 seconds`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function Wrong(auID){
    return new Discord.MessageEmbed()
        .setColor('#28df99')
        .setDescription(`<@${auID}> Something Went wrong. Please Try again`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function ticket_delete(message,user){
    mongo.validateTicket_Channel(message.channel.id,(result)=>{
        if(result){
            message.channel.send(ticketMessage()).then(async msg=>{
                await delay(5000).then(m=>{
                    mongo.deleteTicket(msg.channel.id,(res)=>{
                        if(res){
                            mongo.deleteTicketPanel(msg.channel.id,(res1)=>{
                                if(res1){
                                    msg.channel.delete().then(m1=>{
                                    }).catch(err=>{
                                        throw err
                                    })
                                }
                                else{
                                    return message.channel.send(Wrong(user.id))
                                }
                            })
                        }
                        else{
                            return message.channel.send(Wrong(user.id))
                        }
                    })
                    
                })
            })
        }
    })
}

module.exports = { ticket_delete }