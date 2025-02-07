/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { NucleusApi } from "../../../api/nucleusApi";
import { useNavigate } from "react-router-dom";

const SearchNucleus = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    console.log(searchInput);

    if (!searchInput.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    NucleusApi.getNucleus({
      query: searchInput,
    })
      .then((res) => {
        console.log(res);
        setSearchResults(res.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/object/${id}`);
  };

  return (
    <div>
      <div className="mt-4 flex items-center bg-[#f4f5f7] p-4 rounded-lg">
        <input
          type="text"
          className="w-full bg-transparent outline-none"
          placeholder="Search templates..."
          value={searchInput}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <div className="bg-white rounded-lg" onClick={handleSearch}>
          <IoIosSearch className="text-2xl text-gray-600 cursor-pointer" />
        </div>
      </div>

      <div className="mb-20">
        {
          loading && (
            <div className="mt-4 bg-[#f6f7f8] p-4 rounded-lg text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          )
        }
        {!loading && searchResults.length > 0 && searchResults.map((result) => (
          <div
            key={result._id}
            className="mt-4 flex justify-between items-center bg-[#f4f5f7] p-4 rounded-lg cursor-pointer"
            onClick={() => handleClick(result._id)}
          >
            <div className="flex items-center">
              <img
                className="w-10 h-10 mr-2 object-cover rounded-lg"
                src={result.icon.url}
                alt=""
              />

              <div>
                <h4 className="font-bold">{result.title}</h4>
                <p className="text-sm text-gray-600">
                  {result.objectDescription}
                </p>
                <div>
                  <p className="text-sm text-gray-600">
                    Category: {result.category}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-2 rounded-lg hidden">
                <IoIosSearch className="text-2xl text-blue-500 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}

        {!loading && searchResults.length === 0 && (
          <div className="mt-4 bg-[#f6f7f8] p-4 rounded-lg text-center">
            <p className="text-gray-600">No search results found</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchNucleus;
