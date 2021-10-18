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
exports.sendGalleryObject = void 0;
var util = require("util");
var fs = require("fs");
var path = require("path");
var ImageSchema_1 = require("../database/models/ImageSchema");
var readdir = util.promisify(fs.readdir);
function sendGalleryObject(req) {
    return __awaiter(this, void 0, void 0, function () {
        var limit, pageNumber, dir, photos, total, galleryResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("QUERY: ", req.query);
                    limit = Number(req.query.limit);
                    pageNumber = Number(req.query.page);
                    dir = path.join(__dirname, '../../static/photos');
                    return [4 /*yield*/, getPhotosArray(dir, pageNumber, limit)];
                case 1:
                    photos = _b.sent();
                    return [4 /*yield*/, getPagesNumber(req)];
                case 2:
                    total = _b.sent();
                    _a = {
                        objects: photos
                    };
                    return [4 /*yield*/, getTotal(req)];
                case 3:
                    galleryResponse = (_a.total = _b.sent(),
                        _a);
                    console.log("GALLERY Response: ", galleryResponse);
                    return [2 /*return*/, galleryResponse];
            }
        });
    });
}
exports.sendGalleryObject = sendGalleryObject;
function getPagesNumber(req) {
    return __awaiter(this, void 0, void 0, function () {
        var limit, counts, result, finalResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = Number(req.query.limit);
                    return [4 /*yield*/, ImageSchema_1.default.count()];
                case 1:
                    counts = _a.sent();
                    return [4 /*yield*/, counts];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, (Math.ceil(result / limit))];
                case 3:
                    finalResult = _a.sent();
                    return [2 /*return*/, finalResult];
            }
        });
    });
}
function getTotal(req) {
    return __awaiter(this, void 0, void 0, function () {
        var total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPagesNumber(req)];
                case 1:
                    total = _a.sent();
                    return [2 /*return*/, total];
            }
        });
    });
}
function getPhotosArray(dir, pageNumber, limit) {
    return __awaiter(this, void 0, void 0, function () {
        var arr, photos, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getValue()];
                case 1:
                    arr = _a.sent();
                    photos = [];
                    for (i = ((pageNumber - 1) * limit); i < limit + ((pageNumber - 1) * limit) && i < arr.length; i++) {
                        photos.push(arr[i].path);
                    }
                    return [2 /*return*/, photos];
            }
        });
    });
}
function getValue() {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImageSchema_1.default.find({}, { path: 1, _id: 0 }).exec()];
                case 1:
                    arr = _a.sent();
                    return [2 /*return*/, arr];
            }
        });
    });
}
