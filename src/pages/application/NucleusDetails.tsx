import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { IRealWorldObjectResponse } from "./components/AllNucleus";
import { NucleusApi } from "../../api/nucleusApi";
import ObjectFunctionList from "./sections/ObjectFunctionList";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { toast } from "react-toastify";
import AddFieldsModal from "./create/AddFieldsModal";
import FilterSearchInput from "./components/FilterSearchInput";
import { FaCircleMinus, FaCirclePlus, FaMinus } from "react-icons/fa6";

type IProperty = {
  type: string;
  label: string;
  example: string;
  value: string;
  tag?: "primary" | "secondary";
  icon?: string | null;
};

type IAssociations = {
  creator: string[];
  owner: string[];
  user: string[];
  inCharge: string[];
};

const NucleusDetails = () => {
  const { id } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IRealWorldObjectResponse | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [attributesModalOpen, setAttributesModalOpen] = useState(false);
  const [partsModalOpen, setPartsModalOpen] = useState(false);
  const [associationsModalOpen, setAssociationsModalOpen] = useState(false);
  const [visualModalOpen, setVisualModalOpen] = useState(false);

  const [basicForm, setBasicForm] = useState({
    category: "",
    parentTemplate: "",
    title: "",
    description: "",
    mobilityType: "",
  });
  const [attributesForm, setAttributesForm] = useState<IProperty[]>([]);
  const [partsForm, setPartsForm] = useState<IProperty[]>([]);
  const [associationsForm, setAssociationsForm] = useState<IAssociations>({
    creator: [],
    owner: [],
    user: [],
    inCharge: [],
  });
  const [associationInputs, setAssociationInputs] = useState({
    creator: "",
    owner: "",
    user: "",
    inCharge: "",
  });

  const [attributeSingleField, setAttributeSingleField] = useState({} as IProperty | null);
  const [partSingleField, setPartSingleField] = useState({} as IProperty | null);
  const [visualFile, setVisualFile] = useState<File | null>(null);
  const [visualPreview, setVisualPreview] = useState<string | null>(null);

  const categoryList = useMemo(
    () => [
      "person",
      "place",
      "thing",
      "organization",
      "event",
      "concept",
      "other",
    ],
    []
  );

  const associationsKeys = useMemo(
    () =>
      [
        { key: "creator", label: "Creator" },
        { key: "owner", label: "Owner" },
        { key: "user", label: "User" },
        { key: "inCharge", label: "In Charge" },
      ] as { key: keyof IAssociations; label: string }[],
    []
  );

  useEffect(() => {
    if (!id) return;

    NucleusApi.getNucleusById(id)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const updateLocalData = (partial: Partial<IRealWorldObjectResponse>) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...partial,
      };
    });
  };

  const handleUpdate = async (payload: Record<string, unknown> | FormData) => {
    if (!id) return;

    setIsUpdating(true);
    try {
      await NucleusApi.updateNucleus(id, payload);
      toast.success("Template updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update template");
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const openBasicModal = () => {
    if (!data) return;
    setBasicForm({
      category: data.category || "",
      parentTemplate: data.parentTemplate || "",
      title: data.title || "",
      description: data.description || "",
      mobilityType: data.mobilityType || "",
    });
    setBasicModalOpen(true);
  };

  const openAttributesModal = () => {
    if (!data) return;
    setAttributesForm((data.attributes || []).map((attr) => ({ ...attr, tag: attr.tag ?? "primary" })));
    setAttributesModalOpen(true);
  };

  const openPartsModal = () => {
    if (!data) return;
    setPartsForm((data.parts || []).map((part) => ({ ...part, tag: part.tag ?? "primary" })));
    setPartsModalOpen(true);
  };

  const openAssociationsModal = () => {
    if (!data) return;
    setAssociationsForm({
      creator: data.associations?.creator || [],
      owner: data.associations?.owner || [],
      user: data.associations?.user || [],
      inCharge: data.associations?.inCharge || [],
    });
    setAssociationInputs({
      creator: "",
      owner: "",
      user: "",
      inCharge: "",
    });
    setAssociationsModalOpen(true);
  };

  const openVisualModal = () => {
    if (!data) return;
    setVisualFile(null);
    setVisualPreview(data.icon?.url || null);
    setVisualModalOpen(true);
  };

  const saveBasicInfo = async () => {
    await handleUpdate({
      id,
      category: basicForm.category,
      parentTemplate: basicForm.parentTemplate,
      title: basicForm.title,
      description: basicForm.description,
      mobilityType: basicForm.mobilityType,
    });

    updateLocalData({
      category: basicForm.category,
      parentTemplate: basicForm.parentTemplate,
      title: basicForm.title,
      description: basicForm.description,
      mobilityType: basicForm.mobilityType,
    });
    setBasicModalOpen(false);
  };

  const saveAttributes = async () => {
    await handleUpdate({
      id,
      attributes: attributesForm,
    });
    updateLocalData({ attributes: attributesForm });
    setAttributesModalOpen(false);
  };

  const saveParts = async () => {
    await handleUpdate({
      id,
      parts: partsForm,
    });
    updateLocalData({ parts: partsForm });
    setPartsModalOpen(false);
  };

  const saveAssociations = async () => {
    await handleUpdate({
      id,
      associations: associationsForm,
    });
    updateLocalData({ associations: associationsForm });
    setAssociationsModalOpen(false);
  };

  const saveVisual = async () => {
    if (!visualFile) {
      toast.info("Please select an image");
      return;
    }

    const payload = new FormData();
    payload.append("id", id || "");
    payload.append("file", visualFile);

    await handleUpdate(payload);
    updateLocalData({
      icon: {
        ...(data?.icon || {}),
        url: visualPreview || data?.icon?.url || "",
      },
    } as Partial<IRealWorldObjectResponse>);
    setVisualModalOpen(false);
  };

  const handleAssociationAdd = (key: keyof IAssociations) => {
    const value = associationInputs[key].trim();
    if (!value) return;
    if (associationsForm[key].includes(value)) return;

    setAssociationsForm((prev) => ({
      ...prev,
      [key]: [...prev[key], value],
    }));

    setAssociationInputs((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleAssociationRemove = (key: keyof IAssociations, value: string) => {
    setAssociationsForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value),
    }));
  };

  if (loading) {
    return (
      <p className="text-black font-medium text-center my-8">Loading Nucleus</p>
    );
  }

  if (!data) {
    return (
      <p className="text-black font-medium text-center my-8">No Data Found</p>
    );
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <div className="flex justify-between items-start gap-3">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {data.title}
            </h2>
            <button
              className="bg-blue text-white p-2 px-4 rounded-lg"
              onClick={openBasicModal}
            >
              Edit Basic Info
            </button>
          </div>
          <p className="text-gray-600">
            {data.category} - {data.primaryNature}
          </p>
        </div>

        <div className="text-sm mb-4">
          Created by :{" "}
          <span className="text-blue-500 font-bold">
            {data.user.firstName} {data.user.lastName}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start gap-3">
            <img
              src={data.icon.url}
              alt={`${data.title} Icon`}
              className="w-44 rounded-2xl object-contain"
            />
            <button
              className="bg-blue text-white p-2 px-4 rounded-lg h-fit"
              onClick={openVisualModal}
            >
              Edit Visual
            </button>
          </div>
        </div>

        {data.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">
              Description
            </h3>
            <p className="text-gray-700">{data.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="block font-semibold text-gray-700 mb-1">
              Top Level Object
            </span>
            <p className="text-gray-700">{data.topLevelObject}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-700 mb-1">
              Parent Template
            </span>
            <p className="text-gray-700">{data.parentTemplate}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-700 mb-1">
              Mobility Type
            </span>
            <p className="text-gray-700">{data.mobilityType}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue">Properties</h3>
            <div className="flex gap-2">
              <button
                className="bg-blue text-white p-2 px-4 rounded-lg"
                onClick={openAttributesModal}
              >
                Edit Attributes
              </button>
              <button
                className="bg-blue text-white p-2 px-4 rounded-lg"
                onClick={openPartsModal}
              >
                Edit Parts
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Attributes</h4>
              {data.attributes.length > 0 ? (
                <ul className="list-disc pl-5">
                  {data.attributes.map((attr, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold text-gray-700">
                        {attr.label}:
                      </span>{" "}
                      <span className="text-gray-600">{attr.value}</span>
                      {attr.type && (
                        <span className="text-gray-500 text-sm ml-1">
                          ({attr.type})
                        </span>
                      )}
                      {attr.example && (
                        <p className="text-gray-500 text-xs mt-1">
                          Example: {attr.example}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No attributes defined.</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Parts</h4>
              {data.parts.length > 0 ? (
                <ul className="list-disc pl-5">
                  {data.parts.map((part, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold text-gray-700">
                        {part.label}:
                      </span>{" "}
                      <span className="text-gray-600">{part.value}</span>
                      {part.type && (
                        <span className="text-gray-500 text-sm ml-1">
                          ({part.type})
                        </span>
                      )}
                      {part.example && (
                        <p className="text-gray-500 text-xs mt-1">
                          Example: {part.example}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No parts defined.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue">Associations</h3>
            <button
              className="bg-blue text-white p-2 px-4 rounded-lg"
              onClick={openAssociationsModal}
            >
              Edit Associations
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(data.associations).map(([role, names]) => (
              <div key={role}>
                <h4 className="font-semibold text-gray-700 mb-2 capitalize">
                  {role}
                </h4>
                {names.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {names.map((name, index) => (
                      <li key={index} className="text-gray-600">
                        {name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No {role} defined.</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {id && <ObjectFunctionList id={id} />}
      </div>

      <AlertDialog.Root open={basicModalOpen} onOpenChange={setBasicModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
            <AlertDialog.Title className="text-xl font-semibold">Edit Basic Info</AlertDialog.Title>
            <div className="mt-4">
              <label className="text-sm text-gray-600">Category</label>
              <select
                value={basicForm.category}
                onChange={(e) => setBasicForm({ ...basicForm, category: e.target.value })}
                className="w-full p-2 rounded-lg border-2"
              >
                <option value="">Select Category</option>
                {categoryList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Parent Template</label>
              <FilterSearchInput
                setPrimaryObject={(parentTemplate: string) =>
                  setBasicForm({ ...basicForm, parentTemplate })
                }
              />
              <input
                type="text"
                value={basicForm.parentTemplate}
                onChange={(e) => setBasicForm({ ...basicForm, parentTemplate: e.target.value })}
                className="w-full p-2 rounded-lg border-2 mt-2"
                placeholder="Parent template id"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Title</label>
              <input
                type="text"
                value={basicForm.title}
                onChange={(e) => setBasicForm({ ...basicForm, title: e.target.value })}
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                value={basicForm.description}
                onChange={(e) => setBasicForm({ ...basicForm, description: e.target.value })}
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Mobility Type</label>
              <select
                value={basicForm.mobilityType}
                onChange={(e) => setBasicForm({ ...basicForm, mobilityType: e.target.value })}
                className="w-full p-2 rounded-lg border-2"
              >
                <option value="">Select Type</option>
                <option value="static">Static</option>
                <option value="dynamic">Dynamic</option>
              </select>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                className="bg-primary text-white p-2 px-4 rounded-lg w-full"
                onClick={saveBasicInfo}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <AlertDialog.Cancel asChild>
                <button className="bg-white text-primary border p-2 px-4 rounded-lg w-full">
                  Cancel
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={attributesModalOpen} onOpenChange={setAttributesModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
            <div className="flex justify-between items-center">
              <AlertDialog.Title className="text-xl font-semibold">Edit Attributes</AlertDialog.Title>
              <AddFieldsModal
                fields={attributesForm}
                setFields={setAttributesForm}
                updateField={attributeSingleField}
                setSingleField={setAttributeSingleField}
              />
            </div>

            <div className="mt-4 max-h-[420px] overflow-auto pr-2">
              {attributesForm.map((attr, index) => (
                <div key={`${attr.label}-${index}`} className="bg-[#fafbfc] p-4 rounded-lg flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-semibold">{attr.label}</h4>
                    <p className="text-sm text-gray-600">Type: {attr.type}</p>
                    <p className="text-sm text-gray-600">Example: {attr.example}</p>
                    <div className="mt-2">
                      <label className="text-sm text-gray-600 mr-2">Tag:</label>
                      <select
                        value={(attr.tag ?? "primary") as "primary" | "secondary"}
                        onChange={(e) => {
                          const tag = e.target.value as "primary" | "secondary";
                          setAttributesForm((prev) => prev.map((item, i) => (i === index ? { ...item, tag } : item)));
                        }}
                        className="p-2 rounded-lg border-2 bg-white"
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="bg-white text-red-700 p-2 rounded-lg"
                    onClick={() => setAttributesForm((prev) => prev.filter((_, i) => i !== index))}
                  >
                    <FaMinus />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                className="bg-primary text-white p-2 px-4 rounded-lg w-full"
                onClick={saveAttributes}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <AlertDialog.Cancel asChild>
                <button className="bg-white text-primary border p-2 px-4 rounded-lg w-full">
                  Cancel
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={partsModalOpen} onOpenChange={setPartsModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
            <div className="flex justify-between items-center">
              <AlertDialog.Title className="text-xl font-semibold">Edit Parts</AlertDialog.Title>
              <AddFieldsModal
                fields={partsForm}
                setFields={setPartsForm}
                updateField={partSingleField}
                setSingleField={setPartSingleField}
              />
            </div>

            <div className="mt-4 max-h-[420px] overflow-auto pr-2">
              {partsForm.map((part, index) => (
                <div key={`${part.label}-${index}`} className="bg-[#fafbfc] p-4 rounded-lg flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-semibold">{part.label}</h4>
                    <p className="text-sm text-gray-600">Type: {part.type}</p>
                    <p className="text-sm text-gray-600">Example: {part.example}</p>
                    <div className="mt-2">
                      <label className="text-sm text-gray-600 mr-2">Tag:</label>
                      <select
                        value={(part.tag ?? "primary") as "primary" | "secondary"}
                        onChange={(e) => {
                          const tag = e.target.value as "primary" | "secondary";
                          setPartsForm((prev) => prev.map((item, i) => (i === index ? { ...item, tag } : item)));
                        }}
                        className="p-2 rounded-lg border-2 bg-white"
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="bg-white text-red-700 p-2 rounded-lg"
                    onClick={() => setPartsForm((prev) => prev.filter((_, i) => i !== index))}
                  >
                    <FaMinus />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                className="bg-primary text-white p-2 px-4 rounded-lg w-full"
                onClick={saveParts}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <AlertDialog.Cancel asChild>
                <button className="bg-white text-primary border p-2 px-4 rounded-lg w-full">
                  Cancel
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={associationsModalOpen} onOpenChange={setAssociationsModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
            <AlertDialog.Title className="text-xl font-semibold">Edit Associations</AlertDialog.Title>

            <div className="space-y-4 mt-4 max-h-[420px] overflow-auto pr-2">
              {associationsKeys.map((association) => (
                <div key={association.key}>
                  <h3 className="mb-2 text-lg font-semibold">{association.label}</h3>
                  <div className="flex items-center justify-between bg-[#F9F9F9] pr-2 rounded-lg">
                    <input
                      type="text"
                      value={associationInputs[association.key]}
                      onChange={(e) =>
                        setAssociationInputs((prev) => ({
                          ...prev,
                          [association.key]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAssociationAdd(association.key);
                        }
                      }}
                      className="p-2 w-full bg-transparent border-none outline-none"
                      placeholder={`Enter ${association.label}`}
                    />
                    <FaCirclePlus
                      onClick={() => handleAssociationAdd(association.key)}
                      className="cursor-pointer text-blue"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {associationsForm[association.key].map((value) => (
                      <div
                        key={`${association.key}-${value}`}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded"
                      >
                        <span className="mr-2 text-gray-800">{value}</span>
                        <FaCircleMinus
                          onClick={() => handleAssociationRemove(association.key, value)}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                className="bg-primary text-white p-2 px-4 rounded-lg w-full"
                onClick={saveAssociations}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <AlertDialog.Cancel asChild>
                <button className="bg-white text-primary border p-2 px-4 rounded-lg w-full">
                  Cancel
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={visualModalOpen} onOpenChange={setVisualModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
            <AlertDialog.Title className="text-xl font-semibold">Edit Visual</AlertDialog.Title>
            <div className="mt-4">
              <label className="text-sm text-gray-600">Upload Icon</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setVisualFile(file);
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setVisualPreview(reader.result as string);
                  reader.readAsDataURL(file);
                }}
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            {visualPreview && (
              <div className="mt-4">
                <img src={visualPreview} alt="preview" className="w-40 rounded-xl object-contain" />
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                className="bg-primary text-white p-2 px-4 rounded-lg w-full"
                onClick={saveVisual}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <AlertDialog.Cancel asChild>
                <button className="bg-white text-primary border p-2 px-4 rounded-lg w-full">
                  Cancel
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default NucleusDetails;
