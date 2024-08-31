type Props = {
  icon: string;
  setIcon: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
  setSelectedTab: (value: string) => void;
  handleSubmission: () => void;
};

const AddVisuals = ({
  icon,
  setIcon,
  image,
  setImage,
  setSelectedTab,
  handleSubmission,
}: Props) => {
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIcon(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setImage(value);
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
            value={icon}
            onChange={handleIconChange}
          />
        </label>
      </div>

      <div>
        <label className="block mt-4">
          <span className="text-gray-700">Image</span>
          <input
            type="file"
            accept="image/*"
            className="form-input mt-1 block w-full border-2 rounded-lg p-2"
            placeholder="Image"
            value={image}
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="mt-6">
        <button
          onClick={() => handleSubmission()}
          className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
        >
          Create Application
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
  );
};

export default AddVisuals;
