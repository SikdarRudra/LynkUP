import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import dp from "../assets/dp.webp";
import { axiosInstance } from "../hooks/api";

function Search() {
  const navigate = useNavigate();
  const [input, setInput] = useState(null);

  const [searchData, setSearchData] = useState();

  const handleSearch = async () => {
    try {
      const result = await axiosInstance.get(`/user/search?keyWord=${input}`);
      setSearchData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input]);
  console.log(searchData);
  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-b from-[#0a0f2c] via-[#1a103d] to-[#120021] flex items-center flex-col gap-[20px] ">
      <div className="w-full h-[80px]  flex items-center gap-[20px] px-[20px] absolute top-0 ">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px]  h-[25px] "
          onClick={() => navigate(`/`)}
        />
      </div>
      <div className="w-full h-[80px] flex items-center justify-center mt-[80px]">
        <div className="w-[90%] max-w-[800px] h-[80%] rounded-full border-2 border-violet-600  flex items-center px-[20px]">
          <FiSearch className="w-[18px] h-[18px] text-white" />
          <input
            type="text"
            placeholder="search..."
            className="w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px]"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full items-center">
        {input &&
          searchData?.map((user) => (
            <div
              key={user._id}
              className="w-[90vw] max-w-[700px] h-[70px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md flex items-center gap-4 px-4 cursor-pointer hover:bg-white/20 hover:shadow-xl transition-all duration-300"
              onClick={() => navigate(`/profile/${user.userName}`)}
            >
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden border border-gray-300 shadow-sm">
                <img
                  src={user.profileImage || dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-white font-semibold text-[18px] capitalize tracking-wide">
                  {user.userName}
                </p>
                <p className="text-gray-300 text-[12px] font-medium">
                  {user.name}
                </p>
              </div>
            </div>
          ))}
      </div>

      {!input && (
        <div className="text-[30px] text-gray-700 font-bold">
          Search Here...
        </div>
      )}
    </div>
  );
}

export default Search;
