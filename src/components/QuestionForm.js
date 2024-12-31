import { useState, useEffect } from "react";
import { createQuestion, getAllLanguages } from "../service/axios";

const QuestionForm = () => {
  const [languages, setLanguages] = useState([]); // Store available languages
  const [selectedLanguage, setSelectedLanguage] = useState(""); // Store selected language
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    askedInCompany: "",
    content: "", // Text content with markers like #TEXT and #CODE
  });

  useEffect(() => {
    // Fetch the list of languages from the API when the component mounts
    getAllLanguages()
      .then((response) => {
        setLanguages(response); // Set languages from API response
      })
      .catch((error) => {
        console.error("Error fetching languages: ", error);
      });
  }, []);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); // Update selected language
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLanguage) {
      alert("Please select a language.");
      return;
    }

    // Convert the content in the text area to the required format for the backend
    const formattedContent = parseContent(newQuestion.content);

    const questionData = {
      ...newQuestion,
      content: formattedContent, // No need to stringify yet, we'll stringify it before sending
      language_id: selectedLanguage, // Ensure the correct language ID is passed
    };

    // Call API to create the new question for the selected language
    createQuestion(selectedLanguage, questionData)
      .then((response) => {
        // console.log("Successfully Added Question for " + selectedLanguage);
      })
      .catch((error) => {
        // console.error("Error creating question: ", error);
      });
  };

  // Function to parse content with markers #TEXT and #CODE
  const parseContent = (content) => {
    const contentArray = [];
    const lines = content.split("\n");

    let currentType = null;
    let currentValue = [];

    lines.forEach((line) => {
      if (line.startsWith("#TEXT")) {
        // Push the current content (if any) and reset
        if (currentType) {
          contentArray.push({ type: currentType, value: currentValue });
        }
        currentType = "text";
        currentValue = [line.replace("#TEXT", "").trim()];
      } else if (line.startsWith("#CODE")) {
        // Push the current content (if any) and reset
        if (currentType) {
          contentArray.push({ type: currentType, value: currentValue });
        }
        currentType = "code";
        currentValue = [line.replace("#CODE", "").trim()];
      } else {
        // Add the line to the current content
        currentValue.push(line.trim());
      }
    });

    // Push the last content block if any
    if (currentType) {
      contentArray.push({ type: currentType, value: currentValue });
    }

    // Convert array into a string in the required format
    return JSON.stringify(contentArray);
  };

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-secondary mb-4">Add a New Question</h3>

      <form onSubmit={handleSubmit}>
        {/* Language Dropdown */}
        <div className="mb-4">
          <label htmlFor="language" className="block text-white mb-2">
            Select Language
          </label>
          <select
            id="language"
            name="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            required
          >
            <option value="">Select a language</option>
            {languages.map((language) => (
              <option key={language.id} value={language.languageName}>
                {language.languageName}
              </option>
            ))}
          </select>
        </div>

        {/* Question Input */}
        <div className="mb-4">
          <label htmlFor="question" className="block text-white mb-2">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={newQuestion.question}
            onChange={handleInputChange}
            placeholder="Enter question"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            required
          />
        </div>

        {/* Company Input */}
        <div className="mb-4">
          <label htmlFor="askedInCompany" className="block text-white mb-2">
            Asked in Company (Optional)
          </label>
          <input
            type="text"
            id="askedInCompany"
            name="askedInCompany"
            value={newQuestion.askedInCompany}
            onChange={handleInputChange}
            placeholder="Company name"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>

        {/* Content Input (with #TEXT and #CODE markers) */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-white mb-2">
            Content (Text with #TEXT and #CODE markers)
          </label>
          <textarea
            id="content"
            name="content"
            value={newQuestion.content}
            onChange={handleInputChange}
            placeholder="Enter content with #TEXT and #CODE markers"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            rows="6"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
