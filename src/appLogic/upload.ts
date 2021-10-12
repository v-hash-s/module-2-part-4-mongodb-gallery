import * as fs from 'fs'
import { folders } from '../appLogic/gallery.js'
import * as express from 'express'
import * as path from 'path'
import { db } from '../server'
import ImageModel from '../database/models/ImageSchema'


export function uploadImg(req: any, res: any){
    if (req.files.photo.size != '0') {
        console.log(req.files.photo.path)
        console.log(path.join(path.resolve("../static/photos"), req.files.photo.name))
        fs.rename(req.files.photo.path, path.join(path.resolve("../static/photos"), req.files.photo.name), (err) => {
            if (err) throw err
         });
        let img = req.files.photo.name
        fs.stat(path.join(__dirname, `../../static/photos/${img}`), (err: any, data: any) => {
                if(err){
                    console.log(err)
                } else {
                    const image = new ImageModel({
                        path: img,
                        metadata: data
                    })

                    image.save().then((result: any) => console.log(result))
                }
            })
    } else {
        fs.unlink(req.files.photo.path, () => { });
    }
}

