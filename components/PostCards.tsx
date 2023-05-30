

import React from 'react'
import Link from 'next/link'


type Post = {
    title: string,
    body?: string
    id: string,
    image: string
    authorId: string
  }

type Props = {
  posts : Post[]
  getPosts: () => Promise<void>
}



function PostCard({posts,getPosts}: Props) {

  const deletePost = async(id: string)=>{
    const res =  await fetch(`/api/users/${id}`,{
       cache: "no-store",
       method: "DELETE",
       headers: {
           "Content-Type": "application"
       }
   })

   if(res.ok){
    getPosts()
   }
 
}

  return <>
    {
    posts &&   posts?.reverse().map((post:Post)=>(<article key={post.id} className=" dark:bg-gray-900 mt-3 m-2 w-full rounded-md">
    <div  className="flex flex-col flex-1 p-6">
    <p rel="noopener noreferrer"  aria-label="Te nulla oportere reprimique his dolorum"></p>
    <p rel="noopener noreferrer" className="text-xs tracking-wider uppercase hover:underline dark:text-teal-500">{post.title}</p>
    <Link href={"/post/"+post.id} className="hover:underline">
    {post.image ?  <img  alt="Image" src={post.image} width={1000} height={100} className="rounded-md mt-2"/> 
    : <img src="https://res.cloudinary.com/dxpkn1nc0/image/upload/v1684569953/blog-app/ptqjwgzd49pnlwq5wmwc.png" width={1000} height={100} className="rounded-md mt-2" alt="img" />
  }
    
    <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{post.body?.substring(0,100) + "..."}</h3>
    </Link>
    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
      <button><span onClick={()=>{deletePost(post.id)}}>Delete</span></button>
    </div>
  </div>
  </article>)
  
)
  }
  </>
}

export default PostCard