const Discord = require('discord.js')
const mongo = require('../src/connect')

function ticketMessage(id){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setTitle('**Ticket Closed**')
        .setDescription(`This ticket closed by <@${id}>`)
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

function ticket_close(message,user,result){
    try{
        mongo.ticketUpdateStatus_Close(message.channel.id,(res)=>{
            if(res){
                message.channel.updateOverwrite(result.authorID, { VIEW_CHANNEL: false }, 'Ticket Closed').then(m=>{
                    if(result.add){
                        for(let member of result.add){
                            message.channel.updateOverwrite(member, {VIEW_CHANNEL: false})
                            
                        }
                    }
                    message.channel.send(ticketMessage(user.id)).then(async msg=>{
                        await msg.react('🔓')
                        await msg.react('🗒️')
                        await msg.react('⛔').then(m => {
                            mongo.validateTicketPanel_Channel(message.channel.id,(res1)=>{
                                if(res1){
                                    mongo.ticketPanelUpdateStatus_Close(message.channel.id,msg.id,(res2)=>{
                                        if(res2){
                                            return console.log('Order Close Panel Updated and Order Closed')
                                        }
                                    })
                                }
                                else{
                                    mongo.newTicketPanel(message.guild.id,user.id,message.channel.id,msg.id,(r)=>{
                                        if(r){
                                            mongo.ticketPanelUpdateStatus_Close(message.channel.id,msg.id,(r1)=>{
                                                if(r1){
                                                    return console.log('Order Closed Successfully')
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    })
                })
            }
        })
    }
    catch(err){
        console.log(err)
        return message.channel.send(Wrong(user.id))
    }
    
}

module.exports = { ticket_close }