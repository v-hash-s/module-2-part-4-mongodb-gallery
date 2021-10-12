"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var path = require("path");
var express = require("express");
var app = express();
var script_1 = require("./script/script");
function getData(array) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, script_1.default
                    // console.log(arr)
                ];
                case 1:
                    arr = _a.sent();
                    // console.log(arr)
                    return [2 /*return*/, arr];
            }
        });
    });
}
// getData(newArr)
var mongoose = require("mongoose");
var formidableMiddleware = require("express-formidable");
var bodyParser = require("body-parser");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger_1 = require("./logger");
var ImageSchema_1 = require("./database/models/ImageSchema");
// connect to db
var dbURI = 'mongodb+srv://admin:admin1234@mongodbgallery.cby3v.mongodb.net/mongodbgallery?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(function (result) { return app.listen(8080, function () { return console.log('At 8080 port...'); }); })
    .catch(function (err) { return console.log(err); });
exports.db = mongoose.connection;
app.use(cors({
    origin: '*'
}));
app.use(express.json(), logger_1.default);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/upload', formidableMiddleware({
    keepExtensions: true,
    // uploadDir: path.resolve("../static/photos/uploads")
    uploadDir: path.resolve("../static/uploads")
}));
app.use(express.static(path.join(__dirname, '../static/pages')));
app.use(express.static(path.join(__dirname, '../static/photos')));
var destination = path.join('../../static/photos/uploads');
//app.use(express.static(destination))
app.use('/static/photos/uploads', express.static('../../static/photos/uploads'));
app.use(cookieParser());
var loginRouter_1 = require("./routes/loginRouter");
var galleryRouter_1 = require("./routes/galleryRouter");
var uploadRouter_1 = require("./routes/uploadRouter");
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
app.use('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.query);
                limit = Number(req.query.limit);
                console.log(limit);
                return [4 /*yield*/, getValue()];
            case 1:
                arr = _a.sent();
                console.log(arr[0].path);
                return [2 /*return*/];
        }
    });
}); });
// YEEEEEESSSS !!!!!
function getValue() {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImageSchema_1.default.find({}, { path: 1, _id: 0 }).limit(5).exec()
                    // console.log(arr)
                ];
                case 1:
                    arr = _a.sent();
                    // console.log(arr)
                    return [2 /*return*/, arr];
            }
        });
    });
}
app.use('/', loginRouter_1.default);
app.use('/gallery', galleryRouter_1.default);
app.use('/upload', uploadRouter_1.default);
app.all('*', function (req, res) {
    res.status(404).end("Page " + req.url + " not found");
});
// app.listen(8080, () => console.log('At 8080 port...'))
