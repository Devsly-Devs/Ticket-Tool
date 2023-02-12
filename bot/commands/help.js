const Discord = require('discord.js')
const { prefix } = require('../config.json')

function menu(){
    return new Discord.MessageEmbed()
        .setColor('#bbf1c8')
        .setDescription(`\`${prefix}add <Mention || ID>\` - **Helps to add a member to ticket**\n
                        \`${prefix}close\` - **Closes the ticket**\n
                        \`${prefix}config [command] [value]\` - **A Configuration to server**\n
                        \`${prefix}delete\` - **Deletes the order**\n
                        \`${prefix}help\` - **A Help Menu**\n
                        \`${prefix}panel\` - **Helps to create ticket panel**\n
                        \`${prefix}reopen\` - **Reopens the closed ticket**\n
                        \`${prefix}setup\` - **Helps to setup the server and in DB**\n
                        \`${prefix}transcript\` - **Saves the order transcript through webhook**`)
        .setTimestamp()
        .setFooter('White2001#0530™  - Type $help 🎵','https://cdn.discordapp.com/avatars/774628881910202378/548e0caa288842504514596856039e9c.png?size=256');
}

module.exports = {
    name: 'help',
    description: 'Help menu',
    cooldown: 3,
    guildOnly: true,
    async execute(message, args) {
        return message.channel.send(menu())
    }
}