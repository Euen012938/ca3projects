
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());

app.use('/',express.static("../frontend"));
app.use('/react/', express.static("../frontend-react"));

////////////////////////////////////////////////////
//DISPLAY SERVER RUNNING
////////////////////////////////////////////////////
app.get('/',(req,res)=> {
    res.send(`Server running on port ${PORT}`)
});

 app.listen(PORT,()=> {
     console.log(`App listening to port ${PORT}`);
 });
 


//////////////////////////////////////////////////////
// SETTING MAIN ROUTES
//////////////////////////////////////////////////////
const mainRoutes = require("./routes/mainRoutes");
app.use("/api", mainRoutes);


// app.get("/message", (req, res, next) => {
//     res.send(req.query);
// });