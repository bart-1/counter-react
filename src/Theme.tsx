import React, { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    theme
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.setAttribute("data-theme", "light");
  }, [theme]);
  return (
    <button onClick={() => setTheme((prevState) => !prevState)}>
      {theme ? "Dark" : "Light"}
    </button>
  );
};

export default Theme;
