
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const salesData = require('./data/sales.json')
const products = require('./data/products.json')

// APIs
app.get('/api/sales', (req, res) => res.json(salesData))
app.get('/api/products', (req, res) => res.json(products))
app.post('/api/products', (req, res) => {
  const newProduct = req.body
  products.push(newProduct)
  res.status(201).json(newProduct)
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
