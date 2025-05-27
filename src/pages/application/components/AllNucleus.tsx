/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NucleusApi } from "../../../api/nucleusApi";
import { IRealWorldObject } from "../CreateRWO";
import { Link, useNavigate } from "react-router-dom";
import { textShortener } from "../../../utility";

export interface IRealWorldObjectResponse extends IRealWorldObject {
  user: any;
  _id: string;
  icon: {
    url: string;
  };
}

interface IProps {
  title?: string;
  size?: number;
}

const AllNucleus = ({ title, size }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IRealWorldObjectResponse[]>([]);
  const navigate = useNavigate();

  const fetchDate = () => {
    setLoading(true);

    const params = {
      limit: size,
    };

    NucleusApi.getNucleus(params)
      .then((res) => {
        console.log(res);
        setData(res.docs);
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
    return (
      <p className="my-8 font-medium text-center text-black">Loading Nucleus</p>
    );
  }

  const handleClick = (id: string) => {
    navigate(`/object/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black">
          {title ? title : "Recently Created Templates"}
        </h3>

        <button>
          <Link
            to="/objects"
            className="mt-8 ml-auto font-medium text-blue-500"
          >
            View All Templates
          </Link>
        </button>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          {data.map((nucleus) => (
            <div
              key={nucleus._id}
              className="p-4 rounded-lg cursor-pointer bg-slate-50"
              onClick={() => handleClick(nucleus._id)}
            >
              <div className="flex items-center">
                <img
                  className="object-cover mr-2 w-10 h-10 rounded-lg"
                  src={nucleus?.icon.url}
                  alt=""
                />

                <div className="hidden">{nucleus?.icon.url}</div>

                <div>
                  <h4 className="font-bold">{nucleus.title}</h4>
                  <p className="text-sm text-gray-600">
                    {textShortener(nucleus.description, 60)}
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
