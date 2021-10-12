import { IncomingMessage } from "http"
import { Request } from "express"
import { basename, dirname } from "path/posix"
import { GalleryResponse, ErrorMessage  } from "../interfaces"
import * as util from 'util';

import * as fs from 'fs'
import * as path from 'path'
import * as querystring from 'querystring'

import { db } from '../server'
import ImageModel from '../database/models/ImageSchema'

const readdir = util.promisify(fs.readdir);

export enum folders {
    first_page = 1,
    second_page,
    third_page,
    fourth_page,
    fifth_page,
}


let photos: Array<string> = [];

// export async function sendGalleryObject(pageNumber: any): Promise<GalleryResponse | ErrorMessage>{
export async function sendGalleryObject(req: Request) {

    // photos = [];
    // if (isNaN(Number(pageNumber)) || Number(pageNumber) > 5 || Number(pageNumber) < 1) {
    //     console.log("Wrong page number")
    //     return {
    //         errorMessage: "Invalid page number"
    //     };
    // }
    // let dir = path.join(__dirname, '../../static/photos', folders[pageNumber])
    // console.log("Dir: " + dir)
    // let files = await readdir(dir)

    // files.forEach((file: any) => {
    //     photos.push(file)
    // });

    // console.log("Photos: " + photos)

    // let galleryResponse: GalleryResponse = {
    //     objects: photos,
    //     page: pageNumber.toString(),
    //     total: 5
    // }

    // console.log(galleryResponse)

    // photos = [];


    // if (isNaN(Number(pageNumber)) || Number(pageNumber) > 5 || Number(pageNumber) < 1) {
    //     console.log("Wrong page number")
    //     return {
    //         errorMessage: "Invalid page number"
    //     };
    // }
    console.log("QUERY: ", req.query)
    let limit = Number(req.query.limit)
    let pageNumber = Number(req.query.page)
    let dir = path.join(__dirname, '../../static/photos')
    console.log("Dir: " + dir)
    // let files = await readdir(dir)


    // console.log(files)
    // let limitCounter = 0;
    // files.forEach((file: any) => {
    //     if (limitCounter < limit) {

    //         photos.push(file)
    //         limitCounter++;
    //     } else {
    //         return
    //     }
    // });


    let photos = await getPhotosArray(dir, pageNumber, limit)
    // for(let i = ((pageNumber - 1) * limit); i < limit; i++){
    //     console.log('Photo: ')
    //     console.log(i, " : ", files[i])
    //     photos.push(files[i])
    // }

    console.log("Photos: " + photos)
    let total = await getPagesNumber(req)
    console.log("TOTAL: ", total)
    console.log("SIZE: ", photos.length)
    let galleryResponse = {
        objects: photos,
        total: await getTotal(req)
    }

    console.log("GALLERY Response: ",galleryResponse)

    return galleryResponse;
}    

async function getPagesNumber(req: Request){
  console.log(req.query)
  let limit = Number(req.query.limit)
  console.log(limit)
  let collection = await db.collection('images')
//   collection.find().toArray()
//   let counts = await collection.count().then((count: any) => {
//     console.log(Math.ceil(count / limit));
//     })
    let counts = await collection.count()
    let result = await counts
    let finalResult = await(Math.ceil(result / limit))
    console.log("COUNTS: ",finalResult)
    return finalResult

}

async function getTotal( req: Request){
    let total = await getPagesNumber(req)
    return total
}

async function getPhotosArray(dir: any, pageNumber: number, limit: number){
    let arr = await getValue()
    console.log("MY ARR: ",arr)
    // let files = await readdir(dir)
    let photos = []

    for(let i = ((pageNumber - 1) * limit); i < limit + ((pageNumber - 1) * limit) && i < arr.length; i++){
        console.log('Photo: ')
        console.log(i, " : ", arr[i].path)
        photos.push(arr[i].path)
    }

    // for(let i = ((pageNumber - 1) * limit); i < limit + ((pageNumber - 1) * limit) && i < files.length; i++){
    //     console.log('Photo: ')
    //     console.log(i, " : ", files[i])
    //     photos.push(files[i])
    // }
    return photos
}



async function getValue(){
    
    let arr = await ImageModel.find({}, {path: 1, _id: 0}).exec()
    // console.log(arr)
    return arr
    
    }