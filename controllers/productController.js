const fs = require("fs");

const productModel = require("../model/productModel");
const { default: slugify } = require("slugify");

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, message: "Name is Required" });
      case !description:
        return res
          .status(500)
          .send({ success: false, message: "Description is Required" });
      case !price:
        return res
          .status(500)
          .send({ success: false, message: "Price is Required" });
      case !category:
        return res
          .status(500)
          .send({ success: false, message: "Category is Required" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, message: "Quantity is Required" });
      case image && image.size > 15728640:
        return res.status(500).send({
          success: false,
          message: "Image is Required and should be less then 10mb",
        });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(
      `Error in create product controller -> Error message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Error in creating product",
    });
  }
};

//get all products
const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    if (product) {
      res.status(200).send({
        success: true,
        message: "List of Products",
        product,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "No products available",
      });
    }
  } catch (error) {
    console.log(
      `Error occurred in get product controller -> message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching products",
    });
  }
};

//get products by category
const getProductControllerByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const product = await productModel
      .find({ category })
      .populate("category")
      .select("-image")
      .sort({ createdAt: -1 });
    console.log(product);
    if (product) {
      res.status(200).send({
        success: true,
        message: "List of Products",
        product,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "No products available",
      });
    }
  } catch (error) {
    console.log(
      `Error occurred in get product controller -> message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching products",
    });
  }
};

//get single product
const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .populate("category")
      .select("-image");

    res.status(200).send({
      success: true,
      message: "Product",
      product,
    });
  } catch (error) {
    console.log(
      `Error occurred in get single product controller -> message: ${error}`
    );
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching product",
    });
  }
};

//product image controller
const getProductImageController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(
      `Error occured in getProductImageController -> Error Message : ${error}`
    );
    res.status(500).send({
      succes: false,
      message: "Error while fetching product image",
    });
  }
};

//delete product
const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findByIdAndDelete(id)
      .select("-image")
      .populate("category");
    if (product) {
      res.status(200).send({
        success: true,
        message: "Product deleted successfully.",
        product,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "No product found.",
      });
    }
  } catch (error) {
    console.log(`Error in deleteProductController -> Error message: ${error}`);
    res.status(500).send({
      success: false,
      message: "Error while deleting product(s)",
    });
  }
};

//update product controller

const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, message: "Name is Required" });
      case !description:
        return res
          .status(500)
          .send({ success: false, message: "Description is Required" });
      case !price:
        return res
          .status(500)
          .send({ success: false, message: "Price is Required" });
      case !category:
        return res
          .status(500)
          .send({ success: false, message: "Category is Required" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, message: "Quantity is Required" });
      case image && image.size > 15728640:
        return res.status(500).send({
          success: false,
          message: "Image is Required and should be less then 10mb",
        });
    }

    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(
      id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(
      `Error in update product controller -> Error Message: ${error}`
    );
    res.status(500).send({
      success: false,
      message: "Failed to update product",
    });
  }
};

//filter product controller
const productFilterController = async (req, res) => {
  try {
    const { checked } = req.body;
    console.log(checked);
    let arg = {};
    if (checked.length > 0) {
      arg.category = checked;
    }

    const products = await productModel.find(arg);
    res.status(200).send({
      success: true,
      message: "Products filtered successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      succes: false,
      message: "Error while filtering products",
      error: error,
    });
  }
};

//product per page
const productPerPageController = async (req, res) => {
  try {
    const totalCount = await productModel.find({}).estimatedDocumentCount();

    const perPage = 2;
    const page = req.params.page;
    const product = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      product,
      totalPages: Math.ceil(totalCount / perPage),
    });
  } catch (error) {
    console.log(
      `Error while fetching product per page:-> Error message: ${error}`
    );
    res.status(400).send({
      success: false,
      messgae: "Error while fetching product per page",
      error,
    });
  }
};

const getLatestProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-image")
      .sort({ createdAt: -1 })
      .limit(5);

    if (products) {
      res.status(200).send({
        success: true,
        message: "Successfully fetched latest products",
        products,
      });
    }
  } catch (error) {
    console.log(
      `Error in getLatestProduct Controller :-> Error Message: ${error}`
    );
    res.status(400).send({
      success: false,
      message: "Failed to get latest products.",
    });
  }
};

const getSimilarProductController = async () => {
  
}

module.exports = {
  createProductController: createProductController,
  getProductController: getProductController,
  getSingleProductController: getSingleProductController,
  getProductImageController: getProductImageController,
  deleteProductController: deleteProductController,
  updateProductController: updateProductController,
  getProductControllerByCategory: getProductControllerByCategory,
  productFilterController: productFilterController,
  productPerPageController: productPerPageController,
  getLatestProducts: getLatestProducts,
};
