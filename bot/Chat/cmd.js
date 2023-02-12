const cmd=require('node-cmd');
const { token } = require('../config.json')

function chatExport(channel,user){
    return new Promise((resolve,reject)=>{
        var cmdPrepare = `DiscordChatExporter.Cli.exe export -c ${channel} -t "${token}" -b True -o "${__dirname}\\docs\\${user}-${channel}.html"`
        cmd.run(`cd .\\Chat\\Discord\\ && ${cmdPrepare}`,(err,data,stderr)=>{
            if(data.indexOf('Done.') !== -1){
                resolve(__dirname + `\\docs\\${user}-${channel}.html`)
            }
            else{
                const data = {
                    err: err,
                    stderr: stderr
                }
                reject(data)
            }
        })
    })
}

module.exports = { chatExport }


