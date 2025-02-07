import { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa6";
import AddFieldsModal from "./AddFieldsModal";
import { IRealWorldObject } from "../CreateRWO";

type IProperty = {
  value: string;
  type: string;
  label: string;
  example: string;
};

type Props = {
  type: "Attributes" | "Part";
  realWorldObject: IRealWorldObject;
  setRealWorldObject: (realWorldObject: IRealWorldObject) => void;
  setSelectedTab: (value: string) => void;
};

const AddParts = ({ realWorldObject, setRealWorldObject, setSelectedTab }: Props) => {
  const [singleField, setSingleField] = useState({} as IProperty | null);

  const handleContinue = () => {
    // if (context === 'rwo') {
    //   setSelectedTab("associations");
    // } else {
    //   setSelectedTab("visuals");
    // }
    console.log(realWorldObject);
    setSelectedTab("associations");
  }

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const [fields, setFields] = useState(realWorldObject.parts || []);

  useEffect(() => {
    setRealWorldObject({
      ...realWorldObject,
      parts: fields,
    });
  }, [fields]);

  return (
    <div className="mb-18">
      <div className="mb-10">
        <div className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            <span className="text-blue mr-1">
              + Add
            </span>
            information components
          </h2>

          <p className="mt-4">
            <span className="text-blue-700 font-medium mr-1 underline cursor-pointer">
              Add
            </span>
            unique property, attributes and other information that describes
            this object in the real world{" "}
            <span className="text-blue-700 font-medium ml-1 underline cursor-pointer">
              Copy from parent
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex  justify-between items-center">
          <h3 className="text-xl font-semibold text-black">Parts</h3>

          <AddFieldsModal
            fields={fields}
            setFields={setFields}
            updateField={singleField}
            setSingleField={setSingleField}
          />
        </div>

        <div className="mt-4">
          {fields?.length > 0 &&
            fields.map((field, index) => (
              <div
                key={index}
                className="bg-[#fafbfc] p-4 rounded-lg flex justify-between items-center mb-4"
                // onClick={() => handleUpdateField(index)}
              >
                <div>
                  <h4 className="font-semibold">{field.label}</h4>
                  <p className="text-sm text-gray-600">Type: {field.type}</p>
                  <p className="text-sm text-gray-600">Example: {field.example}</p>
                </div>

                <div>
                  <button
                    onClick={() => handleRemoveField(index)}
                    className="bg-white text-red-700 p-2 rounded-lg"
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => handleContinue()}
          className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
        >
          Continue
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("attributes")}
          className="bg-white text-primary p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddParts;
