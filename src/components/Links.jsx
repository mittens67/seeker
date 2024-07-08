import { NavLink, useLocation } from "react-router-dom";

const links = [
  {
    url: "/search",
    text: "Web Search ",
  },
  {
    url: "/images",
    text: "Images",
  },
];


const Links = () => {
  const location = useLocation();

  
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ url, text }, index) => (
        <NavLink
          key={index}
          className={
            location.pathname === url
              ? "text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2 m-2 mb-0"
              : "m-2 mb-0"
          }
          to={url}
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default Links;
