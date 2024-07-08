import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";
import Message from "./Message";

const Results = () => {
  const {
    results,
    isLoading,
    getResults,
    searchTerm,
    startIndex,
    setStartIndex,
  } = useResultContext();

  const location = useLocation(); // this will give the URL , Ex: /images
  const resetPagination = useRef(false); // We are tracking this to reset pagination status

  useEffect(() => {
    //Path or search term has changed, reset pagination if it is not already 1
    
    if (startIndex !== 1) {
      resetPagination.current = true;
      setStartIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, searchTerm]);

  useEffect(() => {
    // this is to handle the after math of a pagination reset so new search can happen only after reset is complete
    resetPagination.current = false;
  }, [startIndex]);

  useEffect(() => {
    //perform search, this should happen if page is changed, or if path or search term changes (after pagination reset)
    if (searchTerm && !resetPagination.current) {
      if (location.pathname === "/search") {
        getResults(searchTerm, "searchTypeUndefined");
      } else if (location.pathname === "/images") {
        getResults(searchTerm, "image");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, location.pathname, startIndex]);

  if (isLoading) return <Loading />;

  if (!results || results?.error) return <Message />;

  switch (location.pathname) {
    case "/search":
      //Adding if here to prevent crash from rendering too fast
      if (!results?.queries?.request[0].searchType)
        return (
          <div className="flex flex-col justify-between space-y-6 sm:px-56">
            {results?.items?.map(({ link, title }, index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        );
      break;
    case "/images":
      //Adding if here to prevent crash from rendering too fast
      if (results?.queries?.request[0].searchType === "image")
        return (
          <div className="flex flex-wrap justify-center items-center">
            {results?.items?.map(({ image, title}, index) => (
              <a
                className="sm:p-3 p-5"
                href={image.contextLink}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={image.thumbnailLink}
                  alt={title}
                  loading="lazy"
                  className="rounded"
                />
                <p className="w-36 break-words text-sm font-semibold mt-2">
                  {title}
                </p>
              </a>
            ))}
          </div>
        );
      break;
    default:
      console.error("Something went wrong, we shouldn't be reaching here");
  }
};

export default Results;
