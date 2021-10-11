"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImg = void 0;
var fs = require("fs");
var path = require("path");
var ImageSchema_1 = require("../database/models/ImageSchema");
function uploadImg(req, res) {
    if (req.files.photo.size != '0') {
        console.log(req.files.photo.name);
        fs.rename(req.files.photo.path, path.join(path.resolve("../static/photos", req.files.photo.name)), function () { });
        var img_1 = req.files.photo.name;
        fs.stat(path.join(__dirname, "../../static/photos/" + img_1), function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var image = new ImageSchema_1.default({
                    path: img_1,
                    metadata: data
                });
                image.save().then(function (result) { return console.log(result); });
            }
        });
    }
    else {
        fs.unlink(req.files.photo.path, function () { });
    }
}
exports.uploadImg = uploadImg;
