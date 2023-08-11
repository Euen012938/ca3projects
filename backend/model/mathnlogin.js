const db = require("../db");

const user = {
    // logining jwt
    verify: function (email, password, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `SELECT * from login WHERE email = ? AND password = ?;`;
                dbConn.query(sql, [email, password], (error, token) => {
                    if (error) {
                        console.log(error);
                        return callback(error, null);
                    }
                    if (token.length === 0) {
                        return callback(null, null);
                    } else {
                        return callback(null, token);
                    }
                })
            }
        })
    },
    // create new acct
    register: function (username, firstname, lastname, email, password, age, callback) {
        var dbConn = db;
        var level = 0;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `INSERT INTO login (username, firstname, lastname, email, password, age, level)
                VALUES
                (?, ?, ?, ?, ?, ?, ?);`;
                dbConn.query(sql, [username, firstname, lastname, email, password, age, level], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }
                    console.log(results)
                    return callback(null, results.insertId);
                })
            }
        })
    },
    adminLogin: function (email, password, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `SELECT * from adminlogin WHERE email = ? AND password = ?;`;
                dbConn.query(sql, [email, password], (error, token) => {
                    if (error) {
                        console.log(error);
                        return callback(error, null);
                    }
                    if (token.length === 0) {
                        return callback(null, null);
                    } else {
                        return callback(null, token);
                    }
                })
            }
        })
    },
    getMathHist: function (userid, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `SELECT hist FROM MathGame WHERE userid = ?;`;
                dbConn.query(sql, [userid], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }
                    console.log(results +'a')
                    return callback(null, results);
                })
            }
        })
    },
    postMathHist: function (userid, totalScore, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `INSERT INTO MathGame (userid, hist)
                VALUES
                (?, ?);`;
                dbConn.query(sql, [userid, totalScore], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, results);
                })
            }
        })
    },
    // get prev comment 
    getComments: function (userid, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `SELECT comments FROM MathComments WHERE userid = ?;`;
                dbConn.query(sql, [userid], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }
                    return callback(null, results);
                })
            }
        })
    },
    // post new comments
    postComment: function (userid, comments, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `INSERT INTO MathComments (userid, comments)
                VALUES
                (?, ?);`;
                dbConn.query(sql, [userid, comments], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }
                    console.log(results)
                    return callback(null, results);
                })
            }
        })
    },
    // edit prev comments 
    editComments: function (prev, comments, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `UPDATE MathComments SET comments = ? where comments = ?;`;
                console.log(prev + comments+'a')
                dbConn.query(sql, [comments, prev], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }
                    console.log(results)
                    return callback(null, results);
                })
            }
        })
    },
    // del comments
    delComments: function (prev, callback) {
        var dbConn = db;
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null)
            } else {
                const sql = `DELETE FROM MathComments WHERE comments= ?`;
                console.log(prev)
                dbConn.query(sql, [prev], (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }
                    console.log(results)
                    return callback(null, results);
                })
            }
        })
    }


};

module.exports = user