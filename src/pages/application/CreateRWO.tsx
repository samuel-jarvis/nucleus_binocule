/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import AddBasicInfo from "../components/AddBasicInfo";
import Associations from "../components/Associations";
import AddParts from "./create/AddParts";
import AddProperties from "./create/AddProperties";
import AddVisuals from "./create/AddVisuals";


type IProperty = {
  value: string;
  type: string;
  label: string;
  example: string;
};

export interface IRealWorldObject  {
  primaryNature: string;
  topLevelObject: string;
  category: string;
  parentTemplate: string;
  title: string;
  description: string;
  mobilityType: string;
  attributes: IProperty[];
  parts: IProperty[];
  associations: {
    creator: string[];
    owner: string[];
    user: string[];
    inCharge: string[];
  };
  icon: any;
}

const CreateRWO = () => {
  const [realWorldObject, setRealWorldObject] = useState<IRealWorldObject>({
    primaryNature: "",
    topLevelObject: "",
    category: "",
    parentTemplate: "",
    title: "",
    description: "",
    mobilityType: "",
    attributes: [],
    parts: [],
    associations: {
      creator: [],
      owner: [],
      user: [],
      inCharge: [],
    },
    icon: "",
  });

  const [selectedTab, setSelectedTab] = useState("basic_info");

  return (
    <div className="px-4 mb-10">
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="basic_info">
          <AddBasicInfo
            realWorldObject={realWorldObject}
            setRealWorldObject={setRealWorldObject}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        {/* attributes */}
        <Tabs.Content value="attributes">
          <AddProperties
            type="Attributes"
            realWorldObject={realWorldObject}
            setRealWorldObject={setRealWorldObject}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="parts">
          <AddParts
            type="Attributes"
            realWorldObject={realWorldObject}
            setRealWorldObject={setRealWorldObject}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="associations">
          {/* <AddAssociations setSelectedTab={setSelectedTab} /> */}
          <Associations
            realWorldObject={realWorldObject}
            setRealWorldObject={setRealWorldObject}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="visuals">
          <AddVisuals
            realWorldObject={realWorldObject}
            setRealWorldObject={setRealWorldObject}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default CreateRWO;
