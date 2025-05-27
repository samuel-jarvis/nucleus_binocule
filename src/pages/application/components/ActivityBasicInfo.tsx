export interface CreateActivity {
  title: string;
  category: string;
  description: string;
  access: "public" | "private";
}

type Props = {
  formData: CreateActivity;
  setFormData: (formData: CreateActivity) => void;
  setSelectedTab: (value: string) => void;
};

const CategoryList = [
  "Dining",
  "Shopping",
  "Entertainment",
  "Sports",
  "Education",
  "Healthcare",
  "Work",
  "Social Gathering",
  "Religious Worship",
  "Travel/Transit",
  "Recreation",
  "Fitness/Exercise",
  "Lodging",
  "Events/Exhibitions",
  "Personal Services",
  "Others",
];

const ActivityBasicInfo = ({
  formData,
  setFormData,
  setSelectedTab,
}: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">
        Create new Scape Activity
      </h1>

      <div>
        <h3 className="text-lg text-black">
          Make sure this activity doesn’t already exist.
        </h3>

        <div>
          <h3>Title</h3>

          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter title"
          />
        </div>

        <div className="mt-6">
          <h3>Category</h3>

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-2 rounded-lg border-2"
          >
            <option value="">Select category</option>
            {CategoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <h3>Description</h3>

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 rounded-lg border-2"
            placeholder="Enter description"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("visuals")}
          className="w-full p-2 rounded-lg bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActivityBasicInfo;
