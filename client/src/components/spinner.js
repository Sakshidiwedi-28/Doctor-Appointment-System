
import {} from "react-spinners/ClipLoader";
import React from 'react'

const spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

  )
};

export default spinner;