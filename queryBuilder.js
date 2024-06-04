exports.GetData = function(column, table) {
    const query = `
        SELECT ${column.map(p => p)} FROM ${table};`
    console.log(query);
    return query;
}

exports.InsertData = function(table, column, values) {
    let num = []
    for (let i = 0; i < values.length; i++) {
        num.push(`$${i + 1}`)
    }
    const query = `
        INSERT INTO ${table}(${column.map(v => v)})
        VALUES(${num.map(n => n)})
        RETURNING id;`
    console.log(query);
    return query;
}

exports.UpdateData = function(table, column, values, condition) {
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