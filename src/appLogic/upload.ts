import * as fs from 'fs'
import * as express from 'express'
import * as path from 'path'
import { db } from '../server'
import ImageModel from '../database/models/ImageSchema'


export async function uploadImg(req: any, res: any) {
    if (req.files.photo.size != '0') {
        console.log(req.files.photo.name)
        let isPresent: any = await isExist(req.files.photo.name)
        console.log('IS REAL: ', isPresent)
        if (isPresent) {
            return
        } else {

            console.log("CONTINUED")

            fs.renameSync(req.files.photo.path, path.join(__dirname, "../../static/photos/", req.files.photo.name))
            let img = req.files.photo.name
            let stats = fs.statSync(path.join(__dirname, `../../static/photos/${img}`))
            const image = new ImageModel({
                path: img,
                metadata: stats
            })
            await image.save().then((result: any) => console.log(result))
        }
    } else {
        fs.unlinkSync(req.files.photo.path);
    }
}

async function isExist(imagePath: string) {
    let collection = await db.collection('images')
    let exist = await collection.findOne({ path: imagePath }, { path: 1 }).then(function (data: any) {
        if (data) {
            return true
        } else {
            return false
        }
    })
    return exist
}

