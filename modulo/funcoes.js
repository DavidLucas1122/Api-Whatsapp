/***************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API
 * Data: 124/09/2025
 * Autor: Marcel
 * Versão 1.0
 ***************************************************************************/

const { create } = require('domain')
const dados = require('./contatos.js')
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'David Lucas dos Santos' }


//getAllUsers
const getAllUsers = function () {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', info: [] }


    dados["whats-users"].forEach(function (usuario) {

        usuario.contacts.forEach(function (itemContato) {
            message.info.push({
                name: itemContato.name,
                number: itemContato.number,
                description: itemContato.description,
                messages: itemContato.messages
            })
        })
    })
        if (message.info.length > 0)
            return message
        else
            return MESSAGE_ERROR

}


const getAllDatesOfProfile = function () {
    let message = { status: true, statuscode: 200, development: 'David Lucas dos Santos', info: []}

    dados['whats-users'].forEach(function (itemProfile) {
        message.info.push({
            id: itemProfile.id,
            account: itemProfile.account,
            nickname: itemProfile.nickname,
            createdSince: itemProfile['created-since'],
            number: itemProfile.number,
            background: itemProfile.background,
        })
    })
    if (message.info.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

console.log(getAllDatesOfProfile())


module.exports = {
    getAllUsers
}