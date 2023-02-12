const Discord = require('discord.js')
const mongo = require('../src/connect')

function ticketMessage(id){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setTitle('**Kicked From Plan Ticket**')
        .setDescription(`Hello <@${id}> ,\nPlease post these below to get replacement\n\n**1.** Shoppy Email and Spotify Email. (If both are same then just send the email only once)\n**2.** Shoppy Order ID\n**3.** Screenshot of Shoppy where the order ID and Email should be visible\n**4.** Screenshot of Spotify which you got kicked where the Date and Email should be Visible\n**5.** Your Key (Which you used to redeem)\n\nIf Failed to provide this information. Our Support member will close this ticket without any prior notice and you'll not get any replacement`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function SpamTicket(auID,chID){
    return new Discord.MessageEmbed()
        .setColor('#28df99')
        .setDescription(`<@${auID}> You've Already a Ticket opened at <#${chID}>`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

function verify_closed(res){
    var response = {
        status: false,
        channel: null
    }
    for(data of res){
        if(data.status !== 'closed'){
            response.status = true
            response.channel = data.channelID
            break
        }
    }
    return response
}

function kick_ticket(message,user){
    mongo.validateTicket_Author(user.id,async (res)=>{
        try{
            status = verify_closed(res)
            if(status.status === true){
                return user.send(SpamTicket(user.id,status.channel))
            }
            else{
                await message.guild.channels.create(`kicked-${user.username}`, {
                    type: 'text', 
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                    ],
                }).then(channel=>{
                    mongo.validateConfig(message.guild.id,(r)=>{
                        if(r){
                            if(r.support.roles){
                                let roles = r.support.roles.split(',')
                                for(let role of roles){
                                    channel.updateOverwrite(role, { VIEW_CHANNEL: true})
                                }
                            }
    
                            channel.send(`<@${user.id}>`)
                            channel.send(ticketMessage(user.id)).then(async msg=>{
                                await msg.react('🔒').then(m => {
                                    mongo.newTicket(msg.guild.id,user.id,channel.id,msg.id,(result)=>{
                                        if(result){
                                            console.log('New Ticket Created Successfully')
                                        }
                                    })
                                })
                            })
                        }
                    })
                })
            }
        } 
        catch(error){

        } 
    })
}

module.exports = { kick_ticket }