import { IRealWorldObject } from "../application/CreateRWO";
import HumanIcon from "./icons/human.png";
import ThingsIcon from "./icons/thing.png";
import SpacesIcon from "./icons/space.png";
import FilterSearchInput from "../application/components/FilterSearchInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// const PrimaryNatureList = ["Natural", "Artificial", "Hybrid"];
const TopLevelTypeList = [
  {
    name: "Human",
    description: "A human being.",
    icons: HumanIcon,
  },
  {
    name: "Things",
    description: "Other Living and Non-living things.",
    icons: ThingsIcon,
  },
  {
    name: "Spaces",
    description: "Boundary of defined space",
    icons: SpacesIcon,
  },
];

type BasicInfoProps = {
  realWorldObject: IRealWorldObject;
  setRealWorldObject: (realWorldObject: IRealWorldObject) => void;
  setSelectedTab: (value: string) => void;
};

const AddBasicInfo = ({
  realWorldObject,
  setRealWorldObject,
  setSelectedTab,
}: BasicInfoProps) => {
  const setParentTemplate = (value: string) => {
    setRealWorldObject({
      ...realWorldObject,
      parentTemplate: value,
    });
  };

  const handleNextClick = () => {
    if (!realWorldObject.primaryNature) {
      toast.info("Please select a top level object type");
      return;
    }

    if (!realWorldObject.category) {
      toast.info("Please select a category");
      return;
    }

    if (!realWorldObject.title) {
      toast.info("Please enter a title");
      return;
    }

    if (!realWorldObject.description) {
      toast.info("Please enter a description");
      return;
    }

    if (!realWorldObject.mobilityType) {
      toast.info("Please select a mobility type");
      return;
    }
    setSelectedTab("attributes");
  };

  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create a new RWO template
        </h2>

        <p className="text-gray-600 text-center">
          Make sure a template for this object doesn’t already exist.
        </p>
      </div>

      <div className="mb-4 mt-7 hidden">
        <h2 className="input_heading mb-2">Top level object type</h2>

        {TopLevelTypeList.map(({ name, description, icons: Icon }) => {
          const isSelected = realWorldObject.primaryNature === name;

          return (
            <div
              key={name}
              className=" items-center cursor-pointer hover:bg-gray-50 border-2 border-gray-200 p-2 rounded-2xl flex justify-between mb-2"
              onClick={() =>
                setRealWorldObject({
                  ...realWorldObject,
                  primaryNature: name,
                })
              }
            >
              <div className="flex items-center ml-3 ">
                <div className="mr-2">
                  <img src={Icon} alt={name} className="" />
                </div>

                <div>
                  <div className="font-semibold text-lg">{name}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </div>

              <div>
                {isSelected ? (
                  <div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full"> </div>
                  </div>
                ) : (
                  <div>
                    <div className="w-4 h-4 border-2 border-blue rounded-full">
                      {" "}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <h2 className="input_heading">Object Category</h2>

        <div className="mt-4">
          <select
            value={realWorldObject.category}
            onChange={(e) =>
              setRealWorldObject({
                ...realWorldObject,
                category: e.target.value,
              })
            }
            className="w-full p-2 rounded-lg border-2"
          >
            <option value="">Select category</option>
            {categoryList.map((_) => (
              <option key={_} value={_}>
                {_}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">
          Parent Template
          <span className="text-sm text-gray-400"> (Optional)</span>
        </h3>

        <FilterSearchInput setPrimaryObject={setParentTemplate} />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Main Object Title</h3>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter title"
            className="w-full p-2 rounded-lg border-2"
            value={realWorldObject.title}
            onChange={(e) =>
              setRealWorldObject({
                ...realWorldObject,
                title: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Object Description</h3>

        <div className="mt-4">
          <textarea
            placeholder="Enter description"
            className="w-full p-2 rounded-lg border-2"
            value={realWorldObject.description}
            onChange={(e) =>
              setRealWorldObject({
                ...realWorldObject,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* mobility type */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Mobility Type</h3>

        <div className="mt-4">
          <select
            value={realWorldObject.mobilityType}
            onChange={(e) =>
              setRealWorldObject({
                ...realWorldObject,
                mobilityType: e.target.value,
              })
            }
            className="w-full p-2 rounded-lg border-2"
          >
            <option value="">Select mobility type</option>
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="bg-primary text-white py-3 text-lg rounded-lg w-full"
          onClick={() => handleNextClick()}
        >
          Next
        </button>

        <div className="mt-2">
          <button
            onClick={() => handleBackHome()}
            className="bg-white text-black font-medium p-2 px-4 rounded-lg block w-full"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBasicInfo;

const categoryList = [
  "Buildings",
  "Facility",
  "Vehicles",
  "Gadgets",
  "Trees",
  "Rivers",
  "Mountains",
  "Bridges",
  "Roads",
  "Boats",
  "Plants (External)",
  "Animals (External)",
  "Human Activities",
  "Statues",
  "LandMarks",
  "Monuments",
  "Others",
];
