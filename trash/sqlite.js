import { boot } from 'quasar/wrappers'
import path from 'path'
// import sqlite3 from 'sqlite3'

// Будьте осторожны при использовании SSR для загрязнения состояния перекрестного запроса
// из-за создания экземпляра Singleton здесь;
// Если какой-либо клиент изменит этот (глобальный) экземпляр, это может быть
// хорошая идея переместить создание этого экземпляра внутрь
// Функция "export default() => {}" ниже (которая запускается индивидуально
// для каждого клиента)

const dbPath = path.join(__dirname, 'mydatabase.db')

// const db = dbPath

const db = 'db sqlite'
// const db = new sqlite3.Database(dbPath)

// console.log('boot sqlite --------------------------------------')

export default boot(({ app }) => {
    //     // for use inside Vue files (Options API) through this.$axios and this.$api

    //     app.config.globalProperties.$sqlite3 = sqlite3
    //     // ^ ^ ^ это позволит вам использовать this.$axios (для формы Vue Options API)
    //     // поэтому вам не обязательно импортировать axios в каждый файл vue

    app.config.globalProperties.$db = db
    //     // ^ ^ ^ это позволит вам использовать this.$db (для формы Vue Options API)
    //     // чтобы вы могли легко выполнять запросы к API вашего приложения
})

export { db }
