import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/admin-edit-category.module.css";
import { useNavigate } from "react-router-dom";
import MultiUtilForm from "../../Components/Form/MultiUtilForm";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [tempImage, setTempImage] = useState("");

  var count = 0;
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get-single-category-by-id/${id}`
        );
        if (res.data.success) {
          setCategory(res.data.category);
        }
      } catch (error) {
        console.log(`Error in edit category:-> Message: ${error}`);
        toast.error("Error while fetching category");
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/get-products-by-category/${id}`
        );
        if (res.data.success && res.data.product.length > 0) {
          setProducts(res.data.product);
        }
      } catch (error) {
        console.log(`Error occured in fetch products: Message: ${error}`);
        toast.error("Error while fetching products");
      }
    };

    fetchCategory();
    fetchProducts();
  }, [id]);

  const handleClick = (slug) => {
    navigate(`/dashboard/admin/update-product/${slug}`);
  };

  const handleSubmit = async () => {
    try {
      const categoryData = new FormData();

      categoryData.append("name", name);
      tempImage && categoryData.append("image", tempImage);

      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${id}`,
        categoryData
      );
      if (res.data.success) {
        toast.success("Category Updated Successfully");
      }
    } catch (error) {
      console.log(`Error while updating category:-> Error Message: ${error}`);
      toast.error("Something went wrong");
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
  const getImage = async () => {
    try {
      const url = `${process.env.REACT_APP_API}/api/v1/category/get-category-image/${id}`;
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      console.log(
        `Error occured while fetching category image:-> Error message: ${error}`
      );
      toast.error("Something went wrong while fetching category image");
    }
  };

  useEffect(() => {
    if (id) {
      getImage();
    }
    //eslint-disable-next-line
  }, [id]);

  return (
    <Layout title={"Edit Category - Dashboard"}>
      <div className="container-fluid m-0.5 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-3">
              <h1>Edit Category:{category.name}</h1>

              <div className="m-3 w-75">
                <label className="image-uploader mb-4">
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

                <MultiUtilForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                  placeholder={"Enter new name"}
                />
              </div>
            </div>
            <div className="mt-5">
              {products.length > 0 ? (
                <>
                  <table className="table">
                    <thead className="text-center">
                      <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {products.map((c) => (
                        <>
                          <tr>
                            <td key="count">{++count}</td>
                            <td key={c._id}>{c.name}</td>
                            <td>Rs. {c.price}</td>
                            <td>
                              <button
                                className="btn btn-warning pl-1 pr-1"
                                onClick={() => handleClick(c.slug)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <div className={styles.noProducts}>
                    <h1 className={styles.heading}>No Products Found</h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditCategory;
