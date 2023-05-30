import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

type Props = {
    params: {
        id: string
    }
}

export async function GET(req : Request ,{params :{ id }}: Props) {



    const user = await prisma.post.findUnique({
        where: {id: id}
    })
    return NextResponse.json(user)
    

}

export async function DELETE(req : Request ,{params :{ id }}: Props) {



    const user = await prisma.post.delete({
        where: {id: id}
    })
    return NextResponse.json('Deleted')
    

}