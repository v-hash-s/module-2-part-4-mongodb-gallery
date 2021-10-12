const fs = require('fs')
const path = require('path')
const util = require('util');
const readdir = util.promisify(fs.readdir);
// const images = fs.readdirSync('./photos')



const images = readdir(path.join(__dirname, '../../static/photos'))
console.log(path.join(__dirname, '../../static/photos'))

async function getData(images: any) {
    let arr: any = []
    let asyncImages = await images
    for (let img of asyncImages) {
    
        await new Promise((resolve, reject) => {
            fs.stat(path.resolve(path.join(__dirname, `../../static/photos/${img}`)), (err: any, data: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(arr.push({ metadata: data, image: img }))
                }
            })
        })
    }
    // console.log(arr)
    return arr
}

const newArr = getData(images)



export default newArr


