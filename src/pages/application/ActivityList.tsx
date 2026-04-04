import { useEffect, useState } from "react";
import ActivityApi from "../../api/activityApi";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

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

interface IActivityForm {
  title: string;
  category: string;
  description: string;
  access: "public" | "private";
}

const ActivityList = () => {
  const [data, setData] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [updating, setUpdating] = useState(false);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState("");
  const [editForm, setEditForm] = useState<IActivityForm>({
    title: "",
    category: "",
    description: "",
    access: "public",
  });

  const fetchData = async () => {
    setLoading(true);
    ActivityApi.getAllActivity()
      .then((res) => {
        setData(res.data.docs || []);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Failed to fetch activities",
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteActivity = (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!confirm) return;

    ActivityApi.deleteActivity(id)
      .then(() => {
        fetchData();
        toast.success("Activity deleted successfully");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  const openEditModal = (activity: IActivity) => {
    setEditingId(activity._id);
    setEditForm({
      title: activity.title,
      category: activity.category,
      description: activity.description || "",
      access: (activity.access as "public" | "private") || "public",
    });
    setEditFile(null);
    setEditImagePreview(activity.icon?.url || "");
    setEditModalOpen(true);
  };

  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setEditFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setEditImagePreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const updateActivity = () => {
    if (!editingId) return;
    if (!editForm.title || !editForm.category) {
      toast.error("Title and category are required");
      return;
    }

    setUpdating(true);
    const payload = new FormData();
    payload.append("title", editForm.title);
    payload.append("category", editForm.category);
    payload.append("description", editForm.description);
    payload.append("access", editForm.access);
    if (editFile) {
      payload.append("file", editFile);
    }

    ActivityApi.updateActivity(editingId, payload)
      .then(() => {
        setUpdating(false);
        setEditModalOpen(false);
        toast.success("Activity updated successfully");
        fetchData();
      })
      .catch((err) => {
        setUpdating(false);
        toast.error(
          err?.response?.data?.message || "Failed to update activity",
        );
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-2">
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
            <h2 className="font-bold mb-1">{item.title}</h2>
            <p className="text-gray-600 text-sm mb-1">{item.description}</p>

            <div className="text-sm text-blue font-bold lowercase">
              {item.category}.{item.access}
            </div>

            <p className="text-gray-600 mb-2 text-xs mt-2">
              Created At: {new Date(item.createdAt).toLocaleString()}
            </p>

            <div className="flex justify-between text-sm mt-4">
              <button
                onClick={() => deleteActivity(item._id)}
                className="bg-red-500 text-white font-semibold p-2 px-4 rounded-lg hidden"
                disabled
              >
                Delete
              </button>

              <button
                onClick={() => openEditModal(item)}
                className="bg-blue-500 text-white font-semibold p-2 px-4 rounded-lg"
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

      <AlertDialog.Root open={editModalOpen} onOpenChange={setEditModalOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-[700px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
            <AlertDialog.Title className="text-xl font-semibold">
              Edit Activity
            </AlertDialog.Title>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Category</label>
              <input
                type="text"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Access</label>
              <select
                value={editForm.access}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    access: e.target.value as "public" | "private",
                  }))
                }
                className="w-full p-2 rounded-lg border-2"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Icon</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleEditFileChange}
                className="w-full p-2 rounded-lg border-2"
              />
            </div>

            {editImagePreview && (
              <div className="mt-4">
                <img
                  src={editImagePreview}
                  alt="activity"
                  className="h-40 w-auto rounded-lg object-cover"
                />
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                onClick={updateActivity}
                className="black_button w-full"
                disabled={updating}
              >
                {updating ? "Saving..." : "Save"}
              </button>
              <AlertDialog.Cancel asChild>
                <button className="bg-white text-black border p-2 px-4 rounded-lg w-full">
                  Cancel
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default ActivityList;
