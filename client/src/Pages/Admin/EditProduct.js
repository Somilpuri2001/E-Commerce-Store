import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/create-product.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";

import "antd/dist/reset.css";
import MultiUtilForm from "../../Components/Form/MultiUtilForm";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [shipping, setShipping] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [checker, setChecker] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      console.log(data);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setCategory(data.product.category._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
    } catch (error) {
      console.log(
        `Error occured while fetching product data:-> Error message: ${error}`
      );
      toast.error("Something went wrong");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (res.data?.success) {
        setCategories(res.data?.category);
      }
    } catch (error) {
      console.log(`Error while creating category -> Error Message : ${error}`);
      toast.error("Someting went wrong on fetching category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const removeImage = (e) => {
    e.preventDefault();
    setImage("");
    const inputElement = document.querySelector('input[type="file"]');
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (selectedImage) {
      if (selectedImage.size > maxSize) {
        toast.error("Maximum image size allowed is 5MB.");
        return; // Stop execution if image size exceeds the limit
      }

      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (width <= 500 && height <= 500) {
          setTempImage(selectedImage);
          const imageUrl = URL.createObjectURL(selectedImage); // Create URL for selected image
          setImage(imageUrl); // Set the URL to the image state
        } else {
          toast.error("Maximum image resolution allowed is 500x500.");
        }
      };
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      tempImage && productData.append("image", tempImage);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/view-products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(`Error while creating product. :-> Error Message: ${error}`);
      toast.error("Something went wrong");
    }
  };

  const getImage = async () => {
    try {
      const url = `${process.env.REACT_APP_API}/api/v1/product/product-image/${id}`;
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      console.log(
        `Error occured while fetching product image:-> Error message: ${error}`
      );
      toast.error("Something went wrong while fetching product image");
    }
  };

  useEffect(() => {
    if (id) {
      getImage();
    }
    //eslint-disable-next-line
  }, [id]);

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (checker === "Delete") {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
        );
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/view-products");
      } catch (error) {
        console.log(`Error while deleting product:-> Error message: ${error}`);
        toast.error("Something went wrong");
      }
    } else {
      setErrorMessage("Oops! The entered word did not match");
    }
  };
  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-0.5 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <label className="image-uploader">
                <div className="image-uploader-div">
                  {image ? (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={image}
                        alt="product-image"
                        height={"200px"}
                        className="img img-responsive mt-3"
                      />
                      <p className="image-uploader-text">{image.name}</p>
                      <Button
                        variant="contained"
                        className="mt-3 mb-3"
                        onClick={(e) => removeImage(e)}
                        startIcon={<DeleteIcon />}
                      >
                        Remove Image
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="image-uploader-text">Upload Image</p>
                      <p className="image-uploader-subtext">
                        Maximum upload 500 x 500 and 5MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  ></input>
                </div>
              </label>

              <TextField
                id="outlined-basic"
                label="Product Name"
                variant="outlined"
                className="mt-3 w-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Enter Description"
                className="mt-3 w-100"
                multiline
                rows={2}
                maxRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputLabel id="category-selector">Category</InputLabel>
              <Select
                className="w-100"
                labelId="category-selector"
                id="category-selector"
                value={category}
                // label="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories?.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              <div className="quantity-price-div">
                <TextField
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  className="mt-3 width-48"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  inputProps={{ inputMode: "numeric" }}
                />

                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  className="mt-3 width-48"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  inputProps={{ inputMode: "numeric" }}
                />
              </div>
              <InputLabel id="shipping-selector">Shipping</InputLabel>
              <Select
                className="w-100 w-100"
                labelId="shipping-selector"
                id="shipping-selector"
                value={shipping}
                onChange={(e) => {
                  setShipping(e.target.value);
                }}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
              <div className="text-center">
                <Button
                  variant="contained"
                  className="m-3"
                  size="large"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </Button>
                <Button
                  variant="contained"
                  className="m-3"
                  size="large"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Delete Product
                </Button>
              </div>
            </div>
          </div>
          <Modal
            onCancel={() => {
              setOpen(false);
            }}
            open={open}
            footer={false}
          >
            <p>
              {errorMessage && (
                <span style={{ color: "red" }}>{errorMessage}</span>
              )}
            </p>
            <p>
              <i>To delete this product type {`"Delete"`} below: </i>
            </p>
            <MultiUtilForm
              placeholder={""}
              value={checker}
              setValue={setChecker}
              handleChange={(e) => {
                setChecker(e.target.value);
                setErrorMessage("");
              }}
              handleSubmit={handleModalSubmit}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
