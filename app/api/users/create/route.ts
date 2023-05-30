import { v2 as cloudinary } from 'cloudinary'
import multer, { Options } from "multer"
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dxpkn1nc0",
    api_key: "173471794942925",
    api_secret: "1k187jbO-iDujErLekPlvB8jHcg"
});

// interface options extends CloudinaryStorage  {
//     params: {
//         folder: string,
//         allowed_formats : Array<string>[]
//     }
// }

// Set up Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog-app', // Specify the folder where you want to store the images in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png']
    } as Options
});

const upload = multer({ storage });

export async function POST(req:Request, res: NextResponse){

    const response = await req.json()
    if (!response.file) {
        response.status(400).send('No file uploaded.');
        return;
    }

    // You can save the file details in your database or perform any other necessary operations here
    upload.single(response.image)
    const file = response.file
    console.log('Uploaded file:', file)

    return NextResponse.json(file)
};
