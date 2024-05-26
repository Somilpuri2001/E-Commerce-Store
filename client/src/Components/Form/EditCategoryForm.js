import React from "react";

const EditCategoryForm = ( handleSubmit ) => {
  return (
    <div>
      <>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="name">Enter New Name: </label>
            <input
              type="text"
                className="form-control"
              placeholder="Enter New Name"
              id="name"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    </div>
  );
};

export default EditCategoryForm;
