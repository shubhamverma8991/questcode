import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { LuCopy } from "react-icons/lu";
import MonacoEditor from "@monaco-editor/react"; // Import Monaco Editor
import { getQuestionsByLanguage } from "../service/axios";

const LanguagePage = () => {
  const { name } = useParams(); // `name` is the language name from URL
  const [editorHeight, setEditorHeight] = useState("200px");
  const [questions, setQuestions] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    // Fetch questions dynamically for the specified language
    getQuestionsByLanguage(name)
      .then((apiResponse) => {
        // Parse the content to JSON
        const parsedQuestions = apiResponse.map((q) => ({
          ...q,
          content: JSON.parse(q.content), // Parse the content string into an array of blocks
        }));
        setQuestions(parsedQuestions);
        console.log("questions ", parsedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions: ", error);
      });
  }, [name]); // Dependency array to re-fetch when language name changes

  const handleCopyCode = (code) => {
    const codeString = code.join("\n");
    navigator.clipboard
      .writeText(codeString)
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy code: ", err));
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.layout(); // Ensure Monaco layout is recalculated after mounting
    resizeEditor(editor.getValue()); // Initial resize based on editor content
  };

  const resizeEditor = (content) => {
    const lineCount = content.split("\n").length;
    const lineHeight = 20;
    const newHeight = lineCount * lineHeight;
    setEditorHeight(`${Math.max(newHeight + 40, 200)}px`); // Ensure minimum height of 200px
  };

  const sortedQuestions = questions.sort((a, b) => a.id - b.id);

  return (
    <div className="space-y-6">
      {sortedQuestions.length > 0 ? (
        sortedQuestions.map((q) => (
          <div key={q.id} className="bg-card p-6 max-sm:px-3 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-secondary mb-2">
              {q.id}. {q.question}
            </h3>
            {q.content.map((block, index) => (
              <div key={index} className="mb-4">
                {block.type === "text" && <p className="text-white">{block.value}</p>}
                {block.type === "code" && (
                  <div className="overflow-x-auto bg-gray-800 text-gray p-4 max-sm:p-2 rounded-md relative" style={{ width: "100%" }}>
                    <button
                      className="absolute top-4 right-4 max-sm:top-3 max-sm:right-3 bg-black text-white hover:scale-110 transition-transform px-2 py-1 rounded text-sm z-10"
                      onClick={() => handleCopyCode(block.value)}
                      aria-label="Copy code"
                    >
                      <LuCopy />
                    </button>
                    <MonacoEditor
                      height={editorHeight}
                      language={q.language}
                      value={block.value.join("\n")}
                      editorDidMount={handleEditorDidMount}
                      onChange={(value) => resizeEditor(value)} // Resize on content change
                      options={{
                        theme: "vs-dark",
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false, // Prevent the editor from scrolling past the last line
                        wordWrap: "on", // Enable word wrap to format code based on screen size
                        wrappingIndent: "same", // Ensure consistent indentation when wrapping occurs
                      }}
                      style={{ backgroundColor: "#1e1e1e", color: "white" }}
                    />
                  </div>
                )}
              </div>
            ))}
            {q.askedInCompany && (
              <p className="text-sm text-gray-500 mt-4">
                Asked in: <span className="font-semibold">{q.askedInCompany}</span>
              </p>
            )}
          </div>
        ))
      ) : (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ textAlign: "center", color: "orange" }}>
            {name.toUpperCase()} Questions are being collected and will be uploaded soon. Stay tuned!
          </h1>
        </div>
      )}
    </div>
  );
};

export default LanguagePage;
