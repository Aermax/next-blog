import multer from 'multer';
import cloudinary from 'cloudinary';



const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: "dxpkn1nc0",
  api_key: "173471794942925",
  api_secret: "1k187jbO-iDujErLekPlvB8jHcg"
});

export async function POST(
  req,
  res
) {
  try {
    // Use Multer to handle the file upload
    const multerUpload = upload.single('image');
    multerUpload(req, res, async function (error) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to upload image' });
      }

      // Upload the file to Cloudinary
      const result = await cloudinary.v2.uploader.upload(
        req.file[0],
        {
          folder: 'uploads', // Optional folder name in Cloudinary
        }
      );

      // Return the Cloudinary URL of the uploaded image
      // res.status(200).json({ url: result.secure_url });
      res.send(result.secure_url)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Important: Disable body parsing as Multer handles it
  },
};

