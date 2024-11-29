import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  // Feature Box Component
  const FeatureBox = ({ title, description }) => (
    <div className="max-w-sm bg-card p-6 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold text-orange-500 mb-2">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  );

  // Language Card Component
  const LanguageCard = ({ name, image }) => {
    const handleLanguageCardClick = (e) => {
      console.log(`${name}`);
      navigate(`/questions/${name.toLowerCase()}`);
    };
    return (
      <div className="flex flex-col items-center bg-card  p-6 rounded-lg shadow-2xl w-40" onClick={handleLanguageCardClick}>
        <img src={image} alt={`${name} logo`} className="h-16 w-16 mb-4" />
        <h4 className="text-lg font-semibold text-orange-500">{name}</h4>
      </div>
    );
  };
  // Scroll to the languages section
  const scrollToLanguages = () => {
    const languagesSection = document.getElementById("languages-section");
    if (languagesSection) {
      languagesSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className=" text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-primary mb-4">Master Programming with PrepQuest</h1>
        <p className="text-white max-w-xl">
          Dive into coding study materials, explore questions, answers, and pseudo-code crafted for clarity.
        </p>
        <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600" onClick={scrollToLanguages}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Why Choose PrepQuest?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <FeatureBox title="Comprehensive Materials" description="Questions, answers, and pseudo-code for deeper understanding." />
          <FeatureBox title="Language Variety" description="Learn from a wide range of programming languages." />
          <FeatureBox title="Clean & Intuitive" description="Dark-themed, user-friendly interface designed for focus." />
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages-section" className="py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Explore Languages</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Replace with dynamic data later */}
          <LanguageCard name="JavaScript" image="/path-to-js-logo.png" />
          <LanguageCard name="Python" image="/path-to-python-logo.png" />
          <LanguageCard name="Java" image="/path-to-java-logo.png" />
          <LanguageCard name="C++" image="/path-to-cpp-logo.png" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
