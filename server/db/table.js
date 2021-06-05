const Sequelize = require('sequelize')
const db = require('./database')

const DataTable = db.define('dataTable', {
    creditorName: {
        type: Sequelize.STRING,
    },

    firstName: {
        type: Sequelize.STRING,
    },

    lastName: {
        type: Sequelize.STRING,
    },

    minPaymentPercentage: {
        type: Sequelize.STRING,
    },

    balance: {
        type: Sequelize.STRING,
    }
})

module.exports = DataTable;