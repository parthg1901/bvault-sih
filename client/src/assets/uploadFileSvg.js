import React from "react";
import './uploadFile.css'
const uploadFileSvg = (props) => {
  return (
    <div className="uploadFile__label">
      <svg
        width="25"
        height="30"
        viewBox="0 0 25 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.05882 22.9412H17.6471V12.3529H24.7059L12.3529 0L0 12.3529H7.05882V22.9412ZM0 26.4706H24.7059V30H0V26.4706Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default uploadFileSvg;
