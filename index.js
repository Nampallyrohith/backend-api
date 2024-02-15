const express = require("express")
const path = require("path")

const {open} = require("sqlite")
const sqlite3 = require("sqlite3")

const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, "articleApi.db");


let db = null;

const initializeDbServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        app.listen(6965, () => {
            console.log("server is live on 6965")
        })
    }
    catch(error) {
        console.log(`DB error: ${error}`);
        process.exit(1);
    }
}

initializeDbServer()


app.get('/users', async (req, res) => {
    const getQuery = `
    select * from users;
    `;
    const data = await db.all(getQuery);
    res.send(data)
})


app.get('/users/:id', async (req, res) => {
    const {id} = req.params
    const getQuery = `
    select * from users where id=${id};
    `;
    const data = await db.get(getQuery);
    res.send(data)
})