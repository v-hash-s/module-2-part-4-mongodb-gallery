import { IncomingMessage } from "http"
import { Request } from "express"
import { basename, dirname } from "path/posix"
import { GalleryResponse, ErrorMessage  } from "../interfaces"
import * as util from 'util';

import * as fs from 'fs'
import * as path from 'path'
import * as querystring from 'querystring'

import ImageModel from '../database/models/ImageSchema'

const readdir = util.promisify(fs.readdir);


export async function sendGalleryObject(req: Request) {

    
    console.log("QUERY: ", req.query)
    let limit = Number(req.query.limit)
    let pageNumber = Number(req.query.page)
    let dir = path.join(__dirname, '../../static/photos')
    
    let photos = await getPhotosArray(dir, pageNumber, limit)
    
    let total = await getPagesNumber(req)
    let galleryResponse = {
        objects: photos,
        total: await getTotal(req)
    }

    console.log("GALLERY Response: ",galleryResponse)

    return galleryResponse;
}    

async function getPagesNumber(req: Request){
    let limit = Number(req.query.limit)

    let counts = await ImageModel.count()
    let result = await counts
    let finalResult = await(Math.ceil(result / limit))
    return finalResult

}

async function getTotal( req: Request){
    let total = await getPagesNumber(req)
    return total
}

async function getPhotosArray(dir: any, pageNumber: number, limit: number){
    let arr = await getValue()
    let photos = []

    for(let i = ((pageNumber - 1) * limit); i < limit + ((pageNumber - 1) * limit) && i < arr.length; i++){
        photos.push(arr[i].path)
    }

    
    return photos
}

async function getValue(){
    
    let arr = await ImageModel.find({}, {path: 1, _id: 0}).exec()
    return arr
    
    }