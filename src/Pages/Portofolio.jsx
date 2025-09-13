import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function PortfolioPage() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [initialItems, setInitialItems] = useState(window.innerWidth < 768 ? 4 : 6);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setInitialItems(isMobile ? 4 : 6);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    AOS.init({ once: false });

    const loadData = async () => {
      setIsLoading(true);
      let fetchedProjects = [];
      let fetchedCertificates = [];

      try {
        const [projectsResponse, certificatesResponse] = await Promise.all([
          supabase.from("projects").select("*").order("id", { ascending: true }),
          supabase.from("certificates").select("*").order("id", { ascending: true }),
        ]);

        if (projectsResponse.error) throw projectsResponse.error;
        if (certificatesResponse.error) throw certificatesResponse.error;

        fetchedProjects = projectsResponse.data || [];
        fetchedCertificates = certificatesResponse.data || [];

        
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      } finally {
        const secureMediAccessProject = {
          id: 'secure-mediaccess',
          Title: 'Secure MediAccess',
          Description: 'Secure MediAccess is a privacy-focused healthcare system that empowers patients with full control over their medical records. It provides separate dashboards for doctors and patients, ensuring secure access to health data. Doctors can only view patient records after OTP-based real-time consent, giving patients complete authority over their data. The system ensures confidentiality through encrypted storage, secure authentication, and audit logging to track all access activities. This approach ensures data integrity, patient privacy, and regulatory compliance in healthcare record management.',
          Img: '/project1.png',
          Link: '#',
          Github: 'https://github.com/GtxDhruvil/Secure-MediAccess',
          TechStack: ['React.js', 'TailwindCSS', 'Node.js (Express.js)', 'PostgreSQL', 'JWT', 'OTP Verification', 'AWS S3 (Encrypted File Handling)'],
          Features: [
            'Role-Based Dashboards for doctors and patients.',
            'OTP-Based Consent before granting access to patient records.',
            'Encrypted Storage for medical files ensuring data privacy.',
            'Audit Logging to monitor and track access history.',
            'Secure Authentication with JWT and access control mechanisms.',
            'Patient-Centric Control to approve or revoke doctor access at any time.'
          ]
        };

        const insightSageProject = {
          id: 'insightsage',
          Title: 'InsightSage',
          Description: 'InsightSage is an AI-powered meeting assistant that transforms raw meeting audio into structured insights, summaries, and task assignments. It helps teams stay aligned by automatically generating transcripts, extracting key action items, and enabling interactive Q&A. With real-time tracking and an intuitive interface, InsightSage streamlines collaboration and reduces the time spent on post-meeting follow-ups. Designed for productivity, it bridges the gap between conversations and actionable outcomes.',
          Img: '/project2.png',
          Link: '#',
          Github: 'https://github.com/GtxDhruvil/InsightSage-main',
          TechStack: ['Streamlit', 'LangChain', 'Ollama', 'Whisper', 'FFmpeg', 'SMTP (Gmail)'],
          Features: [
            'Audio Processing: MP3 → WAV conversion, transcription, speaker diarization, multi-format outputs',
            'AI Analysis: Summarization, task extraction, customizable AI agent, interactive Q&A',
            'Task Management: Auto-assignment, email notifications, deadlines, participant management',
            'User Experience: Modern design, real-time progress tracking, chat interface, file browser & diagnostics'
          ]
        };

        const combinedProjects = [secureMediAccessProject, insightSageProject, ...fetchedProjects];
        setProjects(combinedProjects);
        setCertificates(fetchedCertificates);

        localStorage.setItem("projects", JSON.stringify(combinedProjects));
        localStorage.setItem("certificates", JSON.stringify(fetchedCertificates));

        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTabClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  const tabs = [
    { icon: Code, label: "Projects" },
    { icon: Award, label: "Certificates" },
    { icon: Boxes, label: "Tech Stack" },
  ];

  return (
    <div className="md:px-[10%] px-[5%] w-full pt-24 bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Discover my journey as a developer through hands-on projects, certifications, and the technologies I've mastered. Each tab reflects my dedication to learning and building impactful digital experiences.
        </p>
      </div>

      <div className="w-full">
        <div className="bg-transparent border border-white/10 rounded-2xl p-2 md:px-4">
          <div className="flex justify-between">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => handleTabClick(index)}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 ${activeIndex === index ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
          className="mt-4"
        >
          <SwiperSlide>
            <div className="p-4">
              {isLoading ? (
                <div className="text-center py-10 text-slate-400">Loading Projects...</div>
              ) : projects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {displayedProjects.map((project, index) => (
                      <div key={project.id || index} data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"} data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                        <CardProject Img={project.Img} Title={project.Title} Description={project.Description} Link={project.Link} id={project.id} />
                      </div>
                    ))}
                  </div>
                  {projects.length > initialItems && (
                    <div className="mt-6 w-full flex justify-start">
                      <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-10 text-slate-400">No projects found.</div>
              )}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div key={certificate.id || index} data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"} data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
              {certificates.length > initialItems && (
                <div className="mt-6 w-full flex justify-start">
                  <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
                </div>
              )}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div key={index} data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"} data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}