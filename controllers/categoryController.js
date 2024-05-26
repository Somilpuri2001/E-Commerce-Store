const slugify = require("slugify");
const categoryModel = require("../model/categoryModel");
const fs = require("fs");

//create category controller
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { image } = req.files;

    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = new categoryModel({ name, slug: slugify(name) });

    if(image){
      category.image.data = fs.readFileSync(image.path);
      category.image.contentType = image.type;
    }

    await category.save();

    res.status(200).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(
      `Error occurred in createCategoryController --> Error message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

//update category controller
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { image } = req.files;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
   
    if (!category) {
      res.status(200).send({
        success: true,
        message: `No category found name: ${name}`,
      });
    } else {
      if (image) {
        category.image.data = fs.readFileSync(image.path);
        category.image.contentType = image.type;
      }

      await category.save();

      res.status(200).send({
        success: true,
        category,
        message: "Category updated successfully",
      });
    }
  } catch (error) {
    console.log(
      `Error occured in updateCategoryController -> Error Message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while updating category",
    });
  }
};

//get category controller
const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({}).select("-image");

    res.status(200).send({
      success: true,
      message: "List of categories",
      category,
    });
  } catch (error) {
    console.log(
      `Error occurred in get category controller -> message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching categories",
    });
  }
};

//get single category controller
const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoryModel.findOne({ slug });

    if (!category) {
      res.status(200).send({
        success: true,
        message: "No category found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Category",
        category,
      });
    }
  } catch (error) {
    console.log(
      `Error occurred in get single category controller -> message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching categories",
    });
  }
};

//get single category controller by id
const getSingleCategoryControllerById = async (req, res) => {
  try {
    const { _id } = req.params;

    const category = await categoryModel.findById({ _id });

    if (!category) {
      res.status(200).send({
        success: true,
        message: "No category found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Category",
        category,
      });
    }
  } catch (error) {
    console.log(
      `Error occurred in get single category by id controller -> message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching categories",
    });
  }
};

//delete category controller
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      res.status(200).send({
        success: true,
        message: "No category found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Category deleted successfully",
        category,
      });
    }
  } catch (error) {
    console.log(
      `Error occurred in delete category controller -> message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching categories",
    });
  }
};

const getCategoryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id).select("image");

    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }

    if (category.image && category.image.data) {
      res.set('Content-Type', category.image.contentType);
      return res.status(200).send(category.image.data);
    } else {
      return res.status(200).send({
        success: true,
        message: 'Category does not have an image',
      });
    }
  } catch (error) {
    console.error(`Error in getCategoryImage controller: ${error}`);
    res.status(400).send({
      success: false,
      message: 'Error occured while fetching category image',
      error,
    });
  }
};


module.exports = {
  createCategoryController: createCategoryController,
  updateCategoryController: updateCategoryController,
  getCategoryController: getCategoryController,
  getSingleCategoryController: getSingleCategoryController,
  getSingleCategoryControllerById:getSingleCategoryControllerById,
  deleteCategoryController: deleteCategoryController,
  getCategoryImage:getCategoryImage
};
