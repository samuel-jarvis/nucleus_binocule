import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import AddFieldsModal from "./AddFieldsModal";

type IProperty = {
  value: string;
  type: string;
  label: string;
  example: string;
};

type Props = {
  fields: IProperty[];
  setFields: (fields: IProperty[]) => void;
  setSelectedTab: (value: string) => void;
  context: 'rwo' | 'function';
};

const AddProperties = ({ fields, setFields, setSelectedTab, context }: Props) => {
  const [singleField, setSingleField] = useState({} as IProperty | null);

  const handleUpdateField = (index: number) => {
    console.log(fields[index]);
    setSingleField(fields[index]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleContinue = () => {
    if (context === 'rwo') {
      setSelectedTab("associations");
    } else {
      setSelectedTab("visuals");
    }
  }

  return (
    <div className="mb-18">
      <div className="mb-10">
        <div className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            + Add information components
          </h2>

          <p className="text-center mt-4">
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
          <h3 className="text-xl font-semibold text-black">Properties</h3>

          <AddFieldsModal
            fields={fields}
            setFields={setFields}
            updateField={singleField}
            setSingleField={setSingleField}
          />
        </div>

        <p  className="text-sm text-gray-600 mt-2">
          Click on a property to update it
        </p>

        <div className="mt-4">
          {fields?.length > 0 &&
            fields.map((field, index) => (
              <div
                key={index}
                className="bg-[#fafbfc] p-4 rounded-lg flex justify-between items-center mb-4"
                onClick={() => handleUpdateField(index)}
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
          onClick={() => setSelectedTab("basic_info")}
          className="bg-white text-primary p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddProperties;
