/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NucleusApi } from "../../../api/nucleusApi";
import { FaMinus } from "react-icons/fa6";

type NucleusItem = {
  _id: string;
  title: string;
  category?: string;
  icon?: {
    url?: string;
  };
};

type Props = {
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  onSelectedItemsChange?: (items: NucleusItem[]) => void;
};

const MultiFilterSearchInput = ({ selectedIds, setSelectedIds, onSelectedItemsChange }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<NucleusItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<NucleusItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (onSelectedItemsChange) {
      onSelectedItemsChange(selectedItems);
    }
  }, [selectedItems, onSelectedItemsChange]);

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      NucleusApi.getNucleus({
        searchQuery: searchInput,
      })
        .then((res) => {
          setSearchResults(res.docs || []);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleSelect = (result: NucleusItem) => {
    if (selectedIds.includes(result._id)) {
      return;
    }

    setSelectedIds([...selectedIds, result._id]);
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item._id === result._id);
      if (exists) return prev;
      return [...prev, result];
    });
    setSearchInput("");
    setSearchResults([]);
  };

  const handleRemove = (id: string) => {
    setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    setSelectedItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div>
      <input
        className="w-full p-2 rounded-lg border-2"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search objects to add"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {selectedIds.map((id) => {
          const item = selectedItems.find((selected) => selected._id === id);
          const label = item?.title || id;
          return (
            <div
              key={id}
              className="flex items-center gap-2 bg-[#f4f5f7] border rounded-lg px-3 py-1"
            >
              <span className="text-sm">{label}</span>
              <button
                type="button"
                className="text-red-700"
                onClick={() => handleRemove(id)}
              >
                <FaMinus />
              </button>
            </div>
          );
        })}
      </div>

      {!loading &&
        searchResults.map((result) => (
          <div
            key={result._id}
            className="mt-4 flex justify-between items-center bg-[#f4f5f7] p-4 rounded-lg cursor-pointer"
            onClick={() => handleSelect(result)}
          >
            <div className="flex items-center">
              <img
                className="object-cover mr-2 w-10 h-10 rounded-lg"
                src={result.icon?.url || ""}
                alt=""
              />

              <div>
                <h4 className="font-bold">{result.title}</h4>
                <p className="text-sm text-gray-600">Category: {result.category}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MultiFilterSearchInput;
