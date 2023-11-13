import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'do6dt1ot2',
  api_key: '959856998471536',
  api_secret: 'e0JwQpDr3fvZcmEfcqqm4zLhoD0'
});

// <!-- upload image -->
export const cloudUpload = async (filePath, foldername) => {
  const data = await cloudinary.uploader.upload(filePath, { folder: foldername });

  return data;
};

// <!-- delete image -->
export const cloudDelete = async (publicId) => {
  await cloudinary.uploader.destroy(publicId, { invalidate: true });
};
