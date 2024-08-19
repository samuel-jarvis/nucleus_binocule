import { useState } from "react";
import { FaMinus } from "react-icons/fa6";

type Property = {
  title: string;
  description: string;
}

type Properties = {
  properties: Property[];
}

const AddProperties = () => {
  const [properties, setProperties] = useState<Properties>({ properties: [] });

  const [property, setProperty] = useState<Property>({ title: "", description: "" });

  const handleAddProperty = () => {
    setProperties({ properties: [...properties.properties, property] });
    setProperty({ title: "", description: "" });
  };

  const handleRemoveProperty = (index: number) => {
    const newProperties = properties.properties.filter((_, i) => i !== index);
    setProperties({ properties: newProperties });
  };

  

  return (
    <div className="px-6 mb-18">
      <div className="px-4 mb-10">
        <div className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            + Add information components
          </h2>

          <p className="text-center mt-4">
            <span className="text-blue-700 font-medium mr-1 underline cursor-pointer">Add</span>
            unique property, attributes and other information that describes
            this object in the real world{" "}
            <span className="text-blue-700 font-medium ml-1 underline cursor-pointer">
              Copy from parent
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Add Property</h3>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Title"
            value={property.title}
            onChange={(e) => setProperty({ ...property, title: e.target.value })}
            className="w-full p-2 border-2 rounded-lg"
          />
        </div>

        <div className="mt-4">
          <textarea
            placeholder="Description"
            minLength={5}
            maxLength={150}
            value={property.description}
            onChange={(e) => setProperty({ ...property, description: e.target.value })}
            className="w-full p-2 border-2 rounded-lg"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleAddProperty}
            className="bg-primary text-white p-2 px-4 rounded-lg"
          >
            Add Property
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-black">Properties</h3>

        <div className="mt-4">
          {properties.properties.map((property, index) => (
            <div key={index} className="bg-[#f4f5f7] p-4 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{property.title}</h4>
                <p className="text-sm text-gray-600">{property.description}</p>
              </div>

              <div>
                <button
                  onClick={() => handleRemoveProperty(index)}
                  className="bg-white text-red-700 p-2 rounded-lg"
                >
                  <FaMinus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProperties;
