/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import FileUploadApiApi from "../../../api/fileUploadApi";
import { toast } from "react-toastify";

type IProperty = {
  value: string;
  type: string;
  label: string;
  iconImage: string;
};

type Props = {
  fields: IProperty[] | any;
  setFields: (
    fields: {
      value: string;
      type: string;
      label: string;
      example: string;
      iconImage?: string;
    }[]
  ) => void;
  updateField?: IProperty | any;
  setSingleField: any;
};

const FieldTypes = [
  { value: "text", label: "Small Copy" },
  { value: "textarea", label: "Long Copy" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "tel", label: "Phone" },
  { value: "url", label: "URL" },
  { value: "color", label: "Color" },
  { value: "file", label: "File" },
  // { value: "select", label: "Select" },
];

const AddFieldsModal = ({
  fields,
  setFields,
  updateField,
  setSingleField,
}: Props) => {
  const [uploadingFile, setUploadingFile] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [value, setValue] = useState("");
  const [type, setType] = useState("text"); // input/form type
  const [label, setLabel] = useState("");
  const [example, setExample] = useState("");
  const [iconImage, setIconImage] = useState("");

  const [button, setButton] = useState("Add Field");

  useEffect(() => {
    if (!updateField) {
      return;
    }

    if (updateField.value) {
      setValue(updateField.value);
      setType(updateField.type);
      setLabel(updateField.label);

      setButton("Update Field");
      setIsModalOpen(true);
    }
  }, [updateField]);

  const handleAddField = () => {
    if (!label) {
      alert("Please enter label");
      return;
    }

    if (uploadingFile) {
      toast.info("Uploading icon");
      return;
    }

    if (button === "Add Field") {
      setFields([
        ...fields,
        { value, type, label, example, icon: iconImage || null },
      ]);
      // clear input fields
      setValue("");
      setType("text");
      setLabel("");
      setExample("");
      setIconImage("");
    } else {
      if (!updateField) return;

      const newFields = fields.map((f: any) => {
        if (f.value === updateField.value) {
          return { value, type, label };
        }

        return f;
      });

      setFields(newFields);

      // clear input fields
      setSingleField(null);
      setValue("");
      setType("");
      setLabel("");
      setExample("");
    }

    setIsModalOpen(false);
  };

  const renderInput = () => {
    switch (type) {
      case "text":
      case "number":
      case "date":
      case "tel":
      case "url":
        return (
          <input
            type={type}
            placeholder={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 w-full rounded-lg border-2"
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 w-full rounded-lg border-2"
          />
        );

      case "radio":
        return (
          <input
            type="radio"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 w-full rounded-lg border-2"
          />
        );

      case "color":
        return (
          <input
            type="color"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 w-full rounded-lg border-2"
          />
        );

      case "file":
        return (
          <input
            type="file"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 w-full rounded-lg border-2"
          />
        );

      case "select":
        return (
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 w-full rounded-lg border-2"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );

      default:
        return (
          <input
            type="text"
            placeholder={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 w-full rounded-lg border-2"
          />
        );
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingFile(true);
      FileUploadApiApi.upload(file)
        .then((res) => {
          console.log(res);
          setIconImage(res.data.url);
          toast.success("Icon uploaded successfully");
          setUploadingFile(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Icon upload failed");
          setUploadingFile(false);
        });
    }
  };

  return (
    <div>
      <AlertDialog.Root
        open={isModalOpen}
        onOpenChange={(isOpen: boolean | ((prevState: boolean) => boolean)) => {
          setIsModalOpen(isOpen);
        }}
      >
        <AlertDialog.Trigger asChild>
          <button className="p-2 px-4 text-white rounded-full bg-blue">
            <p className="flex gap-2 items-center">
              <FaPlus />
              Add Field
            </p>
          </button>
        </AlertDialog.Trigger>

        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

        <AlertDialog.Content className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg w-full px-3 max-w-[700px]">
          <div className="p-8 bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <AlertDialog.Title asChild>
                <h3 className="text-xl font-semibold text-black">
                  {button === "Add Field" ? "Add New Field" : "Update Field"}
                </h3>
              </AlertDialog.Title>

              <AlertDialog.Description className="text-sm text-gray-600 hidden">
                {button === "Add Field"? "Add a new field" : "Update field"}
              </AlertDialog.Description>

              <AlertDialog.Cancel asChild>
                <FaTimes className="text-red-700" />
              </AlertDialog.Cancel>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-2 w-full rounded-lg border-2"
              >
                {FieldTypes.map((fieldType) => (
                  <option key={fieldType.value} value={fieldType.value}>
                    {fieldType.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3">
              <label className="text-sm text-gray-600">Label</label>
              <input
                type="text"
                placeholder="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="p-2 w-full rounded-lg border-2"
              />
            </div>

            <div className="mt-3">
              <label className="text-sm text-gray-600">Example</label>
              <input
                type="text"
                placeholder="Example"
                value={example}
                onChange={(e) => setExample(e.target.value)}
                className="p-2 w-full rounded-lg border-2"
              />
            </div>

            <div className="hidden mt-3">
              <label className="text-sm text-gray-600">Value</label>

              <div className="flex gap-8 items-center">
                {renderInput()}

                {/* for color show preview */}
                {type === "color" && (
                  <div
                    className="mt-2 w-10 h-10 rounded-lg"
                    style={{ backgroundColor: value }}
                  ></div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <label className="text-sm text-gray-600">Icon</label>
              <input
                type="file"
                accept="image/*"
                // value={iconImage}
                onChange={(e) => handleIconChange(e)}
                className="p-2 w-full rounded-lg border-2"
              />
            </div>

            <div className="mt-3">
              <button
                onClick={() => handleAddField()}
                className="block p-2 px-4 w-full text-white rounded-lg bg-primary"
              >
                {button}
              </button>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default AddFieldsModal;
