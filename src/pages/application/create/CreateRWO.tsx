/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import BasicInfo from "./RWOBasicInfo";
import AddProperties from "./AddProperties";
import AddAssociations from "./AddAssociations";
import AddVisuals from "./AddVisuals";
import { NucleusApi } from "../../../api/nucleusApi";
import { toast } from "react-toastify";

// type RwoForm = {
//   natureOfObject: "natural";
//   primaryClass: "static";
//   category: "education";
//   title: string;
//   parentObject: {
//     object: string;
//   }[];
//   objectDescription: string;
//   fields: {
//     value: string;
//     type: "text";
//     label: string;
//   }[];
//   states: {
//     value: string;
//     type: "text";
//     label: string;
//   }[];
//   icon: string;
// };

const CreateRWO = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [natureOfObject, setNatureOfObject] = useState("natural");
  const [primaryClass, setPrimaryClass] = useState("static");
  const [category, setCategory] = useState("education");
  const [title, setTitle] = useState("");
  const [objectDescription, setObjectDescription] = useState("");
  const [parentObject, setParentObject] = useState<any>();

  const [fields, setFields] = useState<any>([]);

  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");

  const [selectedTab, setSelectedTab] = useState("basic_info");

  const handleSubmission = () => {
    const data: any = {
      natureOfObject: natureOfObject.toLowerCase(),
      primaryClass: "static",
      // parentObject: [
      //   {
      //     object: parentObject,
      //   },
      // ],
      category,
      title,
      objectDescription,
      fields,
      icon: "https://img.freepik.com/free-photo/3d-black-gift-box-with-gold-ribbon-bow_107791-17735.jpg",
    };

    if (parentObject) {
      data["parentObject"] = [
        {
          object: parentObject,
        },
      ];
    }

    console.log(data);

    // if (!parentObject) {
    //   toast.error("Please select a parent object");
    //   return;
    // }

    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!objectDescription) {
      toast.error("Please enter a description");
      return;
    }

    setIsLoading(true);

    NucleusApi.createNucleus(data)
      .then((res) => {
        console.log(res);
        toast.success("RWO created successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating RWO");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="px-4 mb-10">
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="basic_info">
          <BasicInfo
            natureOfObject={natureOfObject}
            setNatureOfObject={setNatureOfObject}
            primaryClass={primaryClass}
            setPrimaryClass={setPrimaryClass}
            category={category}
            setCategory={setCategory}
            title={title}
            setTitle={setTitle}
            objectDescription={objectDescription}
            setObjectDescription={setObjectDescription}
            setSelectedTab={setSelectedTab}
            parentObject={parentObject}
            setParentTemplate={setParentObject}
          />
        </Tabs.Content>

        <Tabs.Content value="fields">
          <AddProperties
            fields={fields}
            setFields={setFields}
            setSelectedTab={setSelectedTab}
            context={"rwo"}
          />
        </Tabs.Content>

        <Tabs.Content value="associations">
          <AddAssociations setSelectedTab={setSelectedTab} />
        </Tabs.Content>

        <Tabs.Content value="visuals">
          <AddVisuals
            icon={icon}
            setIcon={setIcon}
            image={image}
            setImage={setImage}
            setSelectedTab={setSelectedTab}
            handleSubmission={handleSubmission}
            isLoading={isLoading}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default CreateRWO;
