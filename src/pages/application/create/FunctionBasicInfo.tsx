// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import MultiFilterSearchInput from "../components/MultiFilterSearchInput";
import { ICreateFunctionOrActivity } from "./CreateFunctionsOrActivities";

type FunctionBasicInfoProps = {
  formData: ICreateFunctionOrActivity;
  setFormData: (formData: ICreateFunctionOrActivity) => void;
  setSelectedTab: (value: string) => void;
};

const categoryList = [
  "Dining & Food",
  "Shopping",
  "Entertainment & Leisure",
  "Sports & Fitness",
  "Education & Learning",
  "Healthcare & Wellness",
  "Work & Professional",
  "Social & Community",
  "Religious & Spiritual",
  "Travel & Mobility",
  "Lodging & Accommodation",
  "Events & Experiences",
  "Personal Services",
  "Daily Living & Errands",
  "Others",
];

const FunctionBasicInfo = ({
  formData,
  setFormData,
  setSelectedTab,
}: FunctionBasicInfoProps) => {
  const handleNextClick = () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      formData.nucleusIds.length === 0
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    console.log(formData);

    setSelectedTab("attributes");
  };

  const setPrimaryObjects = (primaryObjects: string[]) => {
    setFormData({ ...formData, nucleusIds: primaryObjects });
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-semibold text-black">
        Create a new Object function template{" "}
      </h1>

      <div>
        <h3 className="text-lg text-black">
          Make sure a template for this object doesn’t already exist.
        </h3>

        <div className="mt-6">
          <h3 className="font-medium">Find Objects</h3>
          <MultiFilterSearchInput
            selectedIds={formData.nucleusIds}
            setSelectedIds={setPrimaryObjects}
          />
        </div>

        <div className="mt-6">
          <h3>Title</h3>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter title"
          />
        </div>

        <div className="mt-6">
          <h3>Category</h3>

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter description"
          />
        </div>

        <div className="mt-6">
          <button
            className="bg-primary text-white p-2 rounded-lg w-full"
            onClick={() => handleNextClick()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunctionBasicInfo;
