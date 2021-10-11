import * as fs from 'fs'
import { folders } from '../appLogic/gallery.js'
import * as express from 'express'
import * as path from 'path'
// import { db } from '../server'



export function uploadImg(req: any, res: any){
    if (req.files.photo.size != '0') {
        // fs.rename(req.files.photo.path, path.join(path.resolve("../static/photos"), folders[req.fields.pageNumInForm], req.files.photo.name), () => { });
        fs.rename(req.files.photo.path, path.join(path.resolve("../static/photos")), () => { });
    } else {
        fs.unlink(req.files.photo.path, () => { });
    }
}

