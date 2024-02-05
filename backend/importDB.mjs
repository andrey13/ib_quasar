import { DBFFile } from 'dbffile'

const path = 'dbf/zaklst.dbf'

async function readDbf(path) {
    let dbf = await DBFFile.open(path, { encoding: '1251' })
    console.log(`DBF файл содержит ${dbf.recordCount} записей.`)
    console.log(`Названия полей: ${dbf.fields.map(f => f.name).join(', ')}`)
    let records = await dbf.readRecords()
    for (let record of records) console.log(record)
}

readDbf(path)
