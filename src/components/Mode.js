import { useState, useEffect } from "react";

const Mode = () => {
  const [mode, setMode] = useState(true);

  const pickMode = () => {
    setMode(!mode);
    console.log(mode);
  };

  useEffect(() => {
    if (!mode) {
      document.getElementById("bg").style.backgroundImage =
        "linear-gradient(180deg,var(--lightPink) 60%, var(--pink))";
      document.documentElement.style.color = "var(--darkBlue)";
      document.getElementById("exwa").classList.remove("label");
      document.getElementById("exwa").classList.add("darkLabel");
      document.getElementById("comp").classList.remove("label");
      document.getElementById("comp").classList.add("darkLabel");
      document.getElementById("ind").classList.remove("label");
      document.getElementById("ind").classList.add("darkLabel");
      document.getElementById("theme").classList.remove("slider");
      document.getElementById("theme").classList.add("darkSlider");
      document.getElementById("selectFiat").classList.remove("lightFiat");
      document.getElementById("selectFiat").classList.add("darkFiat");
    } else {
      document.getElementById("bg").style = "initial";
      document.documentElement.style.color = "var(--white)";
      document.getElementById("exwa").classList.remove("darkLabel");
      document.getElementById("exwa").classList.add("label");
      document.getElementById("comp").classList.remove("darkLabel");
      document.getElementById("comp").classList.add("label");
      document.getElementById("ind").classList.remove("darkLabel");
      document.getElementById("ind").classList.add("label");
      document.getElementById("theme").classList.remove("darkSlider");
      document.getElementById("theme").classList.add("slider");
      document.getElementById("selectFiat").classList.remove("darkFiat");
      document.getElementById("selectFiat").classList.add("lightFiat");
    }
  }, [mode]);

  return (
    <div id="mode">
      <p id="modeLabel"></p>
      <label className="switch">
        <input type="checkbox" onClick={pickMode}></input>
        <span className="slider" id="theme"></span>
      </label>
    </div>
  );
};

export default Mode;
