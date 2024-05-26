import React from "react";

const MultiUtilForm = ({ handleSubmit, value, setValue ,placeholder, isDisabled=false }) => {
  return (
    <div>
      <>
        
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isDisabled} onClick={handleSubmit} >
            Submit
          </button>
        
      </>
    </div>
  );
};

export default MultiUtilForm;
