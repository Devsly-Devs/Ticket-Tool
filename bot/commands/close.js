const close = require('../reactions/close')
const mongo = require('../src/connect')

module.exports = {
    name: 'close',
    description: 'Closes the order',
    cooldown: 3,
    guildOnly: true,
    async execute(message, args) {
        message.delete()
        mongo.validateTicket_Channel(message.channel.id,async (res)=>{
            if(res){
                if(!res.status){
                    close.ticket_close(message,message.author,res)
                }
                else{
                    return
                }
            }
        })
    }
}