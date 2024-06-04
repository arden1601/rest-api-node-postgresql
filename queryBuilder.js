exports.GetData = function(column, table) {
    const query = `
        SELECT ${column.map(p => p)} FROM ${table};`
    console.log(query);
    return query;
}

exports.InsertData = function(table, column, values) {
    const query = `
        INSERT INTO ${table}(${column.map(v => v)})
        VALUES(${values.map(v => v)})
        RETURNING id;`
    console.log(query);
    return query;
}

exports.UpdateData = function(table, column, values, condition) {
    const query = `
        UPDATE ${table}
        SET ${column.map((c, i) => `${c} = ${values[i]}`)}
        WHERE ${condition};`
    console.log(query);
    return query;
}