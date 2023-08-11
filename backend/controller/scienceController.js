const connection = require('../db');


module.exports.getQuestionsAll = (req, res, next) => {
    const sqlstatement = `
    select * from science ;
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

}; 

module.exports.getQuestions = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'incomplete';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

}; 

/////////////////////////INCOMPLETE QUESTIONS/////////////////////////

module.exports.getHeatQuestionI = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'incomplete'
    and topic = 'heat';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

}; 

module.exports.getMatterQuestionI = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'incomplete'
    and topic = 'matter';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

}; 

module.exports.getLivingQuestionI = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'incomplete'
    and topic = 'non/livingthings';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

}; 

module.exports.getDigestQuestionI = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'incomplete'
    and topic = 'digestivesystem';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

}; 

/////////////////////////COMPLETED QUESTIONS///////////////////////////
module.exports.getHeatQuestionC = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'completed'
    and topic = 'heat';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};

module.exports.getMatterQuestionC = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'completed'
    and topic = 'matter';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};

module.exports.getLivingQuestionC = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'completed'
    and topic = 'non/livingthings';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};

module.exports.getDigestQuestionC = (req, res, next) => {
    const sqlstatement = `
    select * from science
    where status = 'completed'
    and topic = 'digestivesystem';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

}; 


module.exports.getRevision = (req, res) => {
    const sqlstatement = `
    select * from science
    where status = 'completed';
    `
    
    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error) => {
        res.status(500).send(error)
    })
};

module.exports.getOptions = (req, res) => {
    let scienceid = parseInt(req.params.scienceid);

    const sqlstatement = `
    SELECT * from inventories
    WHERE scienceid IN
    (SELECT scienceid from science where scienceid = ?)
    `;

    connection.promise().query(sqlstatement, [scienceid])
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error)=>{
        res.status(500).send(error);
    });

};

module.exports.insertOption = (req, res) => {

    const sqlstatement = `
    insert into inventories
    values(?),(?),(?),(?);
    `;

    connection.promise().query(sqlstatement)
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((error)=>{
        res.status(500).send(error);
    });

};


module.exports.updateStatus = (req, res, next) => {
    let id = parseInt(req.params.id);

    const sqlstatement = `
    UPDATE science
    SET status = 'completed'
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