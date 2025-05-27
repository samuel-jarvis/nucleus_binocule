import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ActivityBasicInfo from "../components/ActivityBasicInfo";
import ActivityApi from "../../../api/activityApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface CreateActivity {
  title: string;
  category: string;
  description: string;
  access: "public" | "private";
}

const CreateActivity = () => {
  const [selectedTab, setSelectedTab] = useState("basic_info");

  const [formData, setFormData] = useState<CreateActivity>({
    title: "",
    category: "",
    description: "",
    access: "public",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = new FormData();

    payload.append("title", formData.title);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("access", formData.access);
    payload.append("file", file!);

    ActivityApi.createActivity(payload)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        toast.info("Activity created successfully");
        navigate("/activity/list");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data.message || "Something went wrong");
      });
  };

  return (
    <div className="px-4">
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="basic_info">
          <ActivityBasicInfo
            formData={formData}
            setFormData={setFormData}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="visuals">
          <div>
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

            <div className="mt-6">
              <button
                onClick={() => handleSubmit()}
                className="bg-black text-white py-3 px-4 rounded-lg block w-full"
                // disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Activity"}
              </button>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setSelectedTab("basic_info")}
                className="bg-white text-black font-semibold p-2 px-4 rounded-lg block w-full"
              >
                Back
              </button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default CreateActivity;
