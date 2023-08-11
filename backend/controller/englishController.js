const db = require('../db');




module.exports.findAllEng = function(req,res,next) {




    const findAllEnglish = "SELECT * FROM quiz;";

    db.promise().query(findAllEnglish)

      .then((results) => {

        res.status(200).send(results)
      })
      .catch((error) => {
        res.send(500).send(error)
      })
    },




    module.exports.findEngByID = (req,res) => {

      let categoryid = req.params.categoryid;
      let quizid = req.params.quizid;

                const findEnglishbyID = "SELECT * FROM quiz WHERE category_id = ? AND quiz_id = ?;";

                db.promise().query(findEnglishbyID, [categoryid,quizid])

                .then((results) => {

                  res.status(200).send(results)
                })
                .catch((error) => {
                  res.send(500).send(error)
                })
              
              
        },


        module.exports.editEng = function(req,res){


            let id = req.params.id

            let question = req.body.question

            let incorrect1 = req.body.incorrect1

            let incorrect2 = req.body.incorrect2

            let incorrect3 = req.body.incorrect3

            let correct_answer = req.body.correct_answer

            let category_id = req.body.category_id

            let category_name = req.body.category_name

            let quiz_id = req.body.quiz_id

            let quizname = req.body.quizname




            const editEnglishQuery =

            `

            UPDATE quiz

            SET

             question = ?,

             incorrect1 = ?,

             incorrect2 = ?,

             incorrect3 = ?,

             correct_answer = ?,

             category_id = ?,
             
             category_name = ?,

             quiz_id =?,

             quizname = ?

             WHERE id = ?

            `;

            db.promise().query(editEnglishQuery, [question,incorrect1,incorrect2,incorrect3,correct_answer,category_id, category_name,quiz_id,quizname,id]) 

              .then((results) => {

                res.status(200).send(results)

              })
              .catch((error) => {
                res.send(500).send(error)
              })
            },




            module.exports.insertEng = function (req, res) {
              let question = req.body.question;
              let incorrect1 = req.body.incorrect1;
              let incorrect2 = req.body.incorrect2;
              let incorrect3 = req.body.incorrect3;
              let correct_answer = req.body.correct_answer;
              let category_id = req.body.category_id;
              let category_name = req.body.category_name
              let quiz_id = req.body.quiz_id
              let quizname = req.body.quizname
          
              const insertEngQuery = `
                  INSERT INTO quiz (question,incorrect1,incorrect2,incorrect3,correct_answer,category_id, category_name,quiz_id,quizname)
                  VALUES (?, ?, ?, ?, ?, ?, ?,?,?);
              `;
          
              db.promise()
                  .query(insertEngQuery, [question,incorrect1,incorrect2,incorrect3,correct_answer,category_id, category_name,quiz_id,quizname])
                  .then((results) => {
                      res.status(200).send(results);
                  })
                  .catch((error) => {
                      res.status(500).send(error); // Corrected the response status here
                  });
          },

module.exports.deleteEng = function (req,res) {
    
    let id = req.params.id




      const deleteEngQuery =

        `

  DELETE FROM quiz

  WHERE id = ?

  `;

      db.promise().query(deleteEngQuery,id)
      .then((results) => {
        res.status(200).send(results)
      })
      .catch((error) => {

        res.send(500).send(error)

      })

    }







    module.exports.categories = function(req,res){

      const categories = "SELECT DISTINCT category_id,category_name from quiz;";

      db.promise().query(categories)

      .then((results) => {

        res.status(200).send(results)

      })

      .catch((error) => {

        res.send(500).send(error)

      })


    }


    module.exports.quizid = function(req,res){
      let id = req.params.id;

      const questionid = "SELECT DISTINCT  quiz_id,quizname from quiz where category_id = ?";

      db.promise().query(questionid,[id])

      .then((results) => {

        res.status(200).send(results)

      })

      .catch((error) => {

        res.send(500).send(error)

      })


    }


    module.exports.postEnglishScore = function(req,res){
      let userid = req.params.userid;
      let coinbalance = req.body.coin_balance

      console.log(userid)

      const postcoin = `INSERT INTO coin (userid, coin_balance)
      VALUES
      (?, ?);`

      db.promise()
      .query(postcoin, [userid,coinbalance])
      .then((results) => {
          res.status(200).send(results);
      })
      .catch((error) => {
          res.status(500).send(error); // Corrected the response status here
      });


    }

    module.exports.putEnglishScore = function (req, res) {
      let userid = req.params.userid;
      let coin_balance = req.body.coin_balance;
  
      const updatecoin = `UPDATE coin SET coin_balance = coin_balance + ? WHERE userid = ?`;

      db.promise()
        .query(updatecoin, [coin_balance, userid])
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
  };


  module.exports.checkUser =  function (req, res) {
      let userid = req.params.userid;
  
      const checkUserQuery = `SELECT EXISTS (SELECT 1 FROM coin WHERE userid = ?) AS user_exists;`;
  
      db.promise()
        .query(checkUserQuery, [userid])
        .then(([rows]) => {
          const userExists = rows[0].user_exists === 1;
          res.status(200).json({ exists: userExists });
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }


    module.exports.checkAndInsertUser = function(userid, coinbalance) {
    const checkUserQuery = `SELECT EXISTS (SELECT 1 FROM coin WHERE userid = ?) AS user_exists;`;

    return db.promise()
        .query(checkUserQuery, [userid])
        .then(([rows]) => {
            const userExists = rows[0].user_exists === 1;

            if (!userExists) {
                const insertCoinQuery = `INSERT INTO coin (userid, coin_balance) VALUES (?, ?);`;
                return db.promise()
                    .query(insertCoinQuery, [userid, coinbalance])
                    .then(() => {
                        return { userExists: false, inserted: true };
                    })
                    .catch((error) => {
                        throw error;
                    });
            }

            return { userExists: true, inserted: false };
        })
        .catch((error) => {
            throw error;
        });
};




    