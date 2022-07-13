import React, { useState } from "react";
import Modalsignin from "./modal-login";

const Signin = () => {
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Modalsignin isOpen={showModal} setIsOpen={setShowModal} />
      <button
        type="button"
        className="inline-flex items-center px-10 py-5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-embie-blue-light-600 hover:bg-embie-orange-300 "
        onClick={handleToggleModal}
      >
        Login
      </button>
    </>
  );
};

export default Signin;
