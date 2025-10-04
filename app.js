/***************************************************************************
* Objetivo: API responsável em criar endPoints
* Data: 24/09/2022  
* Autor: Marcel
* Versão: 1.0
 ***************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const dados = require('./modulo/funcoes.js')

const PORT = process.env.PORT || 3000

const app = express()

// Configurações do CORS
app.use(cors())
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET') //Métodos (Verbos) do protocólo HTTP

    next()
})


//EndPoint

//getAllUsersAndContacts
app.get('/v1/whatsapp', function(request, response){
    let userAndContacts = dados.getAllUsersAndContacts()

    response.status(userAndContacts.statuscode)
    response.json(userAndContacts)
})



//getProfileInfoByNumber
app.get('/v1/whatsapp/:number/profile', function(request, response){
    let numeroUser = request.params.number
    let perfil = dados.getProfileInfoByNumber(numeroUser)

    response.status(perfil.statuscode)
    response.json(perfil)
})



//getContactsOfUser
app.get('/v1/whatsapp/:number/contacts', function(request, response){
    let numeroUser = request.params.number
    let contatos = dados.getContactsOfUser(numeroUser)
    
    response.status(contatos.statuscode)
    response.json(contatos)
})



//getMessagesForUser
app.get('/v1/whatsapp/:number/messages', function(request, response){
    let numeroUser = request.params.number
    let messages = dados.getMessagesForUser(numeroUser)

    response.status(messages.statuscode)
    response.json(messages)
})

//getConversationUserContacts
app.get('/v1/whatsapp/conversation', function(request, response){
    let numeroUser = request.query.numberUser
    let numeroContact = request.query.numberContact

    let conversation = dados.getConversationUserContacts(numeroUser, numeroContact)

    response.status(conversation.statuscode)
    response.json(conversation)
})



//FilterWordKey
app.get('/v1/whatsapp/wordkey', function(request, response){
    let numeroUser = request.query.numberUser
    let numeroContact = request.query.numberContact
    let wordKey = request.query.wordKey

    let filter = dados.FilterWordKey(numeroUser, numeroContact, wordKey)

    response.status(filter.statuscode)
    response.json(filter)
})



//start da API
app.listen(PORT, function (){
    console.log('API aguardando requisições...')
})