import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req : Request) {

    const posts = await prisma.post.findMany()
    return NextResponse.json(posts)
}


export async function POST(req : Request) {
    const newPostData = await  req.json()

    const user = await prisma.post.create({
       data: newPostData
    })
    return NextResponse.json(user)
}

export async function DELETE(req : Request) {
    
   
    // const body = await req.json()
    // console.log(body)

    const user = await prisma.post.delete({
        where: {id: "64673e1a2501e17b83bf0b1c"}
    })
    return NextResponse.json('user')
    

}


