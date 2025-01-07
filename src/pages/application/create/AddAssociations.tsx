type Props = {
  setSelectedTab: (value: string) => void;
};

const AddAssociations = ({ setSelectedTab }: Props) => {
  // Owner/user/incharge inputs
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        + Add Associations
      </h2>

      <div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Owner
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter owner"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            User
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter user"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            In Charge
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter user in charge"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("visuals")}
          className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
        >
          Continue
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("fields")}
          className="bg-white text-primary p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddAssociations;
