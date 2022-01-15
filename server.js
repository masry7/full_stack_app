// Create express app
const express = require("express")

const app = express()
const db = require('./database.js')


//Server Port
const HTTP_PORT = 8000

//Start Server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

// Root endpoint
app.get('/', (req, res, next) => {
    res.json({"message": "Ok"})
})

// Insert here other API endpoints


app.get("/api/users", (req, res, next) =>{
    const sql = "SELECT * FROM user"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error':err.message})
            return
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
})

app.get("/api/user/:id", (req, res, next) => {
    var sql = "SELECT * FROM user WHERE id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.use((req,res) => {
    res.status(404)
})
