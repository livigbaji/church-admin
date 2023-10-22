import { ReactComponent as AddUserIcon } from "@/assets/svgs/dashboard/add-user.svg";

const AddUserButton = () => {
  return (
    <button className="bg-[#132034] sm:w-[130px] w-[173px] h-[43px] text-sm font-normal text-white pl-[10px] rounded-[5px] flex items-center">
      <AddUserIcon />
      <span className="pl-[15px]">Add User</span>
    </button>
  );
};

export default AddUserButton;
