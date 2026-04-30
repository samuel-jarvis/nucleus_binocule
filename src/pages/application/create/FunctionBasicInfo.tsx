import { useState } from "react";
import { toast } from "react-toastify";
import MultiFilterSearchInput from "../components/MultiFilterSearchInput";
import { ICreateFunctionOrActivity } from "./CreateFunctionsOrActivities";
import AiAPI from "../../../api/aiApi";

type FunctionBasicInfoProps = {
  formData: ICreateFunctionOrActivity;
  setFormData: (formData: ICreateFunctionOrActivity) => void;
  setSelectedTab: (value: string) => void;
};

const categoryList = [
  "Transportation",
  "Energy",
  "Manufacturing & Industry",
  "Construction & Real Estate",
  "Commerce & Trade",
  "Finance",
  "Healthcare",
  "Education",
  "Agriculture & Food",
  "Government & Public Services",
  "Social & Community",
  "Entertainment & Media",
  "Environment & Sustainability",
  "Research & Science",
];

const FunctionBasicInfo = ({
  formData,
  setFormData,
  setSelectedTab,
}: FunctionBasicInfoProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedObjectNames, setSelectedObjectNames] = useState<string[]>([]);

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

  const generateWithAi = async () => {
    if (!formData.title) {
      toast.error("Please enter a title first");
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await AiAPI.generateFunction(formData.title, selectedObjectNames);
      const aiData = response.message[0];
      
      setFormData({
        ...formData,
        description: aiData.description || "",
        category: aiData.category || "",
        attributes: aiData.attributes || [],
      });
      toast.success("Generated successfully!");
    } catch (error) {
      console.error("Error generating with AI:", error);
      toast.error("Failed to generate with AI");
    } finally {
      setIsGenerating(false);
    }
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
            onSelectedItemsChange={(items) => setSelectedObjectNames(items.map(item => item.title))}
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
            disabled={isGenerating}
          />
          <button
            onClick={generateWithAi}
            disabled={isGenerating || !formData.title}
            className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate with AI"
            )}
          </button>
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
