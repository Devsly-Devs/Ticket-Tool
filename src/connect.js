const MongoClient = require('mongodb').MongoClient;
const { url,dbName } = require('../config.json')
var connection;

MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, client) {
    if(err)throw err
    console.log("Successfully Connected")
    connection = client
})

const validatePanel = (msgID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('panel')
    collection.findOne(
            {
                messageID: `${msgID}`
            },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const validateGuild = (guID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('panel')
    collection.findOne(
            {
                guildID: `${guID}`
            },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const createPanel = (guID,auID,msgID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('panel')
    collection.insertOne(
        {
            authorID: `${auID}`,
            guildID: `${guID}`,
            messageID: `${msgID}`,
            time: new Date(),
        }, 
    async function(err, result) {
        if(err){
            console.log(err)
        }
        else{
            return await callback(result)
        }
    })
}

const setupDB = (auID,guID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('config')
    collection.insertOne(
        {
            authorID: `${auID}`,
            guildID: `${guID}`,
            transcript: {
                channel: null,
                webhookID: null,
                webhookToken: null
            },
            support: {
                roles: null
            },
            time: new Date(),
        }, 
    async function(err, result) {
        if(err){
            console.log(err)
        }
        else{
            return await callback(result)
        }
    })
}

const updateTranscript = (guID,chID,webhookID, webhookToken,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('config')
    collection.updateOne(
        {
            guildID: `${guID}`
        },
        {
            $set: {
                transcript: {
                    channel: chID,
                    webhookID: webhookID,
                    webhookToken: webhookToken
                }
            },
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const updateRoles = (guID,roles,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('config')
    collection.updateOne(
        {
            guildID: `${guID}`
        },
        {
            $set: {
                support: {
                    roles: roles
                },
            },
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const validateConfig = (guID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('config')
    collection.findOne(
        {
            guildID: `${guID}`
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const newTicket = (guID,auID,chID,msgID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.insertOne(
        {
            guildID: `${guID}`,
            authorID: `${auID}`,
            channelID: `${chID}`,
            messageID: `${msgID}`,
            add: [],
            status: null,
            time: new Date()
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const newTicketPanel = (guID,auID,chID,msgID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets-panel')

    collection.insertOne(
        {
            guildID: `${guID}`,
            authorID: `${auID}`,
            channelID: `${chID}`,
            messageID: `${msgID}`,
            status: null,
            time: new Date()
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const validateTicket_Guild = (guID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.findOne(
        {
            guildID: guID
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
} 

const validateTicket_Channel = (chID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.findOne(
        {
            channelID: chID
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const validateTicket_Author = (auID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.find({},
    {
        authorID: auID
    }).toArray(async function(err,result){
        if(err){
            console.log(err)
        }
        else{
            return await callback(result)
        }
    })
}

const validateTicketPanel_Guild = (guID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets-panel')

    collection.findOne(
        {
            guildID: guID
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
} 

const validateTicketPanel_Channel = (chID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets-panel')

    collection.findOne(
        {
            channelID: chID
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const validateTicketPanel_Author = (auID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets-panel')

    collection.findOne(
        {
            authorID: auID
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const ticketUpdateStatus_Close = (chID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.updateOne(
        {
            channelID: `${chID}`
        },
        {
            $set: {
                status: 'closed'
            }
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const ticketUpdateStatus_Reopen = (chID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.updateOne(
        {
            channelID: `${chID}`
        },
        {
            $set: {
                status: null
            }
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const ticketPanelUpdateStatus_Close = (chID,msgID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets-panel')

    collection.updateOne(
        {
            channelID: `${chID}`
        },
        {
            $set: {
                messageID: msgID,
                status: 'closed'
            }
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const ticketPanelUpdateStatus_Reopen = (chID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets-panel')

    collection.updateOne(
        {
            channelID: `${chID}`
        },
        {
            $set: {
                status: null
            }
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )
}

const updateTicketAdd = (chID,auID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.updateOne(
        {
            channelID: chID
        },
        {
            $push:{
                add: auID
            }
        },
        async function(err,result){
            if(err){
                console.log(err)
            }
            else{
                return await callback(result)
            }
        }
    )

}

const deleteTicket = (chID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets')

    collection.deleteOne(
        {
            channelID: `${chID}`
        },
        async (err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                return await callback(data)
            }
        }
    )
}

const deleteTicketPanel = (chID,callback)=>{
    const db = connection.db(dbName)
    const collection = db.collection('tickets-panel')

    collection.deleteOne(
        {
            channelID: `${chID}`
        },
        async (err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                return await callback(data)
            }
        }
    )
}

module.exports = { validatePanel, createPanel, validateGuild, setupDB, updateTranscript, updateRoles, validateConfig, newTicket, newTicketPanel, validateTicket_Guild, validateTicket_Channel, validateTicket_Author,validateTicketPanel_Guild, validateTicketPanel_Channel, validateTicketPanel_Author, ticketUpdateStatus_Close, ticketUpdateStatus_Reopen, ticketPanelUpdateStatus_Close, ticketPanelUpdateStatus_Reopen, updateTicketAdd, deleteTicket, deleteTicketPanel }
