import React, { useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import MultiUtilForm from "../../Components/Form/MultiUtilForm";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateCategory = () => {
  const [name, setName] = useState([]);
  const [image,setImage] = useState("");
  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const categoryData = new FormData();

      categoryData.append('name',name);
      categoryData.append('image',image);

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        categoryData
      );
      if (res.data.success) {
        toast.success("Category created successfully");
      } else {
        toast.error("Error while creating category");
      }
    } catch (error) {
      console.log(`Error occured in create category: Error Message-> ${error}`);
      toast.error("Something went wrong while creating category");
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImage("");
    const inputElement = document.querySelector('input[type="file"]');
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handleImageChange = async (e) => {
    const selectedImage = await e.target.files[0];
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
          setImage(selectedImage);
        } else {
          toast.error("Maximum image resolution allowed is 500x500.");
        }
      };
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-0.5 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Category</h1>
            <div className="m-1 w-75">
            <label className="image-uploader mb-4">
                <div className="image-uploader-div">
                  {image ? (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={URL.createObjectURL(image)}
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

              <MultiUtilForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                placeholder={"Enter the name of new category"}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
