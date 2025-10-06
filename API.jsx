// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // For styling flags

const initialText = {
  heading: "Hello! This is the index page.",
  button: "This is button",
  inputPlaceholder: "Input your name",
  paragraph: "This is a sample paragraph."
};

const languages = [
  { code: "en", name: "English", flag: "/flags/us.png" },
  { code: "fa", name: "Persian", flag: "/flags/af.png" },
  { code: "ps", name: "Pashto", flag: "/flags/af.png" },
  { code: "fr", name: "French", flag: "/flags/fr.png" },
  { code: "tr", name: "Turkish", flag: "/flags/tr.png" }
];

function App() {
  const [text, setText] = useState(initialText);
  const [currentLang, setCurrentLang] = useState("en");
  const [loading, setLoading] = useState(false);

  const translatePage = async (lang) => {
    setLoading(true);
    const newText = {};
    for (const key in initialText) {
      try {
        const res = await axios.post("http://localhost:3001/api/translate", {
          text: initialText[key],
          target: lang
        });
        newText[key] = res.data.translatedText;
      } catch (err) {
        console.error(err);
        newText[key] = initialText[key]; // fallback
      }
    }
    setText(newText);
    setCurrentLang(lang);
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="language-selector">
        <select
          value={currentLang}
          onChange={(e) => translatePage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <h1>{text.heading}</h1>
      <p>{text.paragraph}</p>
      <input placeholder={text.inputPlaceholder} />
      <button>{text.button}</button>

      {loading && <p>Translating...</p>}
    </div>
  );
}

export default App;
