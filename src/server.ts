require('dotenv').config({ path: '../.env' }) // db

import * as path from 'path'
import * as express from 'express'
const app = express()

import db from './database/connectToMongoDB'

// async function getData(array: any) {
//   let arr = await newArr
//   // console.log(arr)
//   return arr
// }

// getData(newArr)

const mongoose = require("mongoose");

import { Request, Response } from "express"
import * as formidableMiddleware from 'express-formidable'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'



// connect to db
// const dbURI = 'mongodb+srv://admin:admin1234@mongodbgallery.cby3v.mongodb.net/mongodbgallery?retryWrites=true&w=majority'
// const dbURI = process.env.DB_STRING
// console.log(dbURI)
// mongoose.connect(dbURI)
//   .then((result: any) => app.listen(8080, () => console.log('At 8080 port...')))
//   .catch((err: any) => console.log(err))

// export const db = mongoose.connection;

db()
  .then(() => console.log('Database connection established'))
  .then(() => app.listen(process.env.PORT, () => console.log(`At port ${process.env.PORT}`)))
  .catch((err: any) => console.log(err.message))

app.use(cors({
  origin: '*'
}))


app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/upload', formidableMiddleware({
  keepExtensions: true,
  uploadDir: path.resolve("../static/uploads")

}));

app.use(express.static(path.join(__dirname, '../static/pages')))
app.use(express.static(path.join(__dirname, '../static/photos')))

app.use('/static/photos/uploads', express.static('../../static/photos/uploads'))


app.use(cookieParser())

import loginRouter from './routes/loginRouter'
import galleryRouter from './routes/galleryRouter'
import uploadRouter from './routes/uploadRouter'




app.use('/', loginRouter)
app.use('/gallery', galleryRouter)
app.use('/upload', uploadRouter)

app.all('*', (req: Request, res: Response) => {
  res.status(404).end(`Page ${req.url} not found`);
    
  });

