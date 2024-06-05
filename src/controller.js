const qbuild = require('./queryBuilder.js');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tbd-project',
    password: '2matasaya',
    port: 5432,
});

const getDataTable = (req, res) => {
    const { table } = req.params;
    pool.query(qbuild.GetData(['*'], table), (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}; 
const getDataTablebyID = (req, res) => {
    const  param  = Object.values(req.params);
    console.log(param); 
    pool.query(qbuild.GetDatabyId(['*'], param[0]),[param[1]] ,(error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}; 

const addCustomer = (req, res) => {
    const {customer_name, street, city, customer_state, country, telephone} = req.body;
    pool.query(qbuild.CheckCustomerExist, [customer_name], (error, results) => {
        if (results.rows.length)
            res.send(`Customer is already Exist!`);
        else {
            pool.query(qbuild.InsertData('customer', ['customer_name', 'street', 'city', 'customer_state', 'country', 'telephone']), [customer_name, street, city, customer_state, country, telephone], (error, results) => {
                if (error) throw error;
                res.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
            });
        }
    });
};




module.exports = {
    getDataTable,
    getDataTablebyID,
    addCustomer
}