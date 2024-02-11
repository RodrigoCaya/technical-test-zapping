import connection from '../db/index.mjs'

export const getUser = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from users WHERE email = "'+ email +'" LIMIT 1;', (err, rows) => {
      if (err) reject(err)
      if (rows === undefined) resolve(null)
      else resolve(rows[0])
    })
  })
}

export const createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users (name, email, password) VALUES ("'+ name +'", "'+ email +'", "'+ password +'");', (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from users;', (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}