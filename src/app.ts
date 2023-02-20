import express, { Application } from 'express'
import * as path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import compression from 'compression'
import httpLogger from './common/logging/http-logger'
import errorHandler from './middleware/error-handler'
import router from './routes'

dotenv.config()

const app: Application = express()
app.use(compression())
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(httpLogger)

app.use(express.urlencoded({ extended: false }))
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.use(express.static(path.join(__dirname, '../public')))

app.use(router)
app.use(errorHandler)

export default app
