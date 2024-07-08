import { useResultContext } from "../contexts/ResultContextProvider";

const Pagination = () => {
  const { results, startIndex, setStartIndex } = useResultContext();
  const activeStyles = "bg-blue-200 dark:bg-blue-800";
  const inactiveStyles =
    "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700";


  if(!results || results?.error?.status) return;

  return (
    <div className="flex justify-center items-end mt-10">
      {[...Array(10).keys()].map((num) => {
        const pageStartIndex = num * 10 + 1;
        return (
          <button
            key={num}
            className={`mr-2 w-8 rounded ${pageStartIndex === startIndex ? activeStyles : inactiveStyles}`}
            onClick={() => setStartIndex(pageStartIndex)}
            disabled={pageStartIndex === startIndex ? true : false}
          >
            {num + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
