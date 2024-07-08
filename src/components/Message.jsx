import { useResultContext } from "../contexts/ResultContextProvider";

const Message = () => {
  const { results } = useResultContext();
  let message = "";

  if (!results) {
    message = `Your search results will appear here`;
  } else {
    switch (results?.error?.status) {
      case "RESOURCE_EXHAUSTED":
        message = `This App is using a free API with a 100 calls per day limit, and it looks like we've hit that mark.
                Try again tomorrow.`;
        break;
      default:
        message = `Uh oh! This is awkward. Something unexpected just happened.
                Error status: ${results.error.status}`;
    }
  }

  return (
    <div className="flex justify-center items-center h-80 dark:text-gray-50">
      <p>{message}</p>
    </div>
  );
};

export default Message;
