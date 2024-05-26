import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { TextField } from "@mui/material";

const HomepageBanner = () => {
  const [image1, setImage1] = useState();
  const [tempImage1, setTempImage1] = useState();
  const [alt1, setAlt1] = useState();
  const [image2, setImage2] = useState();
  const [tempImage2, setTempImage2] = useState();
  const [alt2, setAlt2] = useState();
  const [image3, setImage3] = useState();
  const [tempImage3, setTempImage3] = useState();
  const [alt3, setAlt3] = useState();
  const [image4, setImage4] = useState();
  const [tempImage4, setTempImage4] = useState();
  const [alt4, setAlt4] = useState();

  const getBannerAlternateText = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/banner/get-alt-text`
      );
      if (data?.alt) {
        setAlt1(data.alt.alt1);
        setAlt2(data.alt.alt2);
        setAlt3(data.alt.alt3);
        setAlt4(data.alt.alt4);
      }
    } catch (error) {
      console.log(
        `Error while fetching alternate text:-> Error Message: ${error}`
      );
      toast.error("Something went wrong");
    }
  };

  const handleImageChange1 = async (e) => {
    const selectedImage = await e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (selectedImage) {
      if (selectedImage.size > maxSize) {
        toast.error("Maximum image size allowed is 10MB.");
        return; // Stop execution if image size exceeds the limit
      }

      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (width <= 5000 && height <= 5000) {
          setTempImage1(selectedImage);
          const imageUrl = URL.createObjectURL(selectedImage); // Create URL for selected image
          setImage1(imageUrl);
        } else {
          toast.error("Maximum image resolution allowed is 5000x5000.");
        }
      };
    }
  };
  const handleImageChange2 = async (e) => {
    const selectedImage = await e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (selectedImage) {
      if (selectedImage.size > maxSize) {
        toast.error("Maximum image size allowed is 10MB.");
        return; // Stop execution if image size exceeds the limit
      }

      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (width <= 5000 && height <= 5000) {
          setTempImage2(selectedImage);
          const imageUrl = URL.createObjectURL(selectedImage); // Create URL for selected image
          setImage2(imageUrl);
        } else {
          toast.error("Maximum image resolution allowed is 5000x5000.");
        }
      };
    }
  };
  const handleImageChange3 = async (e) => {
    const selectedImage = await e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (selectedImage) {
      if (selectedImage.size > maxSize) {
        toast.error("Maximum image size allowed is 10MB.");
        return; // Stop execution if image size exceeds the limit
      }

      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (width <= 5000 && height <= 5000) {
          setTempImage3(selectedImage);
          const imageUrl = URL.createObjectURL(selectedImage); // Create URL for selected image
          setImage3(imageUrl);
        } else {
          toast.error("Maximum image resolution allowed is 5000x5000.");
        }
      };
    }
  };
  const handleImageChange4 = async (e) => {
    const selectedImage = await e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (selectedImage) {
      if (selectedImage.size > maxSize) {
        toast.error("Maximum image size allowed is 10MB.");
        return; // Stop execution if image size exceeds the limit
      }

      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        if (width <= 5000 && height <= 5000) {
          setTempImage4(selectedImage);
          const imageUrl = URL.createObjectURL(selectedImage); // Create URL for selected image
          setImage4(imageUrl);
        } else {
          toast.error("Maximum image resolution allowed is 5000x5000.");
        }
      };
    }
  };

  const removeImage1 = (e) => {
    e.preventDefault();
    setImage1("");
    const inputElement = document.getElementById("image1");
    if (inputElement) {
      inputElement.value = "";
    }
  };
  const removeImage2 = (e) => {
    e.preventDefault();
    setImage2("");
    const inputElement = document.getElementById("image2");
    if (inputElement) {
      inputElement.value = "";
    }
  };
  const removeImage3 = (e) => {
    e.preventDefault();
    setImage3("");
    const inputElement = document.getElementById("image3");
    if (inputElement) {
      inputElement.value = "";
    }
  };
  const removeImage4 = (e) => {
    e.preventDefault();
    setImage4("");
    const inputElement = document.getElementById("image4");
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const handleBannerImage = async (e) => {
    e.preventDefault();
    try {
      
      const bannerData = new FormData();
      tempImage1 && bannerData.append("image1", tempImage1);
      tempImage2 && bannerData.append("image2", tempImage2);
      tempImage3 && bannerData.append("image3", tempImage3);
      tempImage4 && bannerData.append("image4", tempImage4);
      bannerData.append("alt1", alt1);
      bannerData.append("alt2", alt2);
      bannerData.append("alt3", alt3);
      bannerData.append("alt4", alt4);

      
     

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/banner/update-banner-image`,
        bannerData
      );
      

      if (data?.success) {
        toast.success("Images uploaded successfully");
      } else {
        toast.error("Something went wrong.");
        
      }
    } catch (error) {
      console.log(
        `Error while uploading banner image:-> Error message: ${error}`
      );
      toast.error("Something went wrong.");
    }
  };

  const getImage1 = async () => {
    try {
      const url = `${process.env.REACT_APP_API}/api/v1/banner/get-banner-image1`;
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      setImage1(URL.createObjectURL(blob));
    } catch (error) {
      console.log(
        `Error occured while fetching banner image1:-> Error message: ${error}`
      );
      toast.error("Something went wrong while fetching banner image1");
    }
  };

  const getImage2 = async () => {
    try {
      const url = `${process.env.REACT_APP_API}/api/v1/banner/get-banner-image2`;
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      setImage2(URL.createObjectURL(blob));
    } catch (error) {
      console.log(
        `Error occured while fetching banner image2:-> Error message: ${error}`
      );
      toast.error("Something went wrong while fetching banner image2");
    }
  };

  const getImage3 = async () => {
    try {
      const url = `${process.env.REACT_APP_API}/api/v1/banner/get-banner-image3`;
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      setImage3(URL.createObjectURL(blob));
    } catch (error) {
      console.log(
        `Error occured while fetching banner image3:-> Error message: ${error}`
      );
      toast.error("Something went wrong while fetching banner image3");
    }
  };

  const getImage4 = async () => {
    try {
      const url = `${process.env.REACT_APP_API}/api/v1/banner/get-banner-image4`;
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const blob = new Blob([response.data], { type: "image/jpeg" });
      setImage4(URL.createObjectURL(blob));
    } catch (error) {
      console.log(
        `Error occured while fetching banner image4:-> Error message: ${error}`
      );
      toast.error("Something went wrong while fetching banner image4");
    }
  };

  useEffect(() => {
    getBannerAlternateText();
    getImage1();
    getImage2();
    getImage3();
    getImage4();
  }, []);

  return (
    <Layout title={"Admin - Homepage Banner"}>
      <div className="container-fluid m-0.5 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> Set Homepage Banner </h1>
            <div className="m-1 w-75">
              <h5>Image 1:</h5>
              <label className="image-uploader">
                <div className="image-uploader-div">
                  {image1 ? (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={image1}
                        alt="product-image"
                        height={"200px"}
                        className="img img-responsive mt-3"
                      />
                      <p className="image-uploader-text">{image1.name}</p>
                      <Button
                        variant="contained"
                        className="mt-3 mb-3"
                        onClick={removeImage1}
                      >
                        Remove Image
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="image-uploader-text">Upload Image</p>
                    </>
                  )}
                  <input
                    id="image1"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange1}
                    hidden
                  ></input>
                </div>
              </label>
              <TextField
                id="outlined-basic"
                placeholder="Alternate text for image 1"
                variant="outlined"
                className="mt-3 w-100"
                value={alt1}
                onChange={(e) => setAlt1(e.target.value)}
              />
              <h5 className="mt-3">Image 2:</h5>
              <label className="image-uploader">
                <div className="image-uploader-div">
                  {image2 ? (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={image2}
                        alt="product-image"
                        height={"200px"}
                        className="img img-responsive mt-3"
                      />
                      <p className="image-uploader-text">{image2.name}</p>
                      <Button
                        variant="contained"
                        className="mt-3 mb-3"
                        onClick={removeImage2}
                      >
                        Remove Image
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="image-uploader-text">Upload Image</p>
                    </>
                  )}
                  <input
                    id="image2"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange2}
                    hidden
                  ></input>
                </div>
              </label>
              <TextField
                id="outlined-basic"
                placeholder="Alternate text for image 2"
                variant="outlined"
                className="mt-3 w-100"
                value={alt2}
                onChange={(e) => setAlt2(e.target.value)}
              />
              <h5 className="mt-3">Image 3:</h5>
              <label className="image-uploader">
                <div className="image-uploader-div">
                  {image3 ? (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={image3}
                        alt="product-image"
                        height={"200px"}
                        className="img img-responsive mt-3"
                      />
                      <p className="image-uploader-text">{image3.name}</p>
                      <Button
                        variant="contained"
                        className="mt-3 mb-3"
                        onClick={removeImage3}
                      >
                        Remove Image
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="image-uploader-text">Upload Image</p>
                    </>
                  )}
                  <input
                    id="image3"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange3}
                    hidden
                  ></input>
                </div>
              </label>
              <TextField
                id="outlined-basic"
                placeholder="Alternate text for image 3"
                variant="outlined"
                className="mt-3 w-100"
                value={alt3}
                onChange={(e) => setAlt3(e.target.value)}
              />
              <h5 className="mt-3">Image 4:</h5>
              <label className="image-uploader">
                <div className="image-uploader-div">
                  {image4 ? (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={image4}
                        alt="product-image"
                        height={"200px"}
                        className="img img-responsive mt-3"
                      />
                      <p className="image-uploader-text">{image4.name}</p>
                      <Button
                        variant="contained"
                        className="mt-3 mb-3"
                        onClick={removeImage4}
                      >
                        Remove Image
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="image-uploader-text">Upload Image</p>
                    </>
                  )}
                  <input
                    id="image4"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange4}
                    hidden
                  ></input>
                </div>
              </label>
              <TextField
                id="outlined-basic"
                placeholder="Alternate text for image 4"
                variant="outlined"
                className="mt-3 w-100"
                value={alt4}
                onChange={(e) => setAlt4(e.target.value)}
              />
              <div className="text-center">
                <Button
                  variant="contained"
                  className="mt-3"
                  size="large"
                  onClick={handleBannerImage}
                >
                  Upload Images
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomepageBanner;
