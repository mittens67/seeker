import { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const BASE_URL = `https://www.googleapis.com/customsearch/v1`;
const apiKey = import.meta.env.VITE_API_KEY;
const cx = import.meta.env.VITE_CX; //The Search Engine ID (cx). This was created in Google API control panel

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(1);

  //searchType = image || searchTypeUndefined (web search)

  const getResults = async (term, searchType) => {
    setIsLoading(true);

    try {
      if (searchTerm) {
        const res = await fetch(
          `${BASE_URL}?key=${apiKey}&cx=${cx}&q=${term}&searchType=${searchType}&start=${startIndex}`
        );
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{
        getResults,
        results,
        searchTerm,
        setSearchTerm,
        isLoading,
        startIndex,
        setStartIndex,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
