import { DBFFile as dbf } from 'dbffile'
import sqlite from 'sqlite3'
import { promisify } from 'util'
import { promises as fs } from 'fs'

async function createDB(path) {
    const getStatus = async path => await fs.stat(path).catch(e => false)
    const status = await getStatus(path)
    const db = new sqlite.Database(path, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)

    const sq3run = promisify(db.run.bind(db))
    const sq3all = promisify(db.all.bind(db))
    const sq3get = promisify(db.get.bind(db))

    if (!status) {
        await sq3run(
            `CREATE TABLE IF NOT EXISTS bludo (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name       TEXT(80),
                    price      REAL,
                    id_group   INTEGER,
                    vixod      TEXT(10),
                    ed_izm     TEXT(10),
                    kol_ed     REAL,
                    ves_ed_izm REAL,
                    ves        INTEGER
                )`
        )
        await sq3run(
            `CREATE TABLE IF NOT EXISTS zakaz (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date1    TEXT(10),
                    date2    TEXT(10),
                    numb     TEXT(10),
                    fio      TEXT(80),
                    obsluz   REAL,
                    music    REAL,
                    arenda   REAL,
                    mesto    TEXT(80),
                    gosti    INTEGER,
                    time     TEXT(10),
                    rekvizit TEXT(200),
                    kno      INTEGER,
                    comment  TEXT(200),
                    avans    REAL,
                    summa    REAL,
                    summa1   REAL,
                    datetime TEXT(19),
                    uslugi   REAL,
                    admin    TEXT(80),
                    povod    TEXT(20),
                    urname   TEXT(75),
                    foplat   TEXT(30),
                    skidka   REAL,
                    vixod    REAL
                )`
        )
        await sq3run(
            `CREATE TABLE IF NOT EXISTS groups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name       TEXT(20)
                )`
        )
        await sq3run(
            `CREATE TABLE IF NOT EXISTS zaklst (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    id_zakaz INTEGER,
                    id_bludo INTEGER,
                    kol      REAL,
                    price    REAL,
                    sum      REAL,
                    vixod    REAL,
                    status   INTEGER,
                    tarelka  INTEGER,
                remarka  TEXT(200)
                )`
        )
        //BLUDO--------------------------------------------------------------------
        const dbf_bludo = await dbf.open('dbf/bludo.dbf', { encoding: '866' })
        const recs_bludo = await dbf_bludo.readRecords()
        console.log(`bludo.DBF содержит ${dbf_bludo.recordCount} записей.`)

        for (let r of recs_bludo) {
            let sql = `
                INSERT INTO bludo (id, name, id_group, price, vixod, ed_izm, kol_ed, ves_ed_izm, ves)
                VALUES (${r.BNO}, '${r.NAME}', ${r.GNO}, ${r.PRICE}, '${r.VIXOD}', '${r.ED_IZM}', ${r.KOL_ED}, ${r.VES_ED_IZM}, ${r.VES})
                `
            await sq3run(sql, function (err, rows) {
                if (err) {
                    if (err.errno == 19) return
                    throw err
                }
            })
        }
        console.log('BLUDO END')
        //ZAKAZ--------------------------------------------------------------------
        const dbf_zakaz = await dbf.open('dbf/zakaz.dbf', { encoding: '1251' })
        const recs_zakaz = await dbf_zakaz.readRecords()
        console.log(`zakaz.DBF содержит ${dbf_zakaz.recordCount} записей.`)

        for (let r of recs_zakaz) {
            let sql = `
                INSERT INTO zakaz (
                    id, date1, date2, numb, fio, obsluz, music, arenda, mesto, gosti,
                    time, rekvizit, comment, avans, summa, summa1, datetime,
                    uslugi, admin, povod, urname, foplat, skidka, vixod
                )
                VALUES (
                    ${r.ZNO}, '${r.DATE1}', '${r.DATE1}', '${r.NUMB}', '${r.FIO}', ${r.OBSLUZ}, ${r.MUSIC}, ${r.ARENDA}, '${r.MESTO}', ${r.GOSTI},
                    '${r.TIME}', '${r.REKVIZIT}', '${r.COMMENT}', ${r.AVANS}, ${r.SUMMA}, ${r.SUMMA1}, '${r.DATETIME}',
                    ${r.USLUGI}, '${r.ADMIN}', '${r.POVOD}', '${r.URNAME}', '${r.FOPLAT}', ${r.SKIDKA}, ${r.VIXOD}
                )
                `
            await sq3run(sql, function (err, rows) {
                if (err) {
                    if (err.errno == 19) return
                    console.log(sql)
                    throw err
                }
            })
        }
        console.log('ZAKAZ END')
        //GROUP--------------------------------------------------------------------
        const dbf_group = await dbf.open('dbf/group.dbf', { encoding: '1251' })
        const recs_group = await dbf_group.readRecords()
        console.log(`group.DBF содержит ${dbf_group.recordCount} записей.`)

        for (let r of recs_group) {
            if (!r._deleted) {
                let sql = `INSERT INTO groups (id, name) VALUES (${r.GNO}, '${r.NAME}')`
                try {
                    await sq3run(sql)
                } catch (err) {
                    if (err) {
                        if (err.errno == 19) continue
                        console.log(sql)
                        console.log(err.errno)
                        throw err
                    }
                }
            }

        }
        console.log('GROUP END')
        //ZAKLST-------------------------------------------------------------------
        const dbf_zaklst = await dbf.open('dbf/zaklst.dbf', { encoding: '1251' })
        const recs_zaklst = await dbf_zaklst.readRecords()
        console.log(`zaklst.DBF содержит ${dbf_zaklst.recordCount} записей.`)

        const rows = await sq3all(`SELECT MIN(id) AS min, MAX(id) AS max FROM zakaz`)
        const id_min = rows[0].min
        const id_max = rows[0].max
        console.log('min = ', id_min)
        console.log('max = ', id_max)

        for (let r of recs_zaklst) {
            if (r.ZNO < id_min || r.ZNO > id_max) continue
            // db.all(`SELECT id FROM zakaz WHERE id=${r.ZNO}`, function (err, rows) {
            //     if (err) throw err
            //     if (rows.length != 0) {
            console.log('ZNO = ', r.ZNO)
            let sql = `
                        INSERT INTO zaklst (
                            id_zakaz, id_bludo, kol, price, sum, vixod, status, tarelka, remarka
                        )
                        VALUES (
                            ${r.ZNO}, ${r.BNO}, ${r.KOL}, ${r.PRICE}, ${r.SUM}, ${r.VIXOD}, ${r.STATUS}, ${r.TARELKA}, '${r.REMARKA}'
                        )
                        `
            db.run(sql, function (err, rows) {
                if (err) {
                    if (err.errno == 19) return
                    console.log(sql)
                    throw err
                }
            })
            //     }
            // })
        }
        console.log('ZAKLST END')
    }
    return db
}

export {
    createDB
}
