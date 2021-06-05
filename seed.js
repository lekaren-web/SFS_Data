const { green, red } = require('chalk');
const { db, DataTable } = require('./server/db');

const dataTable = 
  [
    {
      "creditorName": "CBNA",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "2.00",
      "balance": "1363.00"
    },
    {
      "creditorName": "AMEX",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "2.00",
      "balance": "2763.00"
    },
    {
      "creditorName": "AMEX",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "2.00",
      "balance": "429.00"
    },
    {
      "creditorName": "AMEX",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "2.00",
      "balance": "1363.00"
    },
    {
      "creditorName": "DISCOVERBANK",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "2.00",
      "balance": "2644.00"
    },
    {
      "creditorName": "CAPITAL ONE",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "4.00",
      "balance": "5464.00"
    },
    {
      "creditorName": "CAPITAL ONE",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "4.00",
      "balance": "2345.00"
    },
    {
      "creditorName": "CAPITAL ONE",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "4.00",
      "balance": "836.00"
    },
    {
      "creditorName": "CBNA",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "3.50",
      "balance": "687.00"
    },
    {
      "creditorName": "CBNA",
      "firstName": "Suman",
      "lastName": "Tester79",
      "minPaymentPercentage": "3.50",
      "balance": "235.00"
    }
  ]


const seed = async () => {
  try {
    await db.sync({ force: true });
        await DataTable.bulkCreate(dataTable);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}