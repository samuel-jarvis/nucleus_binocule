import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICreateFunctionOrActivity } from "../create/CreateFunctionsOrActivities";
import ObjectFunctionApi from "../../../api/objectFunctionApi";
import { toast } from "react-toastify";

type Props = {
  formData: ICreateFunctionOrActivity;
  setSelectedTab: (value: string) => void;
};

const FunctionIcon = ({ formData, setSelectedTab }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    const payload = new FormData();

    payload.append("title", formData.title);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("type", formData.description);
    payload.append("nucleusId", formData.nucleusId);
    payload.append("attributes", JSON.stringify(formData.attributes));

    if (file) {
      payload.append("file", file);
    }

    setIsLoading(true);

    ObjectFunctionApi.createObjectFunction(payload)
      .then((res) => {
        const data = res.data;
        console.log(data);
        toast.success("Function created for Object Template");

        if (data.nucleus) {
          navigate(`/object/${data.nucleus}`);
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(err.response.data.message || "Something went wrong");
      });
  };

  return (
    <div className="px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="text-blue mr-1">+ Add</span>
          Function Icon
        </h2>
        <p className="mt-4 text-lg">
          What icons or visual will represent this function template.{" "}
        </p>
      </div>

      <div className="mb-10">
        <label className="block mt-4">
          <span className="text-gray-900 text-lg font-semibold">
            Upload simple icon
          </span>
          <input
            type="file"
            accept="image/*"
            className="form-input mt-1 block w-full border-2 rounded-lg p-2"
            placeholder="Icon"
            // value={icon}
            onChange={handleFileChange}
          />
        </label>

        {/* image preview */}
        {file && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-auto h-48 rounded-lg"
            />
          </div>
        )}
      </div>

      <div>
        <p>Note:</p>
        <p>
          NOTE Templates published are subjected to modification, rejection,
          deletion or approval after undergoing review.
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => handleSubmit()}
          className="bg-black text-white py-3 px-4 rounded-lg block w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Function"}
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("associations")}
          className="bg-white text-black font-semibold p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default FunctionIcon;
