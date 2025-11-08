/***************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API
 * Data: 124/09/2025
 * Autor: Marcel
 * Versão 1.0
 ***************************************************************************/

const { create } = require('domain')
const dados = require('./contatos.js')
const { profile } = require('console')
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'David Lucas dos Santos' }


//getAllUsersAndContacts
const getAllUsersAndContacts = function () {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', users: [], contacts: [] }


    dados["whats-users"].forEach(function (usuario) {

        message.users.push({
            id: usuario.id,
            account: usuario.account,
            nickname: usuario.nickname,
            createdSince: usuario['created-since'],
            profileImage: usuario['profile-image'],
            number: usuario.number,
            background: usuario.background
        })

        usuario.contacts.forEach(function (itemContato) {
            message.contacts.push({
                name: itemContato.name,
                number: itemContato.number,
                description: itemContato.description,
                image: itemContato.image,
                messages: itemContato.messages
            })
        })
    })
    if (message.contacts.length > 0)
        return message
    else
        return MESSAGE_ERROR

}

// console.log(getAllUsersAndContacts())






//getProfileInfoByNumber
const getProfileInfoByNumber = function (numero) {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', users: [] }

    dados['whats-users'].forEach(function (itemProfile) {
        if (itemProfile.number === numero) {
            message.users.push({
                account: itemProfile.account,
                nickname: itemProfile.nickname,
                image: itemProfile['profile-image'],
                createdSince: itemProfile['created-since'],
                profileImage: itemProfile['profile-image'],
                number: itemProfile.number,
                background: itemProfile.background,
            })
        }
    })
    if (message.users.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

// console.log(getProfileInfoByNumber('11987876567'))





//getContactsOfUser
const getContactsOfUser = function (numero) {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', user: null, contact: [] }


    dados["whats-users"].forEach(function (usuario) {

        if (usuario.number === numero) {
            message.user = {
                nome: usuario.account,
                numero: usuario.number
            }

            usuario.contacts.forEach(function (itemContato) {
                message.contact.push({
                    name: itemContato.name,
                    numero: itemContato.number,
                    image: itemContato.image,
                    description: itemContato.description
                })
            })
        }
    })
    if (message.contact.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

// console.log(getContactsOfUser('11987876567'))




//getMessagesForUser
const getMessagesForUser = function (numero) {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', user: null, messages: [] }

    dados['whats-users'].forEach(function (usuario) {

        if (usuario.number === numero) {
            message.user = {
                nome: usuario.account,
                numero: usuario.number
            }

            usuario.contacts.forEach(function (messageContato) {
                message.messages.push({
                    name: messageContato.name,
                    image: messageContato.image,
                    message: messageContato.messages
                })
            })
        }
    })
    if (message.messages.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

// console.log(
//     JSON.stringify(getMessagesForUser('11987876567'), null, 2)
//   )


//getConversationUserContacts
const getConversationUserContacts = function (numeroUser, numeroContact) {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', user: '', conversation: [] }

    let usuarioEncontrado = false
    let contatoEncontrado = false

    dados['whats-users'].forEach(function (usuario) {
        if (usuario.number === numeroUser) {
            usuarioEncontrado = true

            message.user = {
                nome: usuario.account,
                numero: usuario.number
            }

            usuario.contacts.forEach(function (messageContato) {
                if (messageContato.number === numeroContact) {
                    contatoEncontrado = true;
                    message.conversation.push({
                        nome: messageContato.name,
                        numero: messageContato.number,
                        imagem: messageContato.image,
                        message: messageContato.messages
                    })
                }
            })
        }
    })

    if (!usuarioEncontrado || !contatoEncontrado) {
        return MESSAGE_ERROR;
    }

    return message;
}

// console.log(
//     JSON.stringify(getAllConversationUserContacts('11966578996', "26999999910"), null, 2)
//   );


//FilterWordKey
const FilterWordKey = function (numeroUser, numeroContact, wordKey) {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', user: null, contact: null, message: [] }
    
    
    let usuarioEncontrado = false
    let contatoEncontrado = false
    let mensagemEncontrada = false

    dados['whats-users'].forEach(function (usuario){
        if (usuario.number === numeroUser){
            usuarioEncontrado = true

            message.user = {
                nome: usuario.account,
                numero: usuario.number
            }

            usuario.contacts.forEach(function (contato){
                if (contato.number === numeroContact){
                    contatoEncontrado = true

                    message.contact = {
                        nome: contato.name,
                        numero: contato.number
                    }

                    contato.messages.filter(function (msg){
                        if (msg.content.includes(wordKey)) {
                            mensagemEncontrada = true

                            message.message.push(msg)
                        }
                    })
                }
            })
        }
    })


    if (!usuarioEncontrado || !contatoEncontrado || !mensagemEncontrada) {
        return MESSAGE_ERROR
    }

    return message
}

// console.log(
//     JSON.stringify(FilterWordKey('11966578996', "26999999910", 'Great'), null, 2)
//   );

module.exports = {
    getAllUsersAndContacts,
    getProfileInfoByNumber,
    getContactsOfUser,
    getMessagesForUser,
    getConversationUserContacts,
    FilterWordKey
}
