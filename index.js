const express = require('express');
const app = express();
const { Pool } = require('pg'); 

const qbuild = require('./src/queryBuilder.js');

const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tbd-project',
    password: '2matasaya',
    port: 5432,
});

app.get('/api/get/:column', (req, res) => {
    const { column } = req.params;
    const { rows } = pool.query(qbuild.GetData(['*'], column));
    res.json(rows);
});

app.post('/api/post/:table', async (req, res) => {
    const { table } = req.params;
    const { column, values } = req.body;
    const arr_values = Object.values(values);
    console.log(arr_values);
    try{
        const result = await pool.query(qbuild.InsertData(table, column), arr_values);
        res.status(201).send(`Data added successfully!`);
    }catch (error){
        return res.status(400).json({ error: error.message });
    }
});

app.put('/api/put/:table', async (req, res) => {
    const { table } = req.params;
    const { column, values, condition } = req.body;
    const arr_values = Object.values(values);
    console.log(column);
    console.log(arr_values);
    try{
        const result = await pool.query(qbuild.UpdateData(table, column, arr_values, condition), arr_values);
        res.status(201).send(`Data updated successfully!`);
    }catch (error){
        return res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});