"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: '../.env' }); // db
var path = require("path");
var express = require("express");
var app = express();
var connectToMongoDB_1 = require("./database/connectToMongoDB");
// async function getData(array: any) {
//   let arr = await newArr
//   // console.log(arr)
//   return arr
// }
// getData(newArr)
var mongoose = require("mongoose");
var formidableMiddleware = require("express-formidable");
var bodyParser = require("body-parser");
var cors = require("cors");
var cookieParser = require("cookie-parser");
// connect to db
// const dbURI = 'mongodb+srv://admin:admin1234@mongodbgallery.cby3v.mongodb.net/mongodbgallery?retryWrites=true&w=majority'
// const dbURI = process.env.DB_STRING
// console.log(dbURI)
// mongoose.connect(dbURI)
//   .then((result: any) => app.listen(8080, () => console.log('At 8080 port...')))
//   .catch((err: any) => console.log(err))
// export const db = mongoose.connection;
connectToMongoDB_1.default()
    .then(function () { return console.log('Database connection established'); })
    .then(function () { return app.listen(process.env.PORT, function () { return console.log("At port " + process.env.PORT); }); })
    .catch(function (err) { return console.log(err.message); });
app.use(cors({
    origin: '*'
}));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/upload', formidableMiddleware({
    keepExtensions: true,
    uploadDir: path.resolve("../static/uploads")
}));
app.use(express.static(path.join(__dirname, '../static/pages')));
app.use(express.static(path.join(__dirname, '../static/photos')));
app.use('/static/photos/uploads', express.static('../../static/photos/uploads'));
app.use(cookieParser());
var loginRouter_1 = require("./routes/loginRouter");
var galleryRouter_1 = require("./routes/galleryRouter");
var uploadRouter_1 = require("./routes/uploadRouter");
app.use('/', loginRouter_1.default);
app.use('/gallery', galleryRouter_1.default);
app.use('/upload', uploadRouter_1.default);
app.all('*', function (req, res) {
    res.status(404).end("Page " + req.url + " not found");
});
