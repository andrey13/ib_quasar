import express from "express"
import cors from "cors"
import sqlite from "sqlite3"
// import { app, protocol, BrowserWindow } from 'electron'
// import { screen } from 'electron'
// import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
// //const config = require(path.join(__dirname, 'package.json'))
// const isDevelopment = process.env.NODE_ENV !== 'production'

let db = new sqlite.Database("src/sqlite/d1")
console.log("db = ", db)

const expressServer = express()

expressServer.use(cors())

expressServer.get("/comp", (req, res) => {
    // db.serialize(function () {
    db.all("SELECT id, name, sono FROM comp", function (err, rows) {
        if (err) throw err
        const json = JSON.stringify(rows)
        res.send(json)
    })
    // })
    // con.query("SELECT id, name, sono FROM comp", function (err, result, fields) {
    //     if (err) throw err
    //     res.send(result)
    // })
})

expressServer.listen(3000, () => {
    console.log("Express app is running on http://localhost:3000")
})

export {
    expressServer
}
