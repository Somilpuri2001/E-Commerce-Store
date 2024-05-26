const fs = require("fs");

const bannerModel = require("../model/bannerModel");

const bannerImageUploadController = async (req, res) => {
  try {
    const {alt1, alt2, alt3, alt4} = req.fields;
    const { image1, image2, image3, image4 } = req.files;

    const banner = new bannerModel({alt1,alt2,alt3,alt4});

    banner.image1.data = fs.readFileSync(image1.path);
    banner.image1.contentType = image1.type;

    banner.image2.data = fs.readFileSync(image2.path);
    banner.image2.contentType = image2.type;

    banner.image3.data = fs.readFileSync(image3.path);
    banner.image3.contentType = image3.type;

    banner.image4.data = fs.readFileSync(image4.path);
    banner.image4.contentType = image4.type;

    await banner.save();

    res.status(201).send({
      success: true,
      message: "Images Uploaded successfully",
      banner,
    });
  } catch (error) {
    console.log(
      `Error in upload banner image controller -> Error message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Error in uploading image",
    });
  }
};

const getBannerImage1Controller = async (req, res) => {
  try {
    // Fetching banner from the database
    const banner = await bannerModel.find({}).select("image1");

    console.log(banner[0].image1);
    
    res.set("Content-type",banner[0].image1.contentType)
    return res.status(200).send(banner[0].image1.data)
    
  } catch (error) {
    console.log(
      `Error occurred in getBannerImage1Controller -> Error Message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Error while fetching banner image1",
    });
  }
};

const getBannerImage2Controller = async (req, res) => {
  try {
    // Fetching banner from the database
    const banner = await bannerModel.find({}).select("image2");

    console.log(banner[0].image2);
    
    res.set("Content-type",banner[0].image2.contentType)
    return res.status(200).send(banner[0].image2.data)
    
  } catch (error) {
    console.log(
      `Error occurred in getBannerImage2Controller -> Error Message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Error while fetching banner image2",
    });
  }
};

const getBannerImage3Controller = async (req, res) => {
  try {
    // Fetching banner from the database
    const banner = await bannerModel.find({}).select("image3");

    console.log(banner[0].image3);
    
    res.set("Content-type",banner[0].image3.contentType)
    return res.status(200).send(banner[0].image3.data)
    
  } catch (error) {
    console.log(
      `Error occurred in getBannerImage3Controller -> Error Message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Error while fetching banner image3",
    });
  }
};

const getBannerImage4Controller = async (req, res) => {
  try {
    // Fetching banner from the database
    const banner = await bannerModel.find({}).select("image4");

    console.log(banner[0].image4);
    
    res.set("Content-type",banner[0].image4.contentType)
    return res.status(200).send(banner[0].image4.data)
    
  } catch (error) {
    console.log(
      `Error occurred in getBannerImage4Controller -> Error Message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Error while fetching banner image4",
    });
  }
};

const getBannerAlternateText = async(req,res) => {
  try {

    const alt = {};

    const banner = await bannerModel.find({}).select("-image1,-image2,-image3,-image4")
    
    alt.alt1=banner[0].alt1
    alt.alt2=banner[0].alt2
    alt.alt3=banner[0].alt3
    alt.alt4=banner[0].alt4

    res.status(200).send({
      success:true,
      message:'Alternate texts found',
      alt
    })

  } catch (error) {
    console.log(`Error in getBannerAlternateText controller:-> Error message: ${error}`)
    res.status(400).send({
      success:false,
      message:"Error occured"
    })
  }
}


const bannerImageUpdateController = async (req, res) => {
  try {
    const { alt1, alt2, alt3, alt4 } = req.fields;
    const { image1, image2, image3, image4 } = req.files;

    // Update the alternate text in all documents
    await bannerModel.updateMany({}, { alt1, alt2, alt3, alt4 });

    // Update image 1
    if (image1) {
      const imageData1 = {
        data: fs.readFileSync(image1.path),
        contentType: image1.type
      };
      await bannerModel.updateMany({}, { image1: imageData1 });
    }

    // Update image 2
    if (image2) {
      const imageData2 = {
        data: fs.readFileSync(image2.path),
        contentType: image2.type
      };
      await bannerModel.updateMany({}, { image2: imageData2 });
    }

    // Update image 3
    if (image3) {
      const imageData3 = {
        data: fs.readFileSync(image3.path),
        contentType: image3.type
      };
      await bannerModel.updateMany({}, { image3: imageData3 });
    }

    // Update image 4
    if (image4) {
      const imageData4 = {
        data: fs.readFileSync(image4.path),
        contentType: image4.type
      };
      await bannerModel.updateMany({}, { image4: imageData4 });
    }

    res.status(201).send({
      success: true,
      message: "Images updated successfully"
    });
  } catch (error) {
    console.log(
      `Error in update banner image controller -> Error message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Error in updating images"
    });
  }
};


module.exports = {
    bannerImageUploadController:bannerImageUploadController,
    getBannerImage1Controller:getBannerImage1Controller,
    getBannerImage2Controller:getBannerImage2Controller,
    getBannerImage3Controller:getBannerImage3Controller,
    getBannerImage4Controller:getBannerImage4Controller,
    getBannerAlternateText:getBannerAlternateText,
    bannerImageUpdateController:bannerImageUpdateController

}