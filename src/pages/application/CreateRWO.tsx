/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import AddBasicInfo from "../components/AddBasicInfo";
import Associations from "../components/Associations";
import AddParts from "./create/AddParts";
import AddProperties from "./create/AddProperties";
import AddVisuals from "./create/AddVisuals";
import AiAPI from "../../api/aiApi";

export type PropertyTag = "primary" | "secondary";

type IProperty = {
  type: string;
  label: string;
  example: string;
  value: string;
  tag?: PropertyTag;
  icon?: string | null;
};

interface AiResponse {
  description: string;
  mobilityType: string;
  attributes: (Omit<IProperty, "tag"> & { tag?: PropertyTag })[];
  associations?: {
    creator?: string[];
    owner?: string[];
    user?: string[];
    inCharge?: string[];
  };
}

export interface IRealWorldObject {
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

  const [selectedTab, setSelectedTab] = useState("get_started");
  const [aiInput, setAiInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProperties = async (item: string) => {
    const data = await AiAPI.generateNucleus(item);
    console.log(data);

    const response: AiResponse = data.message[0];
    setRealWorldObject((prev) => ({
      ...prev,
      title: item,
      description: response.description,
      mobilityType: response.mobilityType,
      attributes: response.attributes.map((attr) => ({
        ...attr,
        tag: attr.tag ?? "primary",
      })),
      associations: {
        creator: response.associations?.creator ?? prev.associations.creator,
        owner: response.associations?.owner ?? prev.associations.owner,
        user: response.associations?.user ?? prev.associations.user,
        inCharge: response.associations?.inCharge ?? prev.associations.inCharge,
      },
    }));
  };

  return (
    <div className="px-4 mb-10">
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="get_started">
          <div className="max-w-2xl mx-auto p-2">
            <h2 className="text-2xl font-bold mb-6 text-center">
              What would you like to create?
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Human Nucleus Option */}
              <div
                className="border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-400 bg-purple-50"
                onClick={() => {
                  setRealWorldObject({
                    ...realWorldObject,
                    primaryNature: "human",
                    title: "Human",
                    mobilityType: "dynamic",
                  });
                  setSelectedTab("basic_info");
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800">Create Human Nucleus</h3>
                    <p className="text-sm text-purple-600">
                      The global human template — enables users to pin themselves to scapes. Only one should exist.
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Generation Option */}
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Use AI Generation</h3>
                  <p className="text-gray-600 mb-4">
                    Let AI help you generate properties and attributes based on your object description
                  </p>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Enter the name or description of your real world object..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isGenerating}
                    />
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (aiInput.trim()) {
                          setIsGenerating(true);
                          try {
                            setRealWorldObject({ ...realWorldObject, primaryNature: "things" });
                            await generateProperties(aiInput.trim());
                            setSelectedTab("basic_info");
                            setAiInput("");
                          } catch (error) {
                            console.error("Error generating properties:", error);
                          } finally {
                            setIsGenerating(false);
                          }
                        }
                      }}
                      disabled={!aiInput.trim() || isGenerating}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isGenerating ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Generating...
                        </>
                      ) : (
                        "Generate with AI"
                      )}
                    </button>
                    <p className="text-sm text-gray-400">or</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRealWorldObject({ ...realWorldObject, primaryNature: "things" });
                        setSelectedTab("basic_info");
                      }}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Start Manual Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>

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
