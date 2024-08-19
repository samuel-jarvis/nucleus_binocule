import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRWO = () => {
  const navigate = useNavigate();

  const TopLevelObject = ["Physical", "Digital", "Hybrid"];

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

  const [rwoForm, setRwoForm] = useState({
    objectNature: "",
    topLevelObject: "",
    category: "",
    parentTemplate: "",
    mainObjectTitle: "",
    description: "",
  });

  const handleNextClick = () => {
    navigate("/create/rwo/add-properties");
  };

  return (
    <div className="px-4 mb-10">
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
                rwoForm.topLevelObject === object
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } p-2 rounded-lg cursor-pointer border-2 text-center`}
              onClick={() => setRwoForm({ ...rwoForm, topLevelObject: object })}
            >
              {object}
            </div>
          ))}
        </div>
      </div>

      {/* loop through topLevelType and highlight selected one */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Top Level Type</h3>

        <div className="grid gap-3 mt-4">
          {TopLevelType.map((type) => (
            <div
              key={type.name}
              className={`
                p-2 px-3 rounded-lg cursor-pointer border-2`}
              onClick={() => setRwoForm({ ...rwoForm, category: type.name })}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{type.name}</p>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <div>
                  {rwoForm.category === type.name && (
                    <div className="mt-2 h-5 w-5 rounded-full bg-black flex justify-between items-center">
                      <div className="h-2 w-2 rounded-full bg-white mx-auto"></div>
                    </div>
                  )}
                  {rwoForm.category !== type.name && (
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
          <input
            type="text"
            placeholder="Search for category"
            className="w-full p-2 rounded-lg border-2"
            value={rwoForm.category}
            onChange={(e) =>
              setRwoForm({ ...rwoForm, category: e.target.value })
            }
          />
        </div>
      </div>

      {/* parent template */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Parent Template</h3>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Search for parent template"
            className="w-full p-2 rounded-lg border-2"
            value={rwoForm.parentTemplate}
            onChange={(e) =>
              setRwoForm({ ...rwoForm, parentTemplate: e.target.value })
            }
          />
        </div>
      </div>

      {/* title */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Main Object Title</h3>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter title"
            className="w-full p-2 rounded-lg border-2"
            value={rwoForm.mainObjectTitle}
            onChange={(e) =>
              setRwoForm({ ...rwoForm, mainObjectTitle: e.target.value })
            }
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
            value={rwoForm.description}
            onChange={(e) =>
              setRwoForm({ ...rwoForm, description: e.target.value })
            }
          />
        </div>
      </div>

      {/* next button */}
      <div className="mt-6">
        <button
          className="bg-black text-white p-2 rounded-lg w-full"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateRWO;
