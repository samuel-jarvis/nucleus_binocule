import { useState } from "react";
import Associations from "../../components/Associations";
import { useNavigate } from "react-router-dom";
import { NucleusApi } from "../../../api/nucleusApi";
import { toast } from "react-toastify";
import { IRealWorldObject } from "../CreateRWO";

type Props = {
  realWorldObject: IRealWorldObject & { associations: Associations };
  setRealWorldObject: (
    realWorldObject: IRealWorldObject & { associations: Associations }
  ) => void;
  setSelectedTab: (value: string) => void;
};

const AddVisuals = ({ realWorldObject, setSelectedTab }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!file) {
      setIsLoading(false);
      toast.error("Please upload an icon to continue");
      return;
    }

    setIsLoading(true);
    const data = new FormData();

    data.append("primaryNature", realWorldObject.primaryNature);
    data.append("topLevelObject", realWorldObject.topLevelObject);
    data.append("category", realWorldObject.category);
    data.append("parentTemplate", realWorldObject.parentTemplate);
    data.append("title", realWorldObject.title);
    data.append("description", realWorldObject.description);
    data.append("mobilityType", realWorldObject.mobilityType);
    data.append("attributes", JSON.stringify(realWorldObject.attributes));
    data.append("parts", JSON.stringify(realWorldObject.parts));
    data.append("associations", JSON.stringify(realWorldObject.associations));
    data.append("file", file as Blob);

    NucleusApi.createNucleus(data)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message || "an error occurred");
      });
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);

    // image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="text-blue mr-1">+ Add</span>
          Visual Representation
        </h2>
        <p className="mt-4 text-lg">
          What icons or visual will represent this object template.{" "}
        </p>
      </div>

      <div>
        <label className="block mt-4">
          <span className="text-gray-900 text-lg font-medium">
            Upload simple icon
          </span>
          <input
            type="file"
            accept="image/*"
            className="form-input mt-1 block w-full border-2 rounded-lg p-2"
            placeholder="Icon"
            // value={icon}
            onChange={handleIconChange}
          />
        </label>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="icon"
              className="w-32 h-32 object-cover rounded-xl"
            />
          </div>
        )}
      </div>

      <div className="mt-10">
        <span className="text-blue text-sm mr-1">NOTE:</span>
        Templates published are subjected to modification, rejection, deletion
        or approval after undergoing review.
      </div>

      <div className="mt-6">
        <button
          onClick={() => handleSubmit()}
          className="bg-black text-white py-3 px-4 rounded-lg block w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Template"}
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

export default AddVisuals;
