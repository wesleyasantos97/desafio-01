const express = require('express')
const Database  = require('../database.js') 
const crypto = require('crypto')
const bodyParser = require('body-parser')
const app = express()
const database = new Database()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/tasks', (req, res) => {
  const tasks = database.select('tasks') 
  return res.send(JSON.stringify(tasks))
})
app.post('/tasks',(req, res) => {
  
    const {title, description} = req.body
     const task = {
      id:crypto.randomUUID(),
      title,
      description,
      created_at: new Date(), 
      completed_at: null,
      updated_at: null 
     }
     database.insert('tasks', task  )
   return res.json(task)
})
app.patch('/tasks/:id/complete',(req, res) => {
  
  const id = req.params.id

  const task = database.selectById('tasks', id)

  const data = {...task, completed_at: new Date()}
  database.update('tasks', id, data)
  return res.json(data)
})


app.put('/tasks/:id',(req, res) => {
  
  const id = req.params.id
  const {title, description} = req.body
  const task = database.selectById('tasks', id)

  const data = {...task, title, description,  updated_at: new Date()}
  database.update('tasks', id, data)
  return res.json(data)
})




app.delete('/tasks/:id',(req, res) => {
  
  const id = req.params.id
  
  database.delete('tasks', id)
  return res.end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${5000}`)
})