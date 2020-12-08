const reopen = require('../reactions/reopen')
const mongo = require('../src/connect')

module.exports = {
    name: 'reopen',
    description: 'Reopens the order',
    cooldown: 3,
    guildOnly: true,
    async execute(message, args, client) {
        message.delete()
        mongo.validateTicketPanel_Channel(message.channel.id,async (res)=>{
            if(res){
                if(res.status === 'closed'){
                    reopen.ticket_reopen(message,message.author,res,client)
                }
                else{
                    return
                }
            }
        })
    }
}