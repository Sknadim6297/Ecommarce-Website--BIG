const UploadImage = async (image) => {
  const cloudName = 'dbquca9on';
  const uploadPreset = 'Mern_Product';
  

  if (!cloudName || !uploadPreset) {
    throw new Error("Environment variables are not defined");
  }
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formdata = new FormData();

  formdata.append("file", image);
  formdata.append("upload_preset", uploadPreset);
  const dataResponse = await fetch(url, {
    method: "POST",
    body: formdata,
  });

  if(!dataResponse.ok){
    throw new Error('Failed to upload image')
  }

  const data = await dataResponse.json();
  return data;
};

export default UploadImage;
