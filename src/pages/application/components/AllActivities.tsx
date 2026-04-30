/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ActivityApi from "../../../api/activityApi";
import { Link } from "react-router-dom";
import { textShortener } from "../../../utility";

interface IActivityResponse {
  _id: string;
  title: string;
  description: string;
  category: string;
  user: any;
  icon: {
    url: string;
  };
}

interface IProps {
  title?: string;
  size?: number;
}

const AllActivities = ({ title, size }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IActivityResponse[]>([]);
  // const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);

    const params = {
      limit: size,
    };

    ActivityApi.getAllActivity(params)
      .then((res) => {
        setData(res.data?.docs || res.docs || res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="my-8 font-medium text-center text-black">
        Loading Activities
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black">
          {title ? title : "Recently Created Activities"}
        </h3>

        <Link
          to="/activity/list"
          className="mt-8 ml-auto font-medium text-blue-500"
        >
          View All Activities
        </Link>
      </div>

      <div className="mt-4">
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((activity) => (
            <div key={activity._id} className="p-4 rounded-lg bg-[#F9F9F9]">
              <div className="flex items-center">
                <img
                  className="object-cover mr-2 w-10 h-10 rounded-lg"
                  src={activity?.icon?.url}
                  alt=""
                />

                <div className="hidden">{activity?.icon?.url}</div>

                <div>
                  <h4 className="font-bold">{activity.title}</h4>
                  <p className="text-sm text-gray-600">
                    {activity.description
                      ? textShortener(activity.description, 60)
                      : ""}
                  </p>
                  <div className="text-sm text-gray-600">
                    Category: {activity.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="col-span-2 text-gray-500">No activities found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllActivities;
