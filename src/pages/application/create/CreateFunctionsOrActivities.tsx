import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import AddAssociations from "./AddAssociations";
import FunctionBasicInfo from "./FunctionBasicInfo";
import FunctionAttributes from "../components/FunctionAttributes";
import FunctionIcon from "../components/FunctionIcon";

export type IProperty = {
  value: string;
  type: string;
  label: string;
  example: string;
};

export interface ICreateFunctionOrActivity {
  title: string;
  category: string;
  description: string;
  nucleusId: string;
  attributes: IProperty[];
}

const CreateFunctionsOrActivities = () => {
  const [selectedTab, setSelectedTab] = useState("basic_info");

  const [formData, setFormData] = useState<ICreateFunctionOrActivity>({
    title: "",
    category: "",
    description: "",
    nucleusId: "",
    attributes: [],
  });

  return (
    <div>
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="basic_info">
          <FunctionBasicInfo
            formData={formData}
            setFormData={setFormData}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="attributes">
          <FunctionAttributes
            formData={formData}
            setFormData={setFormData}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="associations">
          <AddAssociations setSelectedTab={setSelectedTab} />
        </Tabs.Content>

        <Tabs.Content value="visuals">
          <FunctionIcon formData={formData} setSelectedTab={setSelectedTab} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default CreateFunctionsOrActivities;
