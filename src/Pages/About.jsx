import React, { useEffect, memo, useMemo } from "react";
import { Link } from 'react-router-dom';
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center items-center p-4" data-aos="fade-up" data-aos-duration="1000">
    <img
      src="/photo1.jpg"
      alt="Profile"
      className="w-72 h-72 sm:w-80 sm:h-80 rounded-full object-cover shadow-2xl shadow-purple-500/40" style={{ objectPosition: 'center 30%' }}
      loading="lazy"
    />
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
        >
          {value}
        </span>
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">{label}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { totalProjects, totalCertificates } = useMemo(() => {
    return {
      totalProjects: 2,
      totalCertificates: 4,
      // YearExperience: 0,
    };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: false });
    };
    initAOS();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    // {
    //   icon: Globe,
    //   color: "from-[#6366f1] to-[#a855f7]",
    //   value: YearExperience,
    //   label: "Years of Experience",
    //   description: "Continuous learning journey",
    //   animation: "fade-left",
    // },
  ], [totalProjects, totalCertificates]);

  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] pt-32" id="About">
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-gray-200">Dhruvil Patel</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0" data-aos="fade-right" data-aos-duration="1500">
              I am currently pursuing a Bachelor of Technology in Computer Engineering at Sarvajanik College 
              of Engineering and Technology, now in my final year. With a strong foundation in both 
              frontend and backend development, I enjoy exploring modern technologies to solve 
              real-world challenges. Beyond academics, I’ve worked on diverse projects that 
              combine functionality with design, helping me sharpen my problem-solving and 
              product-building skills. I’m always eager to learn, grow, and contribute to 
              impactful digital solutions.
            </p>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-4">
              <a href="https://github.com/GtxDhruvil" target="_blank" rel="noreferrer">
                <button className="sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
                  <FileText className="w-5 h-5" /> View GitHub
                </button>
              </a>
              <Link to="/portfolio">
                <button className="sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 hover:bg-[#a855f7]/10">
                  <Code className="w-5 h-5" /> View Projects
                </button>
              </Link>
            </div>
          </div>

          <ProfileImage />
        </div>

        <Link to="/portfolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default memo(AboutPage);