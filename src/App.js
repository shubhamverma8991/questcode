import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import LanguagePage from "./components/LanguagePage";
import ScrollToTop from "./components/commonLogic/ScrollToTop";
import CreateLanguageForm from "./components/CreateLanguageForm";
import QuestionForm from "./components/QuestionForm";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/questions/:name" element={<LanguagePage />} />
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
