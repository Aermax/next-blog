"use client"

import React,{useState, FormEvent,Suspense, ChangeEvent} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios';
import Dropzone from 'react-dropzone';


type User = {
    name: string,
    email: string,

}





function Create() {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string>("")
    const [imageUrl,setImageUrl] = useState("")
    const [isUploaded,setIsUploaded] = useState(false)

    const router = useRouter()

    async function createPost(e: FormEvent){
        
        e.preventDefault()
        const res = await fetch("/api/users",{
            cache: "no-store",
            method: "POST",
            headers: {
                "Content-Type": "application"
            },
            body: JSON.stringify({
                title: title,
                body: content,
                image: imageUrl,
                authorId: "64673ae92501e17b83bf0b0f"
            })
        })
        
        router.push('/')
    }



    const selectImage = (e: ChangeEvent<HTMLInputElement>)=>{
        const selectedFiles = e.target.files as FileList;
        setSelectedFile(selectedFiles?.[0])
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]))


    }

  const uploadImage = async () => {
    setLoading(true)

    if (!selectedFile) {
      console.log('No file selected.');
      setLoading(false)
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const image = await axios.post('http://localhost:3000/api/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setImageUrl(image.data)
      setLoading(false)
      setIsUploaded(true)
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false)
    }

    

  };

  const removeImage = ()=>{
    setPreviewImage("") 
    setIsUploaded(false)
  }
    
   

  return (
   <>
   <div className='dark:bg-gray-900 h-14 flex items-center justify-between'>
   <Link href="/"><svg width="200" height="60" viewBox="0 0 414 187" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M82.646 36.3397C85.7401 34.5534 89.552 34.5534 92.646 36.3397L133.614 59.9925L105.286 76.5799C100.901 72.1776 94.8325 69.4531 88.128 69.4531C81.1554 69.4531 74.871 72.3999 70.4523 77.1161L41.4416 60.1291L82.646 36.3397Z" fill="#00FFCA"/>
<path d="M64.9303 86.6964L35.9141 69.7063V117.2L64.8222 100.273C64.2287 98.1738 63.9111 95.959 63.9111 93.67C63.9111 91.2458 64.2673 88.9048 64.9303 86.6964Z" fill="#00FFCA"/>
<path d="M70.1924 109.942L41.8975 126.51L82.646 150.036C85.74 151.822 89.552 151.822 92.646 150.036L133.158 126.647L105.556 110.484C101.152 115.048 94.9714 117.887 88.128 117.887C81.0175 117.887 74.6227 114.822 70.1924 109.942Z" fill="#00FFCA"/>
<path d="M111.22 100.987L139.376 117.474C139.377 117.41 139.378 117.346 139.378 117.282V69.4312L111.101 85.9884C111.908 88.402 112.345 90.985 112.345 93.67C112.345 96.2203 111.951 98.6785 111.22 100.987Z" fill="#00FFCA"/>
<path fillRule="evenodd" clipRule="evenodd" d="M172.893 120.923C176.951 123.4 181.827 124.639 187.519 124.639C193.211 124.639 198.086 123.4 202.145 120.923C206.23 118.419 209.352 114.941 211.513 110.487C213.701 106.034 214.794 100.868 214.794 94.9918C214.794 89.1151 213.701 83.9499 211.513 79.4962C209.352 75.0426 206.23 71.5772 202.145 69.1C198.086 66.5965 193.211 65.3447 187.519 65.3447C181.827 65.3447 176.951 66.5965 172.893 69.1C168.835 71.5772 165.712 75.0426 163.525 79.4962C161.364 83.9499 160.283 89.1151 160.283 94.9918C160.283 100.868 161.364 106.034 163.525 110.487C165.712 114.941 168.835 118.419 172.893 120.923ZM197.046 113.136C194.516 114.849 191.34 115.692 187.519 115.666C183.698 115.613 180.509 114.73 177.953 113.017C175.423 111.304 173.526 108.919 172.261 105.862C170.996 102.779 170.363 99.1555 170.363 94.9918C170.363 90.828 170.996 87.1913 172.261 84.0816C173.552 80.972 175.462 78.5607 177.992 76.8478C180.522 75.1348 183.698 74.2915 187.519 74.3179C191.34 74.3706 194.516 75.2534 197.046 76.9664C199.602 78.6793 201.512 81.0774 202.777 84.1607C204.069 87.2176 204.714 90.828 204.714 94.9918C204.714 99.1555 204.069 102.792 202.777 105.902C201.512 109.012 199.602 111.423 197.046 113.136Z" fill="#fff"/>
<path d="M219.5 121.453C219.5 122.557 220.395 123.453 221.5 123.453H227.066C228.171 123.453 229.066 122.557 229.066 121.453V101.751C229.066 100.117 229.264 98.6021 229.659 97.2054C230.054 95.7823 230.66 94.5174 231.477 93.4106C232.321 92.3038 233.401 91.3946 234.719 90.683C236.036 89.8925 237.512 89.4313 239.146 89.2995C239.759 89.2509 240.345 89.2363 240.904 89.256C242.237 89.3027 243.534 88.322 243.534 86.9886V82.4554C243.534 81.4778 242.827 80.6297 241.851 80.5753C241.12 80.5345 240.376 80.5438 239.62 80.6031C238.276 80.6821 236.959 80.9325 235.668 81.3541C234.403 81.7494 233.243 82.3028 232.189 83.0144C230.95 83.7786 229.883 84.7536 228.987 85.9395C228.597 86.4599 228.241 87.0068 227.92 87.5802V82.7612C227.92 81.6566 227.024 80.7612 225.92 80.7612H221.5C220.395 80.7612 219.5 81.6566 219.5 82.7612V121.453Z" fill="#fff"/>
<path fillRule="evenodd" clipRule="evenodd" d="M268.431 124.639C264.267 124.639 260.775 123.651 257.955 121.674C257.357 121.255 256.791 120.804 256.256 120.321V121.453C256.256 122.557 255.36 123.453 254.256 123.453H249.836C248.731 123.453 247.836 122.557 247.836 121.453V68.5306C247.836 67.426 248.731 66.5306 249.836 66.5306H255.441C256.546 66.5306 257.441 67.426 257.441 68.5306V82.8297C257.572 82.7314 257.703 82.6349 257.837 82.54C260.604 80.5635 264.016 79.5753 268.075 79.5753C272.107 79.5753 275.599 80.5635 278.55 82.54C281.528 84.4901 283.834 87.1649 285.468 90.5645C287.102 93.9376 287.919 97.7852 287.919 102.107C287.919 106.376 287.115 110.211 285.507 113.61C283.9 117.01 281.633 119.698 278.708 121.674C275.783 123.651 272.357 124.639 268.431 124.639ZM257.323 94.7941C256.611 96.876 256.256 99.3136 256.256 102.107C256.256 104.874 256.611 107.312 257.323 109.42C258.061 111.528 259.207 113.175 260.762 114.361C262.343 115.521 264.412 116.1 266.968 116.1C269.445 116.1 271.488 115.481 273.095 114.243C274.703 113.004 275.888 111.331 276.653 109.222C277.443 107.088 277.839 104.716 277.839 102.107C277.839 99.5244 277.443 97.179 276.653 95.0708C275.862 92.9362 274.637 91.2496 272.976 90.011C271.316 88.7461 269.208 88.1136 266.652 88.1136C264.227 88.1136 262.251 88.7066 260.722 89.8925C259.194 91.052 258.061 92.6859 257.323 94.7941Z" fill="#fff"/>
<path d="M294.26 121.453C294.26 122.557 295.155 123.453 296.26 123.453H301.787C302.891 123.453 303.787 122.557 303.787 121.453V82.7612C303.787 81.6566 302.891 80.7612 301.787 80.7612H296.26C295.155 80.7612 294.26 81.6566 294.26 82.7612V121.453Z" fill="#fff"/>
<path d="M337.487 121.792C337.487 122.755 336.802 123.587 335.849 123.726C333.594 124.056 331.373 124.189 329.186 124.125C326.498 124.072 324.087 123.585 321.952 122.662C319.818 121.714 318.197 120.225 317.09 118.195C316.115 116.351 315.601 114.467 315.548 112.543C315.496 110.619 315.469 108.445 315.469 106.02V88.2322H309.722C308.617 88.2322 307.722 87.3368 307.722 86.2322V82.7612C307.722 81.6566 308.617 80.7612 309.722 80.7612H315.469V70.9024C315.469 69.7978 316.365 68.9024 317.469 68.9024H322.956C324.061 68.9024 324.956 69.7978 324.956 70.9024V80.7612H335.487C336.592 80.7612 337.487 81.6566 337.487 82.7612V86.2322C337.487 87.3368 336.592 88.2322 335.487 88.2322H324.956V105.467C324.956 107.18 324.97 108.682 324.996 109.973C325.049 111.265 325.325 112.319 325.826 113.136C326.775 114.717 328.29 115.6 330.372 115.784C331.833 115.914 333.438 115.9 335.185 115.744C336.402 115.635 337.487 116.565 337.487 117.787V121.792Z" fill="#fff"/>
<path d="M348.617 121.714C351.726 123.664 355.481 124.639 359.882 124.639C364.652 124.639 368.684 123.479 371.978 121.16C374.74 119.194 376.807 116.524 378.179 113.151C378.617 112.074 377.929 110.903 376.794 110.65L370.928 109.338C369.93 109.115 368.942 109.692 368.491 110.61C367.807 112.002 366.927 113.12 365.851 113.966C364.402 115.125 362.412 115.705 359.882 115.705C356.298 115.705 353.597 114.453 351.779 111.95C349.961 109.446 349.051 106.165 349.051 102.107C349.051 99.4981 349.433 97.1659 350.198 95.1103C350.962 93.0548 352.148 91.4473 353.755 90.2878C355.363 89.1019 357.405 88.5089 359.882 88.5089C362.07 88.5089 364.02 89.1546 365.733 90.4459C366.977 91.3645 367.964 92.5543 368.693 94.015C369.171 94.9705 370.22 95.5627 371.251 95.2835L377.014 93.7226C378.061 93.4391 378.703 92.3672 378.343 91.3438C377.169 88.0031 375.153 85.3057 372.295 83.2515C368.948 80.8007 364.85 79.5753 360.001 79.5753C355.679 79.5753 351.95 80.5504 348.814 82.5005C345.678 84.4242 343.254 87.0859 341.541 90.4854C339.854 93.8586 338.998 97.7324 338.971 102.107C338.998 106.403 339.828 110.25 341.462 113.65C343.122 117.049 345.507 119.737 348.617 121.714Z" fill="#fff"/>
<path d="M294.033 69.2575L296.716 66.5744C297.887 65.4029 299.787 65.4029 300.958 66.5744L303.641 69.2575C304.813 70.4291 304.813 72.3286 303.641 73.5002L300.958 76.1833C299.787 77.3548 297.887 77.3548 296.716 76.1833L294.033 73.5002C292.861 72.3286 292.861 70.4291 294.033 69.2575Z" fill="#fff"/>
</svg></Link>
   <Link href="/" className='bg-red-500 text-black p-1 w-14 m-5 rounded-md  mx-4' type="submit">Home</Link>
    </div>
    <div className="flex flex-col items-center mt-14 gap-3">
            <h1>Create a New Post</h1>
            <form onSubmit={createPost} className='flex flex-col items-center mt-14 gap-3 w-full h-full'>
                <input
                    className='text-black w-1/2 rounded-md p-3 focus:outline-none focus:ring-teal-300 focus:ring-2'
                    type="text"
                    placeholder='Title'
                    value={title}
                    onChange={e=>{setTitle(e.target.value)}}
                />
                <textarea
                    className='text-black w-1/2 rounded-md p-3 focus:outline-none focus:ring-teal-300 focus:ring-2'
                    placeholder='Write Somthing'
                    value={content}
                    // type="text"
                    onChange={e=>{setContent(e.target.value)}}
                />
                {loading ? <h1>Uploading Image..</h1> : 

    
                    <div className="dark:bg-gray-900 w-1/2 m-auto rounded-md">
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={selectImage} type="file" name="" id="" />
    
                    </div>
                }

                {
                    previewImage &&  <div>
                    <img
                      alt="not found"
                      width={"250px"}
                      src={previewImage}
                    />
                    <br />
                    {isUploaded ? <h1>Uploaded</h1> : loading ? <h1>Uploading...</h1> : 
                    <div className='flex justify-between items-center'>
                    <button className=' text-black bg-slate-300 p-1 w-1/2 rounded-md  mx-4' onClick={removeImage}>Remove</button>
                    <button className='bg-blue-400 text-black p-1 w-1/2 rounded-md  mx-4' onClick={uploadImage}>Upload</button>
                  </div>
                    }
                    
                  </div>
                }
     


                <button className='bg-teal-500 text-black p-1 w-1/2 rounded-md  mx-4' type="submit">Create</button>
            </form>


    </div>
   </>
  )
}

export default Create