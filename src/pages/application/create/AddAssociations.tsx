

type Props = {
  setSelectedTab: (value: string) => void;
};

const AddAssociations = ({ setSelectedTab } : Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        + Add Associations
      </h2>


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
          onClick={() => setSelectedTab("basic_info")}
          className="bg-white text-primary p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default AddAssociations