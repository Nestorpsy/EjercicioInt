const DBTemp = require('./js/DBTemp')
const UserDao = require('./js/dao/Usuario')
const CustomerDao = require('./js/dao/Cliente')
const MoveDao = require('./js/dao/Cliente')


function main() {
    const user = UserDao()
    user.createTable()
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })

    const customer = customerDao()
    customer.createTable()
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })

    const moves = moveDao()
    moves.createTable()
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })
}


function userDatro() {
    const dao = new DBTemp('./database.sqlite3')
    const user = new UserDao(dao)
    return user
}

function customerDao() {
    const dao = new DBTemp('./database.sqlite3')
    const customer = new CustomerDao(dao)
    return customer
}

function moveDao() {
    const dao = new DBTemp('./database.sqlite3')
    const moves = new MoveDao(dao)
    return moves
}

