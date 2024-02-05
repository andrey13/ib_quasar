'use strict'

import express from 'express'
import sqlite from 'sqlite3'
import cors from 'cors'
import { promisify } from 'util'
import { createDB } from './createDB.mjs'

console.log('------------------------------------->>>>>')

// создание и импорт БД Sqlite из FoxPro
// const db = await createDB('sqlite/zakaz.db')

// открытие существующей БД Sqlite
const db = new sqlite.Database('sqlite/zakaz.db', sqlite.OPEN_READWRITE)

const sq3run = promisify(db.run.bind(db))
const sq3all = promisify(db.all.bind(db))
const sq3get = promisify(db.get.bind(db))

const expressServer = express()

expressServer.use(cors())

expressServer.get('/status', async (req, res) => {
    const json = JSON.stringify(status)
    res.send(json)
})

expressServer.get('/zakazes', (req, res) => {
    db.all('SELECT * FROM zakaz', function (err, rows) {
        if (err) throw err
        console.log('API zakazes')
        const json = JSON.stringify(rows)
        res.send(json)
    })
})

expressServer.use('/zaklst', (req, res) => {
    const id = req.query.id
    console.log('backend/zaklst: id_zakaz = ', id)
    db.all(`SELECT * FROM zaklst WHERE id_zakaz=${id}`, function (err, rows) {
        if (err) throw err
        const json = JSON.stringify(rows)
        res.send(json)
    })
})

expressServer.get('/groups', (req, res) => {
    db.all('SELECT * FROM groups', function (err, rows) {
        if (err) throw err
        const json = JSON.stringify(rows)
        res.send(json)
    })
})

expressServer.get('/bludos', (req, res) => {
    db.all('SELECT * FROM bludo', function (err, rows) {
        if (err) throw err
        const json = JSON.stringify(rows)
        res.send(json)
    })
})

expressServer.use('/bludo', (req, res) => {
    const id = req.query.id
    console.log('id_group = ', id)
    db.all(`SELECT * FROM bludo WHERE id_group=${id}`, function (err, rows) {
        if (err) throw err
        const json = JSON.stringify(rows)
        res.send(json)
    })
})

expressServer.use('/zakaz', (req, res) => {
    const id = req.query.id
    console.log('id = ', id)
    db.all(`SELECT * FROM zakaz WHERE id=${id}`, function (err, rows) {
        if (err) throw err
        const json = JSON.stringify(rows)
        res.send(json)
    })
})

expressServer.listen(3000, () => {
    console.log('Express app is running on http://localhost:3000')
})

export {
    expressServer
}
