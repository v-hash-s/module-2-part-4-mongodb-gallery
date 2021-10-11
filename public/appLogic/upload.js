"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImg = void 0;
var fs = require("fs");
var path = require("path");
// import { db } from '../server'
function uploadImg(req, res) {
    if (req.files.photo.size != '0') {
        // fs.rename(req.files.photo.path, path.join(path.resolve("../static/photos"), folders[req.fields.pageNumInForm], req.files.photo.name), () => { });
        fs.rename(req.files.photo.path, path.join(path.resolve("../static/photos")), function () { });
    }
    else {
        fs.unlink(req.files.photo.path, function () { });
    }
}
exports.uploadImg = uploadImg;
