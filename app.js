// From Dan's Guides: https://github.com/justsml/guides/tree/master/express/setup-guide
// TODO: INSTALL PRE-REQS:
//  npm install express cors body-parser morgan nodemon
const express     = require('express')
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const cors        = require('cors')
const app         = module.exports = express()
const port        = parseInt(process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
app.use(cors({origin: true, credentials: true})) // <= Disable if you don't need CORS

// TODO: ADD (MOUNT) YOUR MIDDLEWARE (ROUTES) HERE:
app.use('/api/v1', require('./routes/kitten'))

app.use('/', (req, res) => {
  res
    .type('html')
    .send(`<html>
  <head><title>Adorbs as a Service</title></head>
  <body style='font-family: sans-serif; font-size: 1.5em;'>
    <a href='https://github.com/justsml/adorbs-as-a-service'>GitHub README</a>
    <br />
    <br />
    Example Image (400px width, 500px height):<br />
    <a href='https://adorbs-as-a-service.herokuapp.com/api/v1/w400/h500'>
      <img src='https://adorbs-as-a-service.herokuapp.com/api/v1/w400/h500' alt='VIEW RANDOM IMAGE' />
    </a>
    <br />
  </body>
</html>`)
})

// The following 2 `app.use`'s MUST follow ALL your routes/middleware
app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
  res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

app.listen(port)
  .on('error',     console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on http://0.0.0.0:' + port))
