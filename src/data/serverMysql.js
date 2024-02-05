import express from 'express'
import mysql from 'mysql2/promise'

// Создаем экземпляр приложения Express
const app = express()
const port = 3000

// Создаем подключение к базе данных MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'soft1',
  password: 'soft1',
  database: 'soft1'
})

// Репозиторий для работы с данными пользователей
class UserRepository {
  async getAllUsers() {
    const connection = await pool.getConnection()
    try {
      const [rows] = await connection.query('SELECT * FROM users')
      return rows
    } finally {
      connection.release()
    }
  }

  async getUserById(id) {
    const connection = await pool.getConnection()
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id])
      return rows[0]
    } finally {
      connection.release()
    }
  }

  async createUser(user) {
    const connection = await pool.getConnection()
    try {
      const [result] = await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [
        user.name,
        user.email
      ])
      return result.insertId
    } finally {
      connection.release()
    }
  }

  async updateUser(id, user) {
    const connection = await pool.getConnection()
    try {
      const [result] = await connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
        user.name,
        user.email,
        id
      ])
      return result.affectedRows
    } finally {
      connection.release()
    }
  }

  async deleteUser(id) {
    const connection = await pool.getConnection()
    try {
      const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id])
      return result.affectedRows
    } finally {
      connection.release()
    }
  }
}

// Создаем экземпляр репозитория пользователей
const userRepository = new UserRepository()

// Middleware для парсинга JSON-тела запросов
app.use(express.json())

// Обработчики маршрутов API
app.get('/users', async (req, res) => {
  try {
    const users = await userRepository.getAllUsers()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await userRepository.getUserById(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body
    const userId = await userRepository.createUser({ name, email })
    res.json({ id: userId })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name, email } = req.body
    const result = await userRepository.updateUser(id, { name, email })
    if (result > 0) {
      res.sendStatus(200)
    } else {
      res.status(404).send('User not found')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await userRepository.deleteUser(id)
    if (result > 0) {
      res.sendStatus(200)
    } else {
      res.status(404).send('User not found')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

// Запускаем сервер на указанном порту
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
