/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NucleusApi } from "../../../api/nucleusApi";
// import { renderServerImage } from "../../../utility";

interface ObjectData {
  category: string;
  createdAt: string;
  fields: any[];
  icon: string;
  natureOfObject: string;
  objectDescription: string;
  primaryClass: string;
  states: any[];
  title: string;
  updatedAt: string;
}

const AllNucleus = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ObjectData[]>([]);

  const fetchDate = () => {
    setLoading(true);
    NucleusApi.getNucleus()
      .then((res) => {
        console.log(res);
        // setData(res.data);

        // reverse and select the last 10
        setData(res.data.reverse().slice(0, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDate();
  }, []);

  if (loading) {
    return <p
     className="text-black font-medium text-center my-8">Loading Nucleus</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-black mt-8">Recently Created</h3>

      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          {data.map((nucleus) => (
            <div key={nucleus.title} className="bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 mr-2 object-cover rounded-lg"
                  src={nucleus?.icon}
                  alt=""
                />

                <div className="hidden">
                  {
                    nucleus?.icon
                  }
                </div>

                <div>
                  <h4 className="font-bold">{nucleus.title}</h4>
                  <p className="text-sm text-gray-600">
                    {
                      nucleus.objectDescription.length > 100
                        ? nucleus.objectDescription.substring(0, 60) + "..."
                        : nucleus.objectDescription
                    }
                  </p>
                  <div className="text-sm text-gray-600">
                    Category: {nucleus.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllNucleus;
