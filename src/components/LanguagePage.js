import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LuCopy } from "react-icons/lu";

const LanguagePage = () => {
  const { name } = useParams();
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

  // Fetch questions and pseudo-code dynamically (updated format)
  const questions = [
    {
      id: 3,
      question: "Explain the difference between `var`, `let`, and `const` in JavaScript.",
      content: [
        {
          type: "text",
          value: "`var` is function-scoped and can be redeclared, leading to potential issues with variable hoisting.",
        },
        {
          type: "text",
          value:
            "`let` and `const` are block-scoped. `let` allows reassignment, while `const` creates read-only constants that cannot be reassigned.",
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
          value: "Use `let` and `const` to ensure better scoping and avoid issues with variable redeclaration.",
        },
      ],
      askedInCompany: "TechCorp", // New field added
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
      askedInCompany: "CodeLabs", // New field added
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
      askedInCompany: "", // New field added
    },
  ];

  // Sorting questions by 'id' before rendering
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
                <div className="overflow-x-auto bg-gray-800 text-gray p-4 rounded-md relative">
                  <button
                    className="absolute top-2 right-2 bg-black text-white hover:scale-110 transition-transform px-2 py-1 rounded text-sm"
                    onClick={() => handleCopyCode(block.value)}
                    aria-label="Copy code"
                  >
                    <LuCopy />
                  </button>
                  <pre className="whitespace-pre-wrap break-words">{block.value.join("\n")}</pre>
                </div>
              )}
            </div>
          ))}
          {/* Displaying the askedInCompany field at the bottom */}
          {q.askedInCompany ? (
            <p className="text-sm text-gray-500 mt-4">
              Asked in: <span className="font-semibold">{q.askedInCompany}</span>
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-4"></p>
          )}
        </div>
      ))}
    </div>
  );
};

export default LanguagePage;
