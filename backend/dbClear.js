const connection = require('./db');

//////////////////////////////////////////////////////
// CLEAR DB
//////////////////////////////////////////////////////
const DROP_TABLE_MESSAGE_SQL = `
    DROP TABLE IF EXISTS message;
`;

connection.promise().query(
    DROP_TABLE_MESSAGE_SQL
)
.then((response) => {
    console.log(`Tables dropped`);
})
.catch((error) => {
    console.log(error);
});