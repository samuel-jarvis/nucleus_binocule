import { useState } from "react";
import HomeIllustration from "../../assets/illustrations/home_illustration.png";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="px-4">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-600 text-center">
          A spatial web profile template for real world objects.
        </h2>

        <div className="mt-4">
          <img
            className="mx-auto object-cover"
            src={HomeIllustration}
            alt="home illustration"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-black mt-8">
          Spatial Templates
        </h3>

        <div className="flex justify-between mt-4">
          <p className="text-black text-lg">Create New</p>

          <p>
            <Link className="text-blue-500 underline" to="/create">
              Learn More
            </Link>
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center bg-[#f4f5f7] p-4 rounded-lg">
          <div className="flex items-center">
            <img
              className="w-10 h-10 mr-2 object-cover rounded-lg"
              src="https://img.icons8.com/?size=256&id=43591&format=png"
              alt=""
            />

            <div>
              <h4 className="font-bold">Template Name</h4>
              <p className="text-sm text-gray-600">Real World Object</p>
            </div>
          </div>

          <div>
            <Link to="/create/rwo">
              <div className="bg-white p-2 rounded-lg">
                <FaPlus className="text-2xl text-blue-500 cursor-pointer" />
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center bg-[#f3f3f2] p-4 rounded-lg">
          <div className="flex items-center">
            <img
              className="w-10 h-10 mr-2 object-cover rounded-lg"
              src="https://img.icons8.com/?size=256&id=43591&format=png"
              alt=""
            />

            <div>
              <h4 className="font-bold">Functions</h4>
              <p className="text-sm text-gray-600">
                RWO function and activities
              </p>
            </div>
          </div>

          <div>
            <Link to="/create/rwo">
              <div className="bg-white p-2 rounded-lg">
                <FaPlus className="text-2xl text-blue-500 cursor-pointer" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium text-black mt-8">Search Existing</h2>

        <div className="mt-4 flex items-center bg-[#f4f5f7] p-4 rounded-lg">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Search templates..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <div>
            <IoIosSearch className="text-2xl text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
