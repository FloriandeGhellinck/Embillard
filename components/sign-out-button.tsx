import { deleteCookie } from "cookies-next";

const Signout = () => {
  const moovecookie = () => {
    deleteCookie("dataUser");
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-10 py-5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-embie-blue-light-600 hover:bg-embie-orange-300 "
        onClick={moovecookie}
      >
        Logout
      </button>
    </>
  );
};

export default Signout;
