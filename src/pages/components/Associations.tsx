import { toast } from 'react-toastify';
import { IRealWorldObject } from '../application/CreateRWO';
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
type Associations = {
  creator: string[];
  owner: string[];
  user: string[];
  inCharge: string[];
};

type AssociationsProps = {
  realWorldObject: IRealWorldObject & { associations: Associations };
  setRealWorldObject: (realWorldObject: IRealWorldObject & { associations: Associations }) => void;
  setSelectedTab: (value: string) => void;
};

const AssociationsList = [
  {
    key: "creator",
    label: "Creator",
    placeholder: "Creator",
  },
  {
    key: "owner",
    label: "Owner",
    placeholder: "Owner",
  },
  {
    key: "user",
    label: "User",
    placeholder: "User",
  },
  {
    key: "inCharge",
    label: "In Charge",
    placeholder: "In Charge",
  }
]

const Associations = ({ realWorldObject, setRealWorldObject, setSelectedTab }: AssociationsProps) => {
  const handleAddAssociation = (key: keyof Associations, value: string) => {
    if (!value.trim()) return;

    if (realWorldObject.associations[key].includes(value)) {
      toast.info("Association already exists");
      return
    }

    setRealWorldObject({
      ...realWorldObject,
      associations: {
        ...realWorldObject.associations,
        [key]: [...realWorldObject.associations[key], value],
      },
    });
  }

  const handleRemoveAssociation = (key: keyof Associations, value: string) => {
    setRealWorldObject({
      ...realWorldObject,
      associations: {
        ...realWorldObject.associations,
        [key]: realWorldObject.associations[key].filter((v: string) => v !== value),
      },
    });
  }

  const handleContinue = () => {
    if (realWorldObject.associations.creator.length === 0) {
      alert("Creator is required");
      return;
    }

    setSelectedTab("visuals");
  }

  return (
    <div className="p-4">
      <div className='mb-8'>
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="text-blue mr-1">
            + Add
          </span>
          Associations
        </h2>
        <p className="mt-4 text-lg">
          Create existing connect between objects and other objects in the real world
        </p>
      </div>

      <div className="space-y-4">
        {AssociationsList.map((association) => (
          <div key={association.key} className="rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{association.label}</h3>
            <div>
              <div
                className="flex items-center justify-between bg-[#F9F9F9] pr-2 rounded-lg"
              >
                <input
                  type="text"
                  placeholder={association.placeholder}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddAssociation(association.key as keyof Associations, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                  className="input border-none p-2 w-full bg-transparent outline-none"
                />

                <FaCirclePlus
                  onClick={() => {
                    const value = (document.getElementById(association.key) as HTMLInputElement).value;
                    handleAddAssociation(association.key as keyof Associations, value);
                  }
                  }
                  className="text-blue cursor-pointer"
                />
              </div>

              <div className="flex flex-wrap mt-2 gap-2">
                {realWorldObject.associations[association.key as keyof Associations].map((value) => (
                  <div key={value} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span className='text-gray-800 mr-2'>{value}</span>
                    <FaCircleMinus
                      onClick={() => handleRemoveAssociation(association.key as keyof Associations, value)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mt-6">
          <button
            onClick={() => handleContinue()}
            className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
          >
            Continue
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setSelectedTab("parts")}
            className="bg-white text-primary p-2 px-4 rounded-lg block w-full"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Associations