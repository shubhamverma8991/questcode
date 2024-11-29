import { useEffect } from "react";
import { useParams } from "react-router-dom";

const LanguagePage = () => {
  const { name } = useParams();
  useEffect(() => {
    console.log(name);
  }, [name]);

  // Fetch questions and pseudo-code dynamically (hardcoded for now)
  const questions = [
    {
      id: 1,
      question: "What is a closure in JavaScript ?",
      answer: "A closure is the combination of a function bundled with its lexical environment.",
      pseudoCode: "function outer() { let x = 10; return function inner() { console.log(x); }; }",
    },
    {
      id: 2,
      question: "Explain promises in JavaScript ?",
      answer: "A promise is an object representing the eventual completion or failure of an asynchronous operation.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">{name.charAt(0).toUpperCase() + name.slice(1)} Questions & Answers</h1>
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-secondary mb-2">{q.question}</h3>
            <p className="text-white mb-4">{q.answer}</p>
            {q.pseudoCode && <pre className="bg-gray-800 text-gray p-4 rounded-md overflow-x-auto">{q.pseudoCode}</pre>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagePage;
