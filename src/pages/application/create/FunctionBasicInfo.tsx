import { FaCircle, FaRegCircle } from "react-icons/fa6";
import { toast } from "react-toastify";
import FilterSearchInput from "../components/FilterSearchInput";

type FunctionBasicInfoProps = {
  type: "function" | "activity";
  setType: (value: "function" | "activity") => void;
  title: string;
  setTitle: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  primaryObject: string;
  setPrimaryObject: (value: string) => void;
  setSelectedTab: (value: string) => void;
};

const typeList = ["function", "activity"];

const categoryList = [
  "Entertainment",
  "Education",
  "social",
  "Government",
  "transportation",
  "commerce",
  "health",
  "real estate",
  "environment",
];

const FunctionBasicInfo = ({
  type,
  setType,
  title,
  setTitle,
  category,
  setCategory,
  description,
  setDescription,
  primaryObject,
  setPrimaryObject,
  setSelectedTab,
}: FunctionBasicInfoProps) => {
  const handleNextClick = () => {
    if (!title || !category || !description || !primaryObject) {
      toast.error("Please fill all the fields");
      return;
    }

    setSelectedTab("fields");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">
        Create {type.toLocaleUpperCase()} for Real World Objects
      </h1>

      <div>
        <h3 className="text-lg text-black">
          Real World Object Functionalities and Activities
        </h3>

        <div className="mt-6">
          <h3>Type</h3>

          <div className="grid grid-cols-2 gap-2">
            {typeList.map((_) => (
              <div
                key={_}
                className={`
                  p-2 px-3 rounded-lg cursor-pointer border-2
                ${_ === type ? "bg-black text-white" : ""}
                `}
                onClick={() => setType(_ as "function" | "activity")}
              >
                <div className="flex justify-between items-center">
                  {_.toLocaleUpperCase()}
                  {_ === type ? (
                    <FaCircle className="inline-block ml-2" />
                  ) : (
                    <FaRegCircle className="inline-block ml-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium"> Find Primary Object</h3>
          <FilterSearchInput setPrimaryObject={setPrimaryObject} />
        </div>

        <div className="mt-6">
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter title"
          />
        </div>

        <div className="mt-6">
          <h3>Category</h3>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg border-2"
          >
            <option value="">Select Category</option>
            {categoryList.map((_) => (
              <option key={_} value={_}>
                {_}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <h3>Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter description"
          />
        </div>

        <div className="mt-6">
          <button
            className="bg-primary text-white p-2 rounded-lg w-full"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunctionBasicInfo;
