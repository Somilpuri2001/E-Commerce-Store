import React from "react";
import {Link} from "react-router-dom";

function Footer(){
    return(
        <div className="footer">
            <h2 className="text-center">All Rights Reserved &copy;</h2>
            <p className="text-center mt-3">
            <Link to="/contact">Contact Us</Link>|
            <Link to="/about">About Us</Link>|
            <Link to="/privacy">Privacy Policy</Link>
            </p>
        </div>
    )
}

export default Footer;