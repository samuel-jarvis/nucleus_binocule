import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRealWorldObjectResponse } from "./components/AllNucleus";
import { NucleusApi } from "../../api/nucleusApi";

const NucleusDetails = () => {
  const { id } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IRealWorldObjectResponse | null>(null);

  useEffect(() => {
    if (!id) return;

    NucleusApi.getNucleusById(id)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-black font-medium text-center my-8">Loading Nucleus</p>;
  }


  if (!data) {
    return <p className="text-black font-medium text-center my-8">No Data Found</p>;
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Title and Category */}
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{data.title}</h2>
          <p className="text-gray-600">{data.category} - {data.primaryNature}</p>
        </div>

        <div className="text-sm mb-4">
          Created by : <span className="text-blue-500 font-bold">{data.user.firstName} {data.user.lastName}</span>
        </div>

        {/* icon */}
        <div className="mb-4">
          <img src={data.icon.url} alt={`${data.title} Icon`} className="w-44 rounded-2xl object-contain" />
        </div>

        {/* Description */}
        {data.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">Description</h3>
            <p className="text-gray-700">{data.description}</p>
          </div>
        )}

        {/* General Information Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="block font-semibold text-gray-700 mb-1">Top Level Object</span>
            <p className="text-gray-700">{data.topLevelObject}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-700 mb-1">Parent Template</span>
            <p className="text-gray-700">{data.parentTemplate}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-700 mb-1">Mobility Type</span>
            <p className="text-gray-700">{data.mobilityType}</p>
          </div>
        </div>

        {/* Attributes and Parts -  using Tabs or Accordions can be good for many properties */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue mb-2">Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Attributes</h4>
              {data.attributes.length > 0 ? (
                <ul className="list-disc pl-5">
                  {data.attributes.map((attr, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold text-gray-700">{attr.label}:</span>{' '}
                      <span className="text-gray-600">{attr.value}</span>
                      {attr.type && <span className="text-gray-500 text-sm ml-1">({attr.type})</span>}
                      {attr.example && <p className="text-gray-500 text-xs mt-1">Example: {attr.example}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No attributes defined.</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Parts</h4>
              {data.parts.length > 0 ? (
                <ul className="list-disc pl-5">
                  {data.parts.map((part, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold text-gray-700">{part.label}:</span>{' '}
                      <span className="text-gray-600">{part.value}</span>
                      {part.type && <span className="text-gray-500 text-sm ml-1">({part.type})</span>}
                      {part.example && <p className="text-gray-500 text-xs mt-1">Example: {part.example}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No parts defined.</p>
              )}
            </div>
          </div>
        </div>

        {/* Associations */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue mb-2">Associations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(data.associations).map(([role, names]) => (
              <div key={role}>
                <h4 className="font-semibold text-gray-700 mb-2 capitalize">{role}</h4>
                {names.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {names.map((name, index) => (
                      <li key={index} className="text-gray-600">{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No {role} defined.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NucleusDetails