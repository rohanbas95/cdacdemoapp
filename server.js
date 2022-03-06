const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://cdac:z3V3i6aBNvIf95sE5dIP3ninmz6N1VjeiSg83lrN2hrf4un2MyMk1P0vNiqT9A5q3eZUWmVYCPMxXRI2w8IbKA==@cdac.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=false', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)