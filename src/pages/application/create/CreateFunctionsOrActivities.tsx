/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import AddAssociations from "./AddAssociations";
import FunctionBasicInfo from "./FunctionBasicInfo";
import ApplicationApi from "../../../api/applicationApi";
import ActivityApi from "../../../api/activityApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateFunctionsOrActivities = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState<"function" | "activity">("function");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [primaryObject, setPrimaryObject] = useState("");
  const [secondaryObject] = useState([]);
  const [states] = useState([]);

  const [fields] = useState<any>([]);
  const [icon] = useState("");

  const [selectedTab, setSelectedTab] = useState("basic_info");
  // const [image, setImage] = useState("");

  const handleSubmission = () => {
    console.log(isLoading);
    const data = {
      title,
      category,
      description,
      primaryObject,
      secondaryObject,
      fields,
      states,
      icon,
    };

    console.log(data);
    
    setIsLoading(true)
    if (type === "function") {
      ApplicationApi.createApplication(data)
        .then((response) => {
          console.log(response);
          navigate("/");
          toast.success("Function created successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error creating function");
        });
    }

    if (type === "activity") {
      ActivityApi.createActivity(data)
        .then((response) => {
          console.log(response);
          navigate("/");
          toast.success("Activity created successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return;
  };

  return (
    <div>
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="basic_info">
          <FunctionBasicInfo
            type={type}
            setType={setType}
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            description={description}
            setDescription={setDescription}
            primaryObject={primaryObject}
            setPrimaryObject={setPrimaryObject}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="fields">
          {/* <AddProperties
            fields={fields}
            setFields={setFields}
            setSelectedTab={setSelectedTab}
            context={"rwo"}
          /> */}
        </Tabs.Content>

        <Tabs.Content value="associations">
          <AddAssociations setSelectedTab={setSelectedTab} />
        </Tabs.Content>

        <Tabs.Content value="visuals">
          {/* <AddVisuals
            icon={icon}
            setIcon={setIcon}
            image={image}
            setImage={setImage}
            setSelectedTab={setSelectedTab}
            handleSubmission={handleSubmission}
            isLoading={isLoading}
          /> */}
        </Tabs.Content>

        <div>
          <button
            onClick={handleSubmission}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default CreateFunctionsOrActivities;
