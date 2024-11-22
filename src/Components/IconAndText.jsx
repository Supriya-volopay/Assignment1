import React from "react";

const IconAndText = ({ data }) => {
  return (
    <>
      <div className="flex justify-start items-center my-3 text-sm text-neutral-600">
        <i className={data.icon}></i>
        <p className="mx-1">{data.text ?? "No Site avialable"}</p>
      </div>
    </>
  );
};

export default IconAndText;
