import * as path from 'path'
import * as express from 'express'
const app = express()

import newArr from './script/script'

async function getData(array: any) {
  let arr = await newArr
  // console.log(arr)
  return arr
}

// getData(newArr)

const mongoose = require("mongoose");

import { Request, Response } from "express"
import * as formidableMiddleware from 'express-formidable'
import * as fs from 'fs'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'

import logger from "./logger"

import ImageModel from './database/models/ImageSchema'

// connect to db
const dbURI = 'mongodb+srv://admin:admin1234@mongodbgallery.cby3v.mongodb.net/mongodbgallery?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result: any) => app.listen(8080, () => console.log('At 8080 port...')))
  .catch((err: any) => console.log(err))

export const db = mongoose.connection;

app.use(cors({
  origin: '*'
}))

app.use(express.json(), logger);

app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/upload', formidableMiddleware({
    keepExtensions: true,
  // uploadDir: path.resolve("../static/photos/uploads")
  uploadDir: path.resolve("../static/uploads")

}));

app.use(express.static(path.join(__dirname, '../static/pages')))
app.use(express.static(path.join(__dirname, '../static/photos')))

const destination = path.join('../../static/photos/uploads');
//app.use(express.static(destination))
app.use('/static/photos/uploads', express.static('../../static/photos/uploads'))


app.use(cookieParser())

import loginRouter from './routes/loginRouter'
import galleryRouter from './routes/galleryRouter'
import uploadRouter from './routes/uploadRouter'
import { request } from 'http'
import { Model } from 'mongoose'

// const loginRouter = require('./loginRouter.js')
// const galleryRouter = require('./galleryRouter.js')
// const uploadRouter = require('./uploadRouter.js')
// app.get('/images', async (req: Request, res: Response) => {
//   let images = await getData(newArr)
//   for (let image of images) {
//     const img = new ImageModel({
//       path: image.image,
//       metadata: image.metadata
//     })

//     img.save()
//       .then((result: any) => console.log(result))
//   }

// })

// check if exists

app.use('/images', async (req: Request, res: Response) => {
  console.log(req.query)
  let limit = Number(req.query.limit)
  console.log(limit)
  ImageModel.find({ path: "anton-ivanov-L38IxgRzVcE-unsplash.jpg" }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        console.log('exists!')
      }
    }
  });
  // let collection = db.collection('images')
  // let counts = await collection.count().then((count: any) => {
  //   console.log(Math.ceil(count / limit));
  //   })
  })


app.use('/', loginRouter)
app.use('/gallery', galleryRouter)
app.use('/upload', uploadRouter)

app.all('*', (req: Request, res: Response) => {
  res.status(404).end(`Page ${req.url} not found`);
    
  });

// app.listen(8080, () => console.log('At 8080 port...'))
