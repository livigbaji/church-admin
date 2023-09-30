import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/uploadCSVPage");
  }
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section className=" flex flex-col justify-center items-center md:w-[400px]">
        <div className="">
          <p className="text-black text-2xl md:text-[35px] font-bold">
            Tech Unit Attendance
          </p>
          <p className="text-text_light text-sm font-normal text-center ">
            Enter your details to continue
          </p>
        </div>

        <div className=" mt-10 w-full">
          <p className="text-text_light text-sm font-normal pb-2">
            Phone number
          </p>
          <input
            type="tell"
            className="w-full bg-white outline-none border-none h-10 pl-2"
            placeholder="Enter phone number"
          />
          <button
            className="bg-primary h-10 w-full text-white mt-6 rounded-md hover:scale-105 transition"
            onClick={handleClick}
          >
            GET CODE
          </button>
        </div>
      </section>
    </main>
  );
};

export default Login;
