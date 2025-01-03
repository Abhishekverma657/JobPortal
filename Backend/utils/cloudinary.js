import {v2 as cloudenry} from 'cloudinary'
 import dotenv from 'dotenv'
 dotenv.config();

 cloudenry.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_KEY_SECRET

 })
 export default cloudenry;