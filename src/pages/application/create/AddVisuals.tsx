import { toast } from "react-toastify";
import FileUploadApiApi from "../../../api/fileUploadApi";
import { useState } from "react";

type Props = {
  icon: string;
  setIcon: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
  setSelectedTab: (value: string) => void;
  handleSubmission: () => void;
  isLoading: boolean;
};

const AddVisuals = ({
  icon,
  setIcon,
  image,
  setImage,
  setSelectedTab,
  handleSubmission,
  isLoading,
}: Props) => {
  const [uploadingFile, setUploadingFile] = useState(false)

  const handleContinueClick = () => {
    if (uploadingFile) {
      toast.info('Uploading icon')
      return
    }

    console.log(icon, image)

    if (!icon) {
      toast.error("Please upload an icon");
      return;
    }

    handleSubmission()
  }
  
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setUploadingFile(true)
    FileUploadApiApi.upload(file)
      .then((res) => {
        setIcon(res.data.url);
        toast.success("Icon uploaded successfully");
        setUploadingFile(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to upload icon");
        setUploadingFile(false)
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // setIcon(value);

    if (!file) return;
    setUploadingFile(true)
    FileUploadApiApi.upload(file)
      .then((res) => {
        setImage(res.data.url);
        toast.success("Icon uploaded successfully");
        setUploadingFile(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to upload icon");
        setUploadingFile(false)
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        + Add Visuals
      </h2>

      <div>
        <label className="block mt-4">
          <span className="text-gray-700">Icon</span>
          <input
            type="file"
            accept="image/*"
            className="form-input mt-1 block w-full border-2 rounded-lg p-2"
            placeholder="Icon"
            // value={icon}
            onChange={handleIconChange}
          />
        </label>
      </div>

      <div>
        <label className="block mt-4">
          <span className="text-gray-700">3d Image</span>
          <input
            type="file"
            accept="image/*"
            className="form-input mt-1 block w-full border-2 rounded-lg p-2"
            placeholder="Image"
            // value={image}
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="mt-6">
        <button
          onClick={() => handleContinueClick()}
          className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
          disabled={isLoading}
        >
          {/* Create Application */}
          {isLoading ? "Creating..." : "Create Application"}
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("fields")}
          className="bg-white text-black font-semibold p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddVisuals;
