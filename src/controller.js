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



module.exports = {
    getDataTable, 
}