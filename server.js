require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const blocksRouter = require('./routes/block_route')
app.use('/blocks', blocksRouter)

const chainRouter = require('./routes/chain_route')
app.use('/chain', chainRouter)

const mineRouter = require('./routes/mine_route')
app.use('/mine', mineRouter)

app.listen(4341, () => console.log('Server Started'))