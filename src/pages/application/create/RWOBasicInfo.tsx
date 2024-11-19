import FilterSearchInput from "../components/FilterSearchInput";

type BasicInfoProps = {
  natureOfObject: string;
  setNatureOfObject: (value: string) => void;
  primaryClass: string;
  setPrimaryClass: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  objectDescription: string;
  setObjectDescription: (value: string) => void;
  setSelectedTab: (value: string) => void;
  parentObject: string;
  setParentTemplate: (value: string) => void;
};

const TopLevelObject = ["Natural", "Artificial", "Hybrid"];

const TopLevelType = [
  {
    name: "Human",
    description: "A human being.",
  },
  {
    name: "Things",
    description: "Other Living and Non-living things.",
  },
  {
    name: "Spaces",
    description: "Boundary of defined space",
  },
];

const categoryList = [
  "Entertainment",
  "Education",
  "social",
  "Government",
  "transportation",
  "commerce",
  "health",
  "real estate",
  "environment"
]

const BasicInfo = ({
  natureOfObject,
  setNatureOfObject,
  primaryClass,
  setPrimaryClass,
  category,
  title,
  setTitle,
  setCategory,
  objectDescription,
  setObjectDescription,
  setSelectedTab,
  parentObject,
  setParentTemplate,
}: BasicInfoProps) => {
  const handleNextClick = () => {
    if (!title) {
      alert("Please enter title");
      return;
    }

    if (!objectDescription) {
      alert("Please enter description");
      return;
    }

    if (!parentObject) {
      console.log("Please select parent object");
    }

    setSelectedTab("fields");
  };

  return (
    <div>
      <div className="my-8">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Make sure a template for this object doesn’t already exist.{" "}
        </h2>

        <p className="text-center mt-4">
          Make sure a template for this object doesn’t already exist.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Top Level Object</h3>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {TopLevelObject.map((object) => (
            <div
              key={object}
              className={`${
                natureOfObject === object
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } p-2 rounded-lg cursor-pointer border-2 text-center`}
              onClick={() => setNatureOfObject(object)}
            >
              {object}
            </div>
          ))}
        </div>
      </div>

      {/* loop through topLevelType and highlight selected one */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Primary Class</h3>

        <div className="grid gap-3 mt-4">
          {TopLevelType.map((type) => (
            <div
              key={type.name}
              className={`
                  p-2 px-3 rounded-lg cursor-pointer border-2`}
              onClick={() => setPrimaryClass(type.name)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{type.name}</p>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <div>
                  {primaryClass === type.name && (
                    <div className="mt-2 h-5 w-5 rounded-full bg-black flex justify-between items-center">
                      <div className="h-2 w-2 rounded-full bg-white mx-auto"></div>
                    </div>
                  )}
                  {primaryClass !== type.name && (
                    <div className="mt-2 h-5 w-5 rounded-full bg-transparent border-2 border-black"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* category search */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Category</h3>

        <div className="mt-4">
          {/* <input
            type="text"
            placeholder="Search for category"
            className="w-full p-2 rounded-lg border-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}

          {/* select category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg border-2"
          >
            {categoryList.map((_) => (
              <option key={_} value={_}>{_}</option>
            ))}
          </select>
        </div>
      </div>

      {/* parent template */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Parent Template
          <span className="text-sm text-gray-400"> (Optional)</span>
        </h3>
        
        <FilterSearchInput setPrimaryObject={setParentTemplate} />
      </div>

      {/* title */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Main Object Title</h3>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter title"
            className="w-full p-2 rounded-lg border-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      {/* description */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Description</h3>

        <div className="mt-4">
          <textarea
            placeholder="Enter description"
            className="w-full p-2 rounded-lg border-2"
            value={objectDescription}
            onChange={(e) => setObjectDescription(e.target.value)}
          />
        </div>
      </div>

      {/* next button */}
      <div className="mt-6">
        <button
          className="bg-primary text-white p-2 rounded-lg w-full"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;
