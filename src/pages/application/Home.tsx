// import { useState } from "react";
import HomeIllustration from "../../assets/illustrations/homeIllustration.png";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import functionIcon from "../../assets/icons/function.png";
import rwoIcon from "../../assets/icons/object.png"
import AllNucleus from "./components/AllNucleus";
// import activityIcon from "../../assets/icons/activity.png";

const Home = () => {

  return (
    <div className="px-4 mb-10">
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
            <Link className="text-blue-500 underline" to="#">
              Learn More
            </Link>
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center bg-[#F6F8FE] p-4 rounded-lg">
          <div className="flex items-center">
            <img
              className="w-10 h-10 mr-2 object-cover rounded-lg"
              src={rwoIcon}
              alt=""
            />

            <div>
              <h4 className="font-bold">Object Template</h4>
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

        <div className="mt-4 flex justify-between items-center bg-[#FEF6F6] p-4 rounded-lg">
          <div className="flex items-center">
            <img
              className="w-12 h-12 mr-2 object-cover rounded-lg"
              src={functionIcon}
              alt=""
            />

            <div>
              <h4 className="font-bold">Functions</h4>
              <p className="text-sm text-gray-600">
                RWO Function
              </p>
            </div>
          </div>

          <div>
            <Link to="/create/function">
              <div className="bg-white p-2 rounded-lg">
                <FaPlus className="text-2xl text-blue-500 cursor-pointer" />
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center bg-[#f7fef6] p-4 rounded-lg">
          <div className="flex items-center">
            <img
              className="w-12 h-12 mr-2 object-cover rounded-lg"
              src={functionIcon}
              alt=""
            />

            <div>
              <h4 className="font-bold">Activities</h4>
              <p className="text-sm text-gray-600">
              RWO Activities
              </p>

              {/* view all link */}
              <Link className="text-blue-500 underline font-bold text-sm" to="/activity/list">
                View All
              </Link>
            </div>
          </div>

          <div>
            <Link to="/create/activity">
              <div className="bg-white p-2 rounded-lg">
                <FaPlus className="text-2xl text-blue-500 cursor-pointer" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AllNucleus />
      </div>
    </div>
  );
};

export default Home;
