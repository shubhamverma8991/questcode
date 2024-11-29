import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="bg-background h-full">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
