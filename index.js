const express = require('express');
const app = express();
const { Pool } = require('pg'); 

const qbuild = require('./queryBuilder.js');

const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tbd-project',
    password: '2matasaya',
    port: 5432,
});

app.get('/api/get/:column', async (req, res) => {
    const { column } = req.params;
    const { rows } = await pool.query(qbuild.GetData(['*'], column));
    res.json(rows);
});

app.post('/api/add-review', async (req, res) => {
    const {customer_id, book_id, review_text, rating} = req.body;
    if (!customer_id || !book_id || !review_text || !rating) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try{
        const query = `
            INSERT INTO reviews(customer_id, book_id, review_text, rating)
            VALUES($1, $2, $3, $4)
            RETURNING id;`;
        const value = [customer_id, book_id, review_text, rating];
        const result = await pool.query(query, value);
        res.status(201).send(`Review added successfully! review_id: ${result.rows[0].id}`);
    }catch (error){
        return res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});