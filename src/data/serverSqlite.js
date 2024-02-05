import express from 'express'
import sqlite3 from 'sqlite3'

// Создаем экземпляр приложения Express
const appExpress = express();
const port = 3000;

// Создаем подключение к базе данных SQLite
// Используем память для демонстрации, можно указать путь к файлу
//const db = new sqlite3.Database(':memory:')
const db = new sqlite3.Database('/sqlite/d1')

// Создаем таблицу "users" в базе данных
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)")
})

// Репозиторий для работы с данными пользователей
class UserRepository {
  getAllUsers() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  createUser(user) {
    return new Promise((resolve, reject) => {
      const { name, email } = user;
      db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.lastID)
        }
      })
    })
  }

  updateUser(id, user) {
    return new Promise((resolve, reject) => {
      const { name, email } = user;
      db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.changes)
        }
      })
    })
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.changes)
        }
      })
    })
  }
}

// Создаем экземпляр репозитория пользователей
const userRepository = new UserRepository()

// Обработчики маршрутов API
appExpress.get('/users', async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

appExpress.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRepository.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

appExpress.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = await userRepository.createUser({ name, email });
    res.json({ id: userId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

appExpress.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    const result = await userRepository.updateUser(id, { name, email });
    if (result > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

appExpress.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userRepository.deleteUser(id);
    if (result > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Запускаем сервер на указанном порту
appExpress.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
