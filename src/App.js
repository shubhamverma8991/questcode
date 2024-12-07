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
      <div className="bg-background h-full">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questions/:name" element={<LanguagePage />} />
          <Route path="/addlang" element={<CreateLanguageForm />} />
          <Route path="/addques" element={<QuestionForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
