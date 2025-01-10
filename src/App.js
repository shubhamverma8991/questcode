import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import QuestionAndAnswersPage from "./components/QuestionAndAnswersPage";
import ScrollToTop from "./components/commonLogic/ScrollToTop";
import CreateLanguageForm from "./components/CreateLanguageForm";
import QuestionForm from "./components/QuestionForm";
// import CodingQuestions from "./components/CodingQuestions";
import OptionsPage from "./components/commonLogic/OptionsPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name" element={<QuestionAndAnswersPage />} />
            <Route path="/:name/code" element={<QuestionAndAnswersPage />} />
            {/* <Route path="/:name/pseudocode" element={<QuestionAndAnswersPage />} /> */}
            <Route path="/:name/options" element={<OptionsPage />} />
            <Route path="/addlang" element={<CreateLanguageForm />} />
            <Route path="/addques" element={<QuestionForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
