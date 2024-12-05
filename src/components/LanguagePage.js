import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { LuCopy } from "react-icons/lu";
import MonacoEditor from "@monaco-editor/react"; // Import Monaco Editor

const LanguagePage = () => {
  const { name } = useParams();
  const [editorHeight, setEditorHeight] = useState("200px");
  const editorRef = useRef(null);

  useEffect(() => {
    console.log(name);
  }, [name]);

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

  // Example of dynamically fetched questions
  const questions = [
    {
      id: 3,
      question: "Explain the difference between var, let, and const in JavaScript.",
      content: [
        {
          type: "text",
          value: "var is function-scoped and can be redeclared, leading to potential issues with variable hoisting.",
        },
        {
          type: "text",
          value:
            "let and const are block-scoped. let allows reassignment, while const creates read-only constants that cannot be reassigned.",
        },
        {
          type: "code",
          value: [
            "// Example demonstrating scope",
            "function testScope() {",
            "  if (true) {",
            "    var x = 1; // function-scoped",
            "    let y = 2; // block-scoped",
            "    const z = 3; // block-scoped",
            "  }",
            "  console.log(x); // 1",
            "  console.log(y); // ReferenceError: y is not defined",
            "  console.log(z); // ReferenceError: z is not defined",
            "} ",
          ],
        },
        {
          type: "text",
          value: "Use let and const to ensure better scoping and avoid issues with variable redeclaration.",
        },
      ],
      askedInCompany: "TechCorp",
      language: "javascript", // Language associated with the code block
    },
    {
      id: 2,
      question: "What is event delegation in JavaScript?",
      content: [
        {
          type: "text",
          value:
            "Event delegation is a technique in JavaScript where a single event listener is attached to a parent element to handle events for its child elements.",
        },
        {
          type: "code",
          value: [
            "document.getElementById('parent').addEventListener('click', (event) => {",
            "  if (event.target && event.target.matches('button.className')) {",
            "    console.log('Button clicked!');",
            "  }",
            "});",
          ],
        },
        {
          type: "text",
          value: "This approach improves performance and simplifies code by reducing the number of event listeners.",
        },
      ],
      askedInCompany: "CodeLabs",
      language: "javascript", // Language associated with the code block
    },
    {
      id: 1,
      question: "What is a closure in JavaScript?",
      content: [
        {
          type: "text",
          value: "A closure is the combination of a function bundled with its lexical environment.",
        },
        {
          type: "code",
          value: ["function outer() {", "  let x = 10;", "  return function inner() {", "    console.log(x);", "  };", "}"],
        },
        {
          type: "text",
          value: "Closures are commonly used in JavaScript for data hiding and creating private variables.",
        },
      ],
      askedInCompany: "",
      language: "javascript", // Language associated with the code block
    },
  ];

  const sortedQuestions = questions.sort((a, b) => a.id - b.id);

  return (
    <div className="space-y-6">
      {sortedQuestions.map((q) => (
        <div key={q.id} className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-secondary mb-2">
            {q.id}. {q.question}
          </h3>
          {q.content.map((block, index) => (
            <div key={index} className="mb-4">
              {block.type === "text" && <p className="text-white">{block.value}</p>}
              {block.type === "code" && (
                <div className="overflow-x-auto bg-gray-800 text-gray p-4 rounded-md relative" style={{ width: "100%" }}>
                  <button
                    className="absolute top-4 right-4 bg-black text-white hover:scale-110 transition-transform px-2 py-1 rounded text-sm z-10"
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
                    }}
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
      ))}
    </div>
  );
};

export default LanguagePage;
