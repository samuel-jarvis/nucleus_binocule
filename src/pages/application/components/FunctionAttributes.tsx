import { useEffect, useState } from "react";
import { ICreateFunctionOrActivity } from "../create/CreateFunctionsOrActivities";
import { FaMinus } from "react-icons/fa6";
import AddFieldsModal from "../create/AddFieldsModal";

type IProperty = {
  value: string;
  type: string;
  label: string;
  example: string;
};

type Props = {
  formData: ICreateFunctionOrActivity;
  setFormData: (realWorldObject: ICreateFunctionOrActivity) => void;
  setSelectedTab: (value: string) => void;
};

const FunctionAttributes = ({
  formData,
  setFormData,
  setSelectedTab,
}: Props) => {
  const [fields, setFields] = useState(formData.attributes);
  const [singleField, setSingleField] = useState({} as IProperty | null);

  useEffect(() => {
    setFormData({
      ...formData,
      attributes: fields,
    });
  }, [fields]);

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleContinue = () => {
    console.log(formData);
    setSelectedTab("visuals");
  };

  return (
    <div>
      <div className="mb-10">
        <div className="my-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            <span className="text-blue mr-1">+ Add</span>
            information components
          </h2>

          <p className="mt-4">
            Add relevant information for this function
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex  justify-between items-center">
          <h3 className="text-xl font-semibold text-black">Select</h3>

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
                  <p className="text-sm text-gray-600">
                    Example: {field.example}
                  </p>
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
    </div>
  );
};

export default FunctionAttributes;
