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
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity List</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your real-world activities
          </p>
        </div>

        <Link to={"/create/activity"} className="inline-block">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Activity
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all p-5 flex flex-col h-full group"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={item.icon?.url}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-xl bg-gray-50 border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <h2
                  className="font-bold text-lg text-gray-900 leading-tight truncate"
                  title={item.title}
                >
                  {item.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold lowercase tracking-wide">
                    {item.category}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold lowercase tracking-wide ${item.access === "public" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    {item.access}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm flex-1 mb-4 line-clamp-3">
              {item.description || (
                <span className="text-gray-400 italic">
                  No description provided.
                </span>
              )}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
              <p className="text-gray-400 text-xs font-medium">
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <div className="flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => deleteActivity(item._id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors hidden"
                  title="Delete Activity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => openEditModal(item)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                  title="Edit Activity"
                >
                  <svg
                    className="w-4 h-4"
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
                </button>
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-500 font-medium">No activities found</p>
            <p className="text-gray-400 text-sm mt-1">
              Get started by creating a new activity.
            </p>
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
