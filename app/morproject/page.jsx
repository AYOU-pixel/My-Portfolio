"use client";

import { useState, useMemo, useEffect, memo } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Eye, Search, ArrowUp } from "lucide-react";

// Custom hook for scroll position
const useScrollPosition = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return showScrollTop;
};

// Projects data
const projects = [
  {
    id: 1, // Changed from 5 to 1
    title: "E-commerce Website",
    description: "A high-performance, secure, and feature-rich e-commerce frontend built using Next.js 14 and Tailwind CSS. It offers dynamic product browsing, an interactive cart system, responsive checkout flow, and seamless user experience with support for authentication, loyalty system, and optimized UI components.",
    image: "/clothing.webp",
    link: "https://clothing-website-psi-ten.vercel.app/", 
    category: "E-commerce",
    tech: ["Next.js 14", "Tailwind CSS", "Vite"]
  },
  {
    id: 2,
    title: "Sneaker Store",
    description: "Sleek e-commerce website for sneakers with smooth shopping experience, customer reviews, and real-time inventory tracking.",
    image: "/eco.webp",
    link: "https://ecomerc-wm.vercel.app/",
    category: "e-commerce",
    tech: ["React", "Redux", "Node.js"]
  },
  {
    id: 4,
    title: "Weather App",
    description: "A weather app built with React and Next.js efficiently retrieves and displays real-time weather data. It leverages Next.js for optimized performance.",
    image: "/weather.webp",
    link: "https://weather-app-navy-sigma-78.vercel.app/",
    category: "utility",
    tech: ["React", "Next.js", "Weather API"]
  }
];

// Memoized ProjectCard component to prevent re-renders
const ProjectCard = memo(({ project }) => {
  const [ref, inView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '100px 0px'
  });

  const handleImageError = (e) => {
    e.currentTarget.src = '/fallback-project.png';
  };

  return (
    <div
      ref={ref}
      className={`h-full opacity-0 ${inView ? 'animate-fadeIn opacity-100' : ''}`}
    >
      <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl border border-sky-400/15 transition-all duration-300 h-full flex flex-col overflow-hidden hover:translate-y-[-8px] hover:border-sky-400/40 hover:shadow-xl hover:shadow-sky-400/20">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // Define responsive sizes
            className="object-cover object-center-top transition-transform duration-500 hover:scale-105"
            loading="lazy" // Lazy load images for better performance
            quality={80} // Adjust quality for performance
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 pointer-events-none" />
        </div>

        <div className="flex-grow p-6">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-slate-200 font-bold mb-4 text-2xl md:text-[1.75rem] tracking-tight leading-tight">
            {project.title}
          </h2>
          
          <p className="text-slate-300 leading-relaxed text-[0.95rem]">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 my-3">
            {project.tech.map((tech, index) => (
              <span key={index} className="bg-sky-400/15 text-slate-400 text-xs font-medium py-1 px-2 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0 text-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 rounded-lg px-6 py-3 font-semibold text-white text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-sky-500/30"
          >
            <Eye size={18} />
            View Project
          </a>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Filter buttons component
const CategoryFilter = memo(({ selectedCategory, onChange }) => {
  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'e-commerce', label: 'E-Commerce' },
    { value: 'personal', label: 'Personal' },
    { value: 'utility', label: 'Utility' },
    { value: 'corporate', label: 'Corporate' },
  ];

  return (
    <div className="flex flex-wrap gap-2 bg-slate-900/60 rounded-lg p-1">
      {categories.map(category => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === category.value 
              ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white' 
              : 'text-slate-200 hover:bg-sky-400/20'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

// Search component
const SearchInput = memo(({ onChange }) => {
  return (
    <div className="relative w-full sm:max-w-xs">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-slate-400" />
      </div>
      <input
        type="text"
        className="w-full bg-slate-900/60 border border-sky-400/30 text-slate-200 text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 p-2.5 pl-10 placeholder-slate-400"
        placeholder="Search projects..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

// Main component
const MoreProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const showScrollTop = useScrollPosition();

  // Memoize filtered projects for performance
  const filteredProjects = useMemo(() => 
    projects.filter(project => 
      (selectedCategory === 'all' || project.category === selectedCategory) &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       project.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [selectedCategory, searchQuery]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 bg-fixed overflow-hidden">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'url("/grid.svg")', backgroundSize: 'cover' }}
      />
      
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-slate-200 font-extrabold text-4xl sm:text-5xl md:text-6xl mb-6 tracking-tight leading-tight">
            My Complete Projects
          </h1>
          
          <p className="text-slate-100 text-base md:text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed px-4 md:px-0">
            Explore detailed case studies of my work, including GitHub repositories 
            and live deployment links. Each project showcases different skills and technologies.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-4 mb-12">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onChange={(value) => setSelectedCategory(value)} 
          />
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-slate-400 text-xl mb-2">No projects found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-10 bg-gradient-to-r from-sky-400 to-sky-500 p-3 rounded-full shadow-lg animate-glow hover:from-sky-500 hover:to-sky-600 transition-all duration-300"
          aria-label="scroll to top"
        >
          <ArrowUp size={24} className="text-white" />
        </button>
      )}

      {/* Add required CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(56, 189, 248, 0.5); }
          50% { box-shadow: 0 0 15px rgba(56, 189, 248, 0.8); }
          100% { box-shadow: 0 0 5px rgba(56, 189, 248, 0.5); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        
        .animate-glow {
          animation: glow 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default MoreProjects;