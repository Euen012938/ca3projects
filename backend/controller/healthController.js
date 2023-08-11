const db = require("../db");

module.exports.findByID = (req, res) => {
  let id = req.params.id;
  const findHealthByIDQuery = "SELECT * FROM health WHERE id = ?;";
  db.promise()
    .query(findHealthByIDQuery, [id])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
module.exports.findAll = function (req, res) {
  const findAllHealthQuery = "SELECT * FROM health;";
  db.promise()
    .query(findAllHealthQuery)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
module.exports.edit = function (req, res) {
  let HealthTerms = req.body.HealthTerms;
  let Explanation = req.body.Explanation;
  let Questions = req.body.Questions;
  let Answers = req.body.Answers;
  let id = req.params.id;

  const editHealthQuery = `
        UPDATE health
        SET
          HealthTerms = ?,
          Explanation = ?,
          Questions = ?,
          Answers = ?
        WHERE id = ?
        `;
  db.promise()
    .query(editHealthQuery, [HealthTerms, Explanation, Questions, Answers, id])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
module.exports.insert = function (req, res) {
  let HealthTerms = req.body.HealthTerms;
  let Explanation = req.body.Explanation;
  let Questions = req.body.Questions;
  let Answers = req.body.Answers;

  const insertQuery = `
    INSERT INTO health (HealthTerms, Explanation, Questions, Answers)
    VALUES
    (?, ?, ?, ?);
    `;
  db.promise()
    .query(insertQuery, [HealthTerms, Explanation, Questions, Answers])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
module.exports.delete = function (req, res) {
  let id = req.params.id;

  const deleteHealthQuery = `
    DELETE FROM health
    WHERE id = ?
    `;
  db.promise()
    .query(deleteHealthQuery, [id])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}; ////////////////// HEALTH COMMENTS /////////////////////
/////////////// GET ALL API ////////////////////////////////
module.exports.FindAllHealthComments = function (req, res) {
  const findAllHealthCommentsQuery = "SELECT * FROM HealthComments;";
  db.promise()
    .query(findAllHealthCommentsQuery)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.error("Error fetching health comments:", error);
      res.status(500).send("An error occurred while fetching health comments.");
    });
};
///////////// PUT API ///////////////////
module.exports.Edit = function (req, res) {
  let Comments = req.body.Comments;
  let ID = req.params.ID;

  const editHealthCommentsQuery = `
        UPDATE HealthComments
        SET
          Comments = ?
        WHERE ID = ?
        `;
  db.promise()
    .query(editHealthCommentsQuery, [Comments, ID])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log("WJ", error);
      res.status(500).send(error);
    });
}; ///////////POST API///////////////
module.exports.Insert = function (req, res) {
  let Comments = req.body.Comments;

  const insertHealthCommentsQuery = `
  INSERT INTO HealthComments (Comments)
  VALUES
  (?);
  `;
  db.promise()
    .query(insertHealthCommentsQuery, [Comments])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
////////////// DELETE API ////////////////
module.exports.Delete = function (req, res) {
  let ID = req.params.ID;

  const deleteHealthCommentsQuery = `
    DELETE FROM HealthComments
    WHERE ID = ?
    `;
  db.promise()
    .query(deleteHealthCommentsQuery, [ID])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
///////////////// GET BY ID API ///////////////////////////
module.exports.FindByID = (req, res) => {
  let ID = req.params.ID;
  const findHealthCommentsByIDQuery =
    "SELECT * FROM HealthComments WHERE ID = ?;";
  db.promise()
    .query(findHealthCommentsByIDQuery, [ID])
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
