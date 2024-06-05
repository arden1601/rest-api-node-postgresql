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
    const param = Object.values(req.params);
    console.log(param);
    pool.query(qbuild.GetDatabyId(['*'], param[0]), [param[1]], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addCustomer = (req, res) => {
    const { customer_name, street, city, customer_state, country, telephone } = req.body;
    if (!customer_name || !street || !city || !customer_state || !country || !telephone) return res.status(400).send('Please fill all fields!');
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

const addAuthor = (req, res) => {
    const { author_name, year_born, year_died } = req.body;
    if (!author_name || !year_born) return res.status(400).send('Please fill all fields!');
    pool.query(qbuild.CheckAuthorExist, [author_name], (error, results) => {
        if (results.rows.length)
            res.send(`Author is already Exist!`);
        else {
            pool.query(qbuild.InsertData('author', ['author_name', 'year_born', 'year_died']), [author_name, year_born, year_died], (error, results) => {
                if (error) throw error;
                res.status(201).send(`Author added with ID: ${results.rows[0].id}`);
            });
        }
    });
};

const addPublisher = (req, res) => {
    const { publisher_name, city, country, telephone, year_founded } = req.body;
    if (!publisher_name || !city || !country || !telephone || !year_founded) return res.status(400).send('Please fill all fields!');
    pool.query(qbuild.CheckPublisherExist, [publisher_name], (error, results) => {
        if (results.rows.length)
            res.send(`Publisher is already Exist!`);
        else {
            pool.query(qbuild.InsertData('publisher', ['publisher_name', 'city', 'country', 'telephone', 'year_founded']), [publisher_name, city, country, telephone, year_founded], (error, results) => {
                if (error) throw error;
                res.status(201).send(`Publisher added with ID: ${results.rows[0].id}`);
            });
        }
    });
};

const addCategory = (req, res) => {
    const { category_name } = req.body;
    if (!category_name) return res.status(400).send('Please fill all fields!');
    pool.query(qbuild.CheckCategoryExist, [category_name], (error, results) => {
        if (results.rows.length)
            res.send(`Category is already Exist!`);
        else {
            pool.query(qbuild.InsertData('category', ['category_name']), [category_name], (error, results) => {
                if (error) throw error;
                res.status(201).send(`Category added with ID: ${results.rows[0].id}`);
            });
        }
    });

};

const addBook = (req, res) => {
    const { book_name, publish_year, pages, author_id, publisher_id, category_id, store_id } = req.body;
    if (!book_name || !publish_year || !pages || !author_id || !publisher_id || !category_id) return res.status(400).send('Please fill all fields!');
    pool.query(qbuild.CheckBookExist, [book_name], (error, results) => {
        if (results.rows.length)
            res.send(`Book is already Exist!`);
        else {
            pool.query(qbuild.CheckCategoryIdExist, [category_id], (error, results) => {
                if (!results.rows.length)
                    res.send(`Category is not Exist!`);
                else {
                    pool.query(qbuild.CheckAuthorIdExist, [author_id], (error, results) => {
                        if (!results.rows.length)
                            res.send(`Author is not Exist!`);
                        else {
                            pool.query(qbuild.CheckPublisherIdExist, [publisher_id], (error, results) => {
                                if (!results.rows.length)
                                    res.send(`Publisher is not Exist!`);
                                else {
                                    pool.query(qbuild.CheckStoreIdExist, [store_id], (error, results) => {
                                        if (!results.rows.length)
                                            res.send(`Store is not Exist!`);
                                        else{
                                            pool.query(qbuild.InsertData('book', ['book_name', 'publish_year', 'pages', 'author_id', 'publisher_id', 'category_id', 'store_id']), [book_name, publish_year, pages, author_id, publisher_id, category_id, store_id], (error, results) => {
                                                if (error) throw error;
                                                res.status(201).send(`Book added with ID: ${results.rows[0].id}`);
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
           });
    }});
}

module.exports = {
    getDataTable,
    getDataTablebyID,
    addCustomer,
    addAuthor,
    addPublisher,
    addCategory,
    addBook
}