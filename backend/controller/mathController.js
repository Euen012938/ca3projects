const connection = require('../db');
const user = require('../model/mathnlogin');

module.exports.getMathHist = (req, res) => {
    const userid = req.query.userid
    console.log(userid)
    user.getMathHist(userid, (error, results) => {
        if (error) {
            res.status(500).send();
            console.log(error)
            return;
        }
        // if (isNaN(userid)) {
        //     res.status(500).send()
        //     return;
        // }
        if (userid === null) {
            res.status(401).send();
            alert('invalid info')
            return;
        }
        console.log(results)
        res.status(201).send(results)
    })
}

module.exports.postMathHist = (req, res) => {
    const userid = req.body.userid;
    const totalScore = req.body.totalScore;
    user.postMathHist(userid, totalScore, (error) => {
        if (error) {
            res.status(500).send();
            console.log(error)
            return;
        } if (userid === null || totalScore === null) {
            res.status(401).send();
            alert('invalid info')
            return;
        }
        res.status(201).send(`INSERTED`)
    })
}

module.exports.getMathComments = (req, res) => {
    const userid = req.query.userid
    console.log(userid)
    user.getComments(userid, (error, results) => {
        if (error) {
            res.status(500).send();
            console.log(error)
            return;
        } if (userid === null) {
            res.status(401).send();
            alert('invalid info')
            return;
        }
        console.log(results)
        res.status(201).send(results)
    })
}

module.exports.postcomments = (req, res) => {
    const userid = req.body.userid;
    const comments = req.body.comments;
    user.postComment(userid, comments, (error) => {
        if (error) {
            res.status(500).send();
            console.log(error)
            return;
        } if (userid === null || comments === null) {
            res.status(401).send();
            alert('invalid info')
            return;
        }
        res.status(201).send(`INSERTED`)
    })
}
module.exports.editComments = (req, res) => {
    const prev = req.body.prev;
    const comments = req.body.comments;
    user.editComments(prev, comments, (error) => {
        if (error) {
            res.status(500).send();
            console.log(error)
            return;
        } if (comments === null) {
            res.status(401).send();
            alert('invalid info')
            return;
        }
        console.log(prev+comments+'controller')
        res.status(201).send(`CHANGED`)
    })
}
module.exports.delComments = (req, res) => {
    const prev = req.body.prev;
    user.delComments(prev, (error) => {
        if (error) {
            res.status(500).send();
            console.log(error);
            return;
        } if (prev === null) {
            res.status(401).send();
            alert('invalid info')
            return;
        }
        console.log(prev+'controller')
        res.status(201).send(`DELETED`)
    })
}



module.exports.adminComments = (req, res, next) => {
    let userid = req.query.userid
    console.log(userid+'  ui')
    const sqlstatement = `
    select comments from AdminComments where userid = ? ;
    `
    
    connection.promise().query(sqlstatement, [userid])
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((error)=>{
        res.status(500).send(error)
    });

};   