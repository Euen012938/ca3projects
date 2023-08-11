const user = require('../model/mathnlogin');
const jwt = require('jsonwebtoken')

module.exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    user.verify(email, password, (error, user) => {
        if (error) {
            res.status(500).send();
            return;
        } 
        if (user === null) {
            var payload = null
        } else {
            var payload = {
                userid: user[0].userid,
            };
        }
        jwt.sign(payload, process.env.secretKey, { algorithm: "HS256" }, (error, token) => {
            if (error) {
                console.log(error);
                res.status(401).send();
                return;
            }
            res.status(200).send({
                token: token,
                userid: user[0].userid
            });
            console.log(user[0].userid+'ab'+token)
            return;
        })

        console.log(payload)
    });
};

module.exports.register = (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    user.register(username, firstname, lastname, email, password, age, (error, result) => {
        if (error) {
            res.status(500).send();
            console.log(error)
            return;
        } if (username === null || firstname === null || lastname === null || email === null || password === null || age === null) {
            res.status(401).send();
            alert('invalid info')
            return;
        }
        res.status(201).send(`{"userID":${result}}`)
    })
}

module.exports.adminLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    user.adminLogin(email, password, (error, user) => {
        if (error) {
            res.status(500).send();
            return;
        } 
        if (user === null) {
            var payload = null
        } else {
            var payload = {
                userid: user[0].userid,
            };
        }
        jwt.sign(payload, process.env.secretKey, { algorithm: "HS256" }, (error, token) => {
            if (error) {
                console.log(error);
                res.status(401).send();
                return;
            }
            res.status(200).send({
                token: token,
                userid: user[0].userid
            });
            console.log(user[0].userid+'ab'+token)
            return;
        })

        console.log(payload)
    });
};