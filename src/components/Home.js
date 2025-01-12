import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLanguages, getAllRoadMap } from "../service/axios";
import Loading from "./commonLogic/Loading";

const Home = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [roadMap, setRoadMap] = useState([]);
  const [langloading, setLangLoading] = useState(true);
  const [roadmaploading, setRoadMapLoading] = useState(true);

  useEffect(() => {
    getLanguage();
    getCourse();
  }, []);

  // Get All Language
  const getLanguage = () => {
    getAllLanguages()
      .then((data) => {
        setLanguages(data);
        // console.log("language ", data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLangLoading(false);
      });
  };

  // Get All Courses
  const getCourse = () => {
    getAllRoadMap()
      .then((data) => {
        setRoadMap(data);
        console.log("roadMap ", data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setRoadMapLoading(false);
      });
  };

  // Feature Box Component
  const FeatureBox = ({ title, description }) => (
    <div className="max-w-sm bg-card p-6 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold text-tertiary mb-2">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  );

  // Language Card Component
  const LanguageCard = ({ name, image }) => {
    const handleLanguageCardClick = (e) => {
      // console.log(`${name}`);
      navigate(`/${name.toLowerCase()}/options`);
    };
    return (
      <div className="cursor-pointer flex flex-col items-center bg-card  p-6 rounded-lg shadow-2xl w-40" onClick={handleLanguageCardClick}>
        <img src={image} alt={`${name} logo`} className="h-16 w-16 mb-4" />
        <h4 className="text-lg font-semibold text-secondary">{name}</h4>
      </div>
    );
  };

  // RoadMap Card Component
  const RoadMapCard = ({ name, image, description }) => {
    const handleRoadMapCardClick = (e) => {
      console.log(`roadmap+${name}`);
      alert("Work in Progress");
      // navigate(`/roadmap/${name.toLowerCase()}`);
    };
    return (
      <div
        className="cursor-pointer flex flex-col items-center bg-card  py-6 px-3 rounded-lg shadow-2xl w-48"
        onClick={handleRoadMapCardClick}
      >
        <img src={image} alt={`${name} logo`} className="h-16 w-16 mb-4" />
        <h4 className="text-lg text-center font-semibold text-orange-500">{name}</h4>
        <p className="mt-4 text-center text-xs text-gray-300">{description}</p>
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
    <div className=" min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-textPrimary mb-4">Master Programming with PrepQuest</h1>
        <p className="text-white max-w-xl">
          Dive into coding study materials, explore questions, answers, and pseudo-code crafted for clarity.
        </p>
        <button
          className="mt-6 bg-accent text-buttontext font-semibold px-6 py-3 rounded-md hover:bg-orange-600"
          onClick={scrollToLanguages}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-textPrimary mb-6">Why Choose PrepQuest?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <FeatureBox title="Comprehensive Materials" description="Questions, answers, and pseudo-code for deeper understanding." />
          <FeatureBox title="Language Variety" description="Learn from a wide range of programming languages." />
          <FeatureBox title="Clean & Intuitive" description="Dark-themed, user-friendly interface designed for focus." />
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages-section" className="py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-textPrimary mb-6">Explore Languages</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {langloading ? (
            <>
              <Loading />
              <p>Loading Languages Please Wait...</p>
            </>
          ) : (
            languages &&
            languages
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => <LanguageCard key={item.id} name={item.name} image={item.icon} />)
          )}
        </div>
      </section>

      {/* Road Map */}
      <section className="py-16 px-6" id="roadmap-section">
        <h2 className="text-2xl font-bold text-center text-textPrimary mb-6">RoadMap for Various Courses</h2>
        <p className="text-center mb-6 text-orange-700">***Work in Progress***</p>
        <div className="flex flex-wrap justify-center gap-8">
          {roadmaploading ? (
            <>
              <Loading />
              <p>Loading RoadMap Please Wait...</p>
            </>
          ) : (
            roadMap.length > 0 &&
            roadMap.map((item) => (
              <RoadMapCard key={item.id} name={item.coursename} image={item.courseicon} description={item.description} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
