import React, { useState } from "react";
import { createLanguage } from "../service/axios";

const CreateLanguageForm = () => {
  const [languageName, setLanguageName] = useState("");
  const [languageIcon, setLanguageIcon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLanguage = { languageName, languageIcon };

    createLanguage(newLanguage)
      .then(() => {
        // Handle success (e.g., show a success message, reset form)
        alert("Language created successfully!");
      })
      .catch((err) => {
        // Handle error
        alert("Error creating language");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={languageName} onChange={(e) => setLanguageName(e.target.value)} placeholder="Language Name" />
      <input type="text" value={languageIcon} onChange={(e) => setLanguageIcon(e.target.value)} placeholder="Language Icon URL" />
      <button type="submit">Create Language</button>
    </form>
  );
};

export default CreateLanguageForm;
