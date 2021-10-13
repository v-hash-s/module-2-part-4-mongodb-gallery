import { Token, UsersDB } from '../interfaces'
import { db } from '../server'

export const token: Token = {
    'token': 'token',
}


export async function isValidUser(req: any){
    let collection = db.collection('users')
    let data = await collection.findOne({email: req.body.email}, {email: 1, password : 1}).then(function(data: any){
        if(data){
            if(data.email === req.body.email && data.password === req.body.password){
                return true
            } else {
                return false
            }
        }
        
    })
    console.log(data);

   return data
}



export function sendToken(){

        return JSON.stringify(token)
    
}

