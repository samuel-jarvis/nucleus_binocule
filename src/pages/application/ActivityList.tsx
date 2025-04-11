import { useEffect, useState } from "react";
import ActivityApi from "../../api/activityApi";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Icon {
  url: string;
  publicId: string;
}

interface IActivity {
  icon: Icon;
  _id: string;
  user: string;
  title: string;
  category: string;
  description: string;
  access: string;
  createdAt: string; // Assuming ISO 8601 format
}

const ActivityList = () => {
  const [data, setData] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    ActivityApi.getAllActivity().then((res) => {
      setData(res.data.docs);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteActivity = (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirm) return;

    ActivityApi.deleteActivity(id)
      .then(() => {
        fetchData();
        toast.success("Activity deleted successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong");
      });
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Activity List</h1>

        <Link to={"/create/activity"} className="inline-block">
          <button className="button">Add Activity</button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-4 h-full"
          >
            <img
              src={item.icon.url}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h2 className="text-xl font-bold mb-1">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>

            <div className="text-sm text-blue font-bold lowercase">
              {item.category}.{item.access}
            </div>

            <p className="text-gray-600 mb-2 text-xs mt-2">
              Created At: {new Date(item.createdAt).toLocaleString()}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => deleteActivity(item._id)}
                className="bg-red-500 text-white font-semibold p-2 px-4 rounded-lg"
                disabled
              >
                Delete
              </button>

              <button
                onClick={() => console.log("Edit")}
                className="bg-blue-500 text-white font-semibold p-2 px-4 rounded-lg"
                disabled
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="col-span-3 text-blue-400 font-bold">
            No activity found
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
