const connection = require('../db');




///////////////////////////////STUDENT ACTIONS///////////////////////////////////////////////////////////////////////


module.exports.getStudent = (req, res, next) => {
    const sqlstatement = `
    select * from login;
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};   

module.exports.deleteStudent = (req, res, next) => {
    let id = parseInt(req.params.id);
    const sqlstatement = `
    delete from login
    where userid = ?;
    `
    
    connection.promise().query(sqlstatement, [id])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};

module.exports.updateStudent = (req, res, next) => {
    let userid = parseInt(req.params.userid);
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let age = req.body.age;
    let level = req.body.level;


    const sqlstatement = `
    update login
    set username = ?, 
    firstname = ?, 
    lastname = ?, 
    email = ?,
    password = ?,
    age = ?,
    level = ?
    where userid = ?;
    `

    connection.promise().query(sqlstatement, [username, firstname, lastname, email, password, age, level, userid])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.send(error)
    });
};



/////////////////////////////////QUESTION ACTIONS////////////////////////////////////////////////////////////



module.exports.updateQuestion = (req, res, next) => {
    let scienceid = parseInt(req.params.scienceid);
    let topic = req.body.topic;
    let questions = req.body.questions;
    let status = req.body.status;
    let answer = req.body.answer;

    const sqlstatement = `
    update science
    set topic = ?, 
    questions = ?, 
    status = ?, 
    answer = ?
    where scienceid = ?;
    `

    connection.promise().query(sqlstatement, [topic, questions, status, answer, scienceid])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.send(error)
    });
};

module.exports.updateOptions = (req, res, next) => {
    let option1 = req.body.option1;
    let option2 = req.body.option2;
    let option3 = req.body.option3;
    let option4 = req.body.option4;
    let scienceid = parseInt(req.params.scienceid);

    const sqlstatement = `
    update inventories 
    set option1 = ?,
    option2 = ?,
    option3 = ?,
    option4 = ?
    where scienceid = ?;
    `

    connection.promise().query(sqlstatement, [option1, option2, option3, option4, scienceid])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.send(error)
    });
};

module.exports.insertQuestion = (req, res) => {
    let topic = req.body.topic;
    let questions = req.body.questions;
    let status = req.body.status;
    let answer = req.body.answer;

    const sqlstatement = `
    insert into science(topic, questions, status, answer) 
    values(?, ?, ?, ?)
    `;

    connection.promise().query(sqlstatement, [topic, questions, status, answer])
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error)=>{
        res.status(500).send(error);
    });

};

module.exports.insertOptions = (req, res) => {
    let option1 = req.body.option1;
    let option2 = req.body.option2;
    let option3 = req.body.option3;
    let option4 = req.body.option4;

    const sqlstatement = `
    insert into inventories(option1, option2, option3, option4)
    values(?, ?, ?, ?)
    `;

    connection.promise().query(sqlstatement, [option1, option2, option3, option4])
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error)=>{
        res.status(500).send(error);
    });

};

module.exports.deleteQuestion = (req, res, next) => {
    let id = parseInt(req.params.id);

    const sqlstatement = `
    DELETE FROM science
    WHERE scienceid = ?;
    `
    connection.promise().query(sqlstatement, [id])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.send(error)
    });
};   


/////////////////////////////////////ADMIN ACTIONS//////////////////////////////////////////////////////////////////////

module.exports.getAdmin = (req, res, next) => {

    const sqlstatement = `
    select * from adminlogin;
    `
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.send(error)
    });
}; 

module.exports.deleteAdmin = (req, res, next) => {
    let userid = parseInt(req.params.userid);
    const sqlstatement = `
    delete from adminlogin 
    where userid = ?;
    `
    
    connection.promise().query(sqlstatement, [userid])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};

module.exports.updateAdmin = (req, res, next) => {
    let userid = parseInt(req.params.userid);
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let age = req.body.age;

    const sqlstatement = `
    update adminlogin
    set username = ?, 
    firstname = ?, 
    lastname = ?, 
    email = ?,
    password = ?,
    age = ?
    where userid = ?;
    `

    connection.promise().query(sqlstatement, [username, firstname, lastname, email, password, age, userid])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.send(error)
    });
};

module.exports.insertAdmin = (req, res) => {
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let age = req.body.age;

    const sqlstatement = `
    insert into adminlogin(username, firstname, lastname, email, password, age)
    values(?, ?, ?, ?, ?, ?);
    `;

    connection.promise().query(sqlstatement, [username, firstname, lastname, email, password, age])
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error)=>{
        res.status(500).send(error);
    });

};


module.exports.getComments = (req, res, next) => {
    const sqlstatement = `
    select * from MathComments;
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};   

module.exports.getAdminComments = (req, res, next) => {
    const sqlstatement = `
    select * from AdminComments;
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};   


module.exports.postAdminComments = (req, res) => {
    let userid = req.body.userid;
    let comments = req.body.comments;

    const sqlstatement = `
    insert into AdminComments(userid, comments)
    values(?, ?);
    `;

    connection.promise().query(sqlstatement, [userid, comments])
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error)=>{
        res.status(500).send(error);
    });

};

