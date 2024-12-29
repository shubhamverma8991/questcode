import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCodingQuestionsByLanguage } from "../service/axios";
import Loading from "./commonLogic/Loading";
import DOMPurify from "dompurify"; // Import DOMPurify
import { MdOutlineContentCopy } from "react-icons/md";

const CodingQuestions = () => {
  const { name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 0; // Default to 0 if not present
  const [page, setPage] = useState(initialPage);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use ref to store references for each code block dynamically
  const codeBlockRefs = useRef({});

  useEffect(() => {
    // Fetch questions dynamically for the specified language
    getCodingQuestionsByLanguage(name, page, 10) // Pass page and size to the API call
      .then((apiResponse) => {
        if (apiResponse.data.length > 0) {
          console.log(apiResponse.data);
          setQuestions(apiResponse.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name, page]); // Add page and size to the dependency array

  useEffect(() => {
    // Update the URL with the current page number
    navigate(`/codequestions/${name}?page=${page}`);
  }, [name, page, navigate]);

  // Clipboard function directly inside the component
  const copyToClipboard = (id, codeIndex) => {
    const codeElement = codeBlockRefs.current[`${id}-${codeIndex}`]; // Accessing ref for the specific code block
    if (codeElement) {
      const codeText = codeElement.innerText; // Get the code text directly
      navigator.clipboard
        .writeText(codeText)
        .then(() => alert("Code copied to clipboard!"))
        .catch(() => alert("Failed to copy code."));
    } else {
      alert("Element not found. Unable to copy code.");
    }
  };

  // Function to render multiple code blocks and their respective Copy buttons
  const renderContent = (content, id) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    // Split content into separate code blocks if there are multiple
    const codeBlocks = sanitizedContent.split(/(<code[^>]*>.*?<\/code>)/g).filter(Boolean);

    return (
      <div>
        {codeBlocks.map((block, index) => {
          // Render each code block
          const isCodeBlock = block.startsWith("<code");
          const key = `${id}-${index}`;

          return (
            <div key={key}>
              {isCodeBlock ? (
                <div ref={(el) => (codeBlockRefs.current[key] = el)} className="codeblock">
                  <div dangerouslySetInnerHTML={{ __html: block }} />
                  <button
                    className="clipboard-button"
                    onClick={() => copyToClipboard(id, index)} // Pass question id and code index
                  >
                    <MdOutlineContentCopy />
                  </button>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: block }} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return <Loading fullScreen={true} />; // Full-screen loading
  }

  return (
    <div className="space-y-6">
      <h2 className="text-center text-3xl mt-3 mb-3 text-secondary font-bold">{name.toUpperCase()} Coding Questions</h2>
      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q.id} className="bg-card p-6 max-sm:px-3 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-secondary mb-2">
              {q.id}. {q.question}
            </h3>
            <div className="code-container">{renderContent(q.content, q.id)}</div>
            {q.askedInCompany && (
              <p className="text-sm text-gray-500 mt-4">
                Asked in: <span className="font-semibold">{q.askedInCompany}</span>
              </p>
            )}
          </div>
        ))
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center", color: "orange" }}>
            {name.toUpperCase()} Questions are being collected and will be uploaded soon. Stay tuned!
          </h1>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className={`bg-primary text-black font-bold py-2 px-4 rounded-lg mx-2 transition duration-300 
                      ${page === 0 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-primary font-bold text-black py-2 px-4 rounded-lg mx-2 transition duration-300 hover:bg-black hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CodingQuestions;
