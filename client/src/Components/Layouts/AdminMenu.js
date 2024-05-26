import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>


          <NavLink
            to="/dashboard/admin/homepage-banner"
            className="list-group-item list-group-item-action"
          >
            Homepage Banner
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/view-category"
            className="list-group-item list-group-item-action"
          >
            View Categories
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/view-products"
            className="list-group-item list-group-item-action"
          >
            View Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/view-users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
