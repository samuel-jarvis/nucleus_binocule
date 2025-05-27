import { useEffect, useState } from "react";
import ObjectFunctionApi from "../../../api/objectFunctionApi";
// import { IProperty } from "../create/CreateFunctionsOrActivities";

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
  icon: {
    url: string;
  };
}

const ObjectFunctionList = ({ id }: { id: string }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    ObjectFunctionApi.getObjectFunctionsByNucleusId(id)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold text-black mb-2 border-b">
        Object Functions
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {data.map((item: ICreateFunctionOrActivity) => (
          <div key={item.title} className="bg-white  rounded-lg border-b">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {item.title}
              </h2>
              <p className="text-gray-600">Category: {item.category}</p>
              <p className="text-gray-700"> Description {item.description}</p>
            </div>

            {item.attributes && item.attributes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue mb-2">
                  Attributes
                </h3>
                <ul className="list-disc pl-5">
                  {item.attributes.map((attr, index) => (
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
              </div>
            )}

            {item.icon && (
              <div className="mb-4">
                <img
                  src={item.icon.url}
                  alt={`${item.title} Icon`}
                  className="w-20 rounded-2xl object-contain"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectFunctionList;
