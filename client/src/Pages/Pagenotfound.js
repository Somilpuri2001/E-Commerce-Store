import Layout from "../Components/Layouts/Layout.js";
import { Link } from "react-router-dom";

function Pagenotfound() {
  return (
    <Layout title={"404 Page Not Found - Ecommerce app"}>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <link to="/" />
          Go To Homepage
        </div>
      </div>
    </Layout>
  );
}

export default Pagenotfound;
