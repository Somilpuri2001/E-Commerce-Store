import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout(props) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
          <meta name="description" content={props.description} />
          <meta name="keywords" content={props.keywords} />
          <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
        {props.children}</main>
      <Footer />
    </div>
  );
}

Layout.defaultProps={
  title: 'Ecommerce App',
  description: 'Ecommerce Shopping App',
  keywords: 'React',
  Author: 'Somil Puri'
}


export default Layout;
