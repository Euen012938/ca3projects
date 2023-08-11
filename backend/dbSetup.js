const connection = require('./db');

//////////////////////////////////////////////////////
// SETUP DB
//////////////////////////////////////////////////////
const CREATE_TABLE_MESSAGE_SQL = `
    CREATE Table login (
        id int [primary key],
        username text NOT NULL,
        firstname text NOT NULL,
        lastname text NOT NULL,
        email text NOT NULL,
        password text NOT NULL,
        age int NOT NULL
      );
      
      CREATE Table register (
        id int [primary key],
        username text NOT NULL,
        firstname text NOT NULL
        lastname text NOT NULL,
        email text NOT NULL,
        password text NOT NULL,
        age int NOT NULL
      );
      
      CREATE Table math (
        id int [primary key],
        characters img,
        followed_user_id integer,
        created_at timestamp 
      );
      
      CREATE Table science (
        id int [primary key],
        photos img,
        questions text,
        created_at timestamp
      );
      
      CREATE Table quiz(
        id int INT NOT NULL [primary key] auto_increment,
        question VARCHAR(255) NOT NULL,
        incorrect1 VARCHAR (255) NOT NULL,
        incorrect2 VARCHAR (255) NOT NULL,
         incorrect3 VARCHAR (255) NOT NULL,
        correct_answer VARCHAR(255) NOT NULL,
        category_id INT NOT NULL,
        category_name VARCHAR(255) NOT NULL
       );
      
      CREATE Table health (
        id int [primary key],
        flashcards img
      );
      
      CREATE Table voucher (
        id int [primary key],
        coin integer
      );
`;

connection.promise().query(
    CREATE_TABLE_MESSAGE_SQL
)
.then((response) => {
    console.log(`Tables created`);
})
.catch((error) => {
    console.log(error);
});

