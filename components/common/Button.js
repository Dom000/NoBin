import React from "react";
import Load from "./Loader";

function Button({ text, icon, className, disabled, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className}  text-sm  text-center justify-center items-center flex font-semibold rounded-md px-6 py-2`}
    >
      {loading ? (
        <Load />
      ) : (
        <>
          <p>{text}</p> <span>{icon}</span>
        </>
      )}
    </button>
  );
}

export default Button;
