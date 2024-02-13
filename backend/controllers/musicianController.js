const asyncHandler = require("express-async-handler");
const Musician = require("../models/musicianModel");
const cloudinary = require("cloudinary").v2;
const { fileSizeFormatter } = require("../utils/fileUpload");


const createMusician = asyncHandler(async (req, res) => {
  const { name, url, description } = req.body;

  if(!name || !url){
    res.status(400)
    throw new Error("Please fill all required fields");
  }

  let fileData = {}

  if(req.file){
    let uploadedFile;

    try{
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder:"visitantesonoro",
        resource_type:"image"
      })
    }catch{
      res.status(500)
      throw new Error('Image could not be uploaded');
    }

    fileData = {
        fileName:req.file.originalname,
        filePath:uploadedFile.secure_url,
        fileType:req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  const musician = await Musician.create({
    admin: req.admin.id,
    name,
    url,
    description,
    image: fileData
  })

  res.status(201).json(musician);

});

module.exports = {
  createMusician,
};
