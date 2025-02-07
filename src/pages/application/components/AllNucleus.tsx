/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NucleusApi } from "../../../api/nucleusApi";
import { IRealWorldObject } from "../CreateRWO";
import { Link, useNavigate } from "react-router-dom";

export interface IRealWorldObjectResponse extends IRealWorldObject {
  user: any;
  _id: string
  icon: {
    url: string;
  }
}
const AllNucleus = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IRealWorldObjectResponse[]>([]);
  const navigate = useNavigate();

  const fetchDate = () => {
    setLoading(true);

    NucleusApi.getNucleus()
      .then((res) => {
        console.log(res);
        setData(res.docs)
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

  const handleClick = (id: string) => {
    navigate(`/object/${id}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">Recently Created</h3>

        <button>
          <Link to="/objects" className="text-blue-500 ml-auto mt-8 font-medium">
          View All Templates
          </Link>
        </button>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          {data.map((nucleus) => (
            <div key={nucleus._id} className="bg-slate-50 p-4 rounded-lg cursor-pointer"
              onClick={() => handleClick(nucleus._id)}
            >
              <div className="flex items-center">
                <img
                  className="w-10 h-10 mr-2 object-cover rounded-lg"
                  src={nucleus?.icon.url}
                  alt=""
                />

                <div className="hidden">
                  {
                    nucleus?.icon.url
                  }
                </div>

                <div>
                  <h4 className="font-bold">{nucleus.title}</h4>
                  <p className="text-sm text-gray-600">
                    {
                      nucleus.category?.length > 100
                        ? nucleus.description?.substring(0, 60) + "..."
                        : nucleus.description
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
