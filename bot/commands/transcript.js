const transcript = require('../reactions/transcript')
const mongo = require('../src/connect')

module.exports = {
    name: 'transcript',
    description: 'Saves transcript of that order',
    cooldown: 3,
    guildOnly: true,
    async execute(message, args, client) {
        message.delete()
        mongo.validateTicketPanel_Channel(message.channel.id,async (res)=>{
            if(res){
                transcript.create_transcript(message,message.author)
            }
        })
    }
}