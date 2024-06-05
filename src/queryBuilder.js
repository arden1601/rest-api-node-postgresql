exports.GetData = function(column, table) {
    const query = `
        SELECT ${column.map(p => p)} FROM ${table};`
    console.log(query);
    return query;
}
exports.GetDatabyId = function(column, table) {
    const query = `
        SELECT ${column.map(p => p)} FROM ${table} WHERE id=$1;`
    console.log(query);
    return query;
}

exports.InsertData = function(table, column) {
    const query = `
        INSERT INTO ${table}(${column.map(v => v)})
        VALUES(${column.map((c, i) => `$${i+1}`)})
        RETURNING id;`
    console.log(query);
    return query;
}

exports.UpdateData = function(table, column, condition) {
    const query = `
        UPDATE ${table}
        SET ${column.map((c, i) => `${c} = $${i+1}`)}
        WHERE ${condition};`
    console.log(query);
    return query;
}

exports.DeleteData = function(table, condition) {
    const query = `
        DELETE FROM ${table}
        WHERE ${condition};`
    console.log(query);
    return query;
}

exports.CheckCustomerExist = "SELECT * FROM customer WHERE customer_name=$1;"
exports.CheckAuthorExist = "SELECT * FROM author WHERE author_name=$1;"
exports.CheckAuthorIdExist = "SELECT * FROM author WHERE id=$1;"
exports.CheckCategoryExist = "SELECT * FROM book_category WHERE category_name=$1;"
exports.CheckCategoryIdExist = "SELECT * FROM book_category WHERE id=$1;"
exports.CheckPublisherIdExist = "SELECT * FROM publisher WHERE id=$1;"
exports.CheckPublisherExist = "SELECT * FROM publisher WHERE publisher_name=$1;"
exports.CheckBookExist = "SELECT * FROM book WHERE book_name=$1;"

