const ticket = require('../reactions/delete')
const mongo = require('../src/connect')

module.exports = {
    name: 'delete',
    description: 'Deletes the order',
    cooldown: 3,
    guildOnly: true,
    async execute(message, args, client) {
        message.delete()
        mongo.validateTicketPanel_Channel(message.channel.id,async (res)=>{
            if(res){
                ticket.ticket_delete(message,message.author)
            }
        })
    }
}