/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import AddBasicInfo from "../components/AddBasicInfo";
import Associations from "../components/Associations";
import AddParts from "./create/AddParts";
import AddProperties from "./create/AddProperties";
import AddVisuals from "./create/AddVisuals";
import AiAPI from "../../api/aiApi";

type IProperty = {
  type: string;
  label: string;
  example: string;
  value: string;
};

interface AiResponse {
  description: string;
  mobilityType: string;
  attributes: IProperty[];
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
    primaryNature: "things",
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
    setRealWorldObject({
      ...realWorldObject,
      title: item,
      description: response.description,
      mobilityType: response.mobilityType,
      attributes: response.attributes,
    });
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
              How would you like to create your Real World Object?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
                  <h3 className="text-lg font-semibold mb-2">
                    Use AI Generation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Let AI help you generate properties and attributes based on
                    your object description
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
                      onClick={async () => {
                        if (aiInput.trim()) {
                          setIsGenerating(true);
                          try {
                            await generateProperties(aiInput.trim());
                            setSelectedTab("basic_info");
                            setAiInput("");
                          } catch (error) {
                            console.error(
                              "Error generating properties:",
                              error
                            );
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
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        "Generate with AI"
                      )}
                    </button>
                    <p>or</p>
                    <button
                      onClick={() => setSelectedTab("basic_info")}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Start Manual Entry
                    </button>
                  </div>
                </div>
              </div>

              {/* Manual Entry Option */}
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow hidden">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Enter Manually</h3>
                  <p className="text-gray-600 mb-4">
                    Create your real world object by manually entering all the
                    details
                  </p>
                  <button
                    onClick={() => setSelectedTab("basic_info")}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Start Manual Entry
                  </button>
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
