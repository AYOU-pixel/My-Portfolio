"use client";

import { useMemo } from "react";
import { Button, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Github } from "lucide-react";
import Link from "next/link";

// Project data - moved outside component to prevent re-creation
const PROJECTS = [
  {
    id: 1,
    title: "Online Food Delivery Page",
    description: "Responsive food delivery website with user-friendly interface, real-time order tracking, and secure payment integration.",
    image: "/Delevry.png",
    link: "https://food-delivery-page-sandy.vercel.app/",
    github: "https://github.com/AYOU-pixel/Food-Delivery-Page",
    tech: ["Next.js", "TailwindCSS", "Stripe","Vite"]
  },
  {
    id: 2,
    title: "Sneaker Store",
    description: "Sleek e-commerce website for sneakers with smooth shopping experience, product filtering, and wishlist functionality.",
    image: "/eco.png",
    link: "https://ecomerc-wm.vercel.app/",
    github: "https://github.com/AYOU-pixel/ecomerc_wm",
    tech: ["React", "Redux", "Node.js"]
  },
  {
    id: 3,
    title: "Weather App",
    description: "Real-time weather application with location detection, 5-day forecast, and interactive weather maps using OpenWeather API.",
    image: "/weather.png",
    link: "https://weather-app-navy-sigma-78.vercel.app/",
    github: "https://github.com/AYOU-pixel/Weather-App",
    tech: ["React", "Next.js", "Weather API"]
  },
  {
    id: 4,
    title: "Shell Landing Page",
    description: "Multilingual landing page for Shell with responsive design, smooth animations, and language switching capabilities.",
    image: "/shelanding.png",
    link: "https://landing-page-ashen-seven-88.vercel.app/",
    github: "https://github.com/username/shell-landing",
    tech: ["Next.js", "i18n", "GSAP"]
  },
  {
    id: 5,
    title: "Apple Landing Page",
    description: "Modern product showcase page with sleek animations, product carousel, and responsive design for all devices.",
    image: "/Applepage.png",
    link: "https://apple-page-dusky.vercel.app/",
    github: "https://github.com/AYOU-pixel/Apple-page",
    tech: ["Framer Motion", "Next.js","Vite"]
  },
  {
    id: 6,
    title: "Food Delivery Landing Page",
    description: "A modern food delivery landing page with responsive design, smooth animations, restaurant showcase, and intuitive UI for seamless ordering experience on all devices.",
    image: "/landingDelevry.png",
    link: "https://delivery-page-black.vercel.app/",
    github: "https://github.com/AYOU-pixel/Delivery-Page",
    tech: ["Next.js", "TailwindCSS", "Stripe","Vite"]
  }
];

// Animation variants - defined once for reuse
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const pulse = {
  animate: {
    y: [0, 10, 0],
    transition: { repeat: Infinity, duration: 1.5 }
  }
};

// Styled components with improved performance
const SectionWrapper = styled("section")(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  padding: "6rem 0",
  background: `
    linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.98) 0%,
      rgba(15, 23, 42, 0.95) 40%,
      rgba(30, 58, 138, 0.9) 100%
    ),
    url('/grid.svg')
  `,
  backgroundSize: "cover",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.down('md')]: {
    padding: "4rem 0",
  },
}));

const StyledCard = styled(Card)({
  background: "rgba(15, 23, 42, 0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  border: "1px solid rgba(34, 211, 238, 0.15)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 32px rgba(34, 211, 238, 0.2)",
    border: "1px solid rgba(34, 211, 238, 0.3)",
  },
});

const TitleText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  fontWeight: 800,
  fontSize: "2.75rem",
  marginBottom: "1rem",
  [theme.breakpoints.down('md')]: {
    fontSize: "2.25rem",
  },
}));

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative", 
  height: "220px", 
  overflow: "hidden",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  [theme.breakpoints.down('sm')]: {
    height: "180px",
  },
}));

const TechChipContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "12px",
  marginBottom: "16px",
});

const TechChip = styled(motion.span)({
  background: "rgba(8, 145, 178, 0.3)",
  color: "#e0f2fe",
  fontSize: "0.75rem",
  padding: "0.25rem 0.5rem",
  borderRadius: "9999px",
});

const ButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  marginTop: "auto",
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    gap: "8px",
  },
}));

const LiveDemoButton = styled(Button)({
  background: "linear-gradient(45deg, #22d3ee, #34d399)",
  borderRadius: "8px",
  padding: "8px 24px",
  fontWeight: 500,
  transition: "all 0.3s ease-in-out",
  flex: 1,
  "&:hover": {
    background: "linear-gradient(45deg, #22d3ee, #34d399)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px rgba(34, 211, 238, 0.3)",
  },
});

const CodeButton = styled(Button)({
  color: "#f1f5f9",
  borderColor: "rgba(74, 222, 128, 0.5)",
  borderRadius: "8px",
  padding: "8px 24px",
  fontWeight: 500,
  transition: "all 0.3s ease-in-out",
  flex: 1,
  "&:hover": {
    borderColor: "#4ade80",
    background: "rgba(74, 222, 128, 0.1)",
    transform: "translateY(-2px)",
  },
});

const ViewMoreButton = styled(Button)({
  color: "#f1f5f9",
  borderColor: "rgba(34, 211, 238, 0.5)",
  borderRadius: "8px",
  padding: "8px 24px",
  fontSize: "0.95rem",
  fontWeight: 500,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    borderColor: "#22d3ee",
    background: "rgba(34, 211, 238, 0.1)",
    transform: "scale(1.02)",
  },
});

// Memoized ProjectCard component to prevent unnecessary re-renders
const ProjectCard = ({ project }) => {
  const { title, description, image, link, github, tech } = project;

  // Image error handling function
  const handleImageError = (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = '/fallback-project.png';
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      style={{ height: "100%" }}
    >
      <StyledCard>
        <ImageContainer>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ 
              objectFit: "cover", 
              objectPosition: "center top",
              transition: "transform 0.5s ease"
            }}
            className="hover:scale-105"
            onError={handleImageError}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Tv2Rf2e9H0bQR438Q6UZ9YvfMuNKsb2Jlm0/T5Yw0d3NE+JFvrxGV1dHT7LAyIjLNLPFJ+YniH9sb4rf8Jt8TPE3gP4h6l4g0HXfF+v6to0OrGfSbrT9NuNYvJ9Kt4LLUHht44dKglghtxaxeULaOPZs2Ej/AEfHrRXnYfBKlCKapyaSV+Z67dzqr4+VSb5ZNJt2XKuh//Z"
          />
        </ImageContainer>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              mb: 1.5, 
              fontWeight: 600,
              fontSize: "1.25rem",
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#cbd5e1", 
              fontWeight: 500,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              "&:hover": { color: "#f1f5f9" } 
            }}
          >
            {description}
          </Typography>
          
          <TechChipContainer>
            {tech?.map((item, index) => (
              <TechChip
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </TechChip>
            ))}
          </TechChipContainer>
        </CardContent>

        <CardContent sx={{ pt: 0, pb: 3 }}>
          <ButtonGroup>
            <LiveDemoButton
              variant="contained"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Eye size={18} />}
            >
              Live Demo
            </LiveDemoButton>
            
            {github && (
              <CodeButton
                variant="outlined"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Github size={18} />}
              >
                Code
              </CodeButton>
            )}
          </ButtonGroup>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

// Main Projects component
const Projects = () => {
  // Use a properly memoized project data
  const memoizedProjects = useMemo(() => PROJECTS, []);
  
  return (
    <SectionWrapper id="projects">
      <Container maxWidth="lg">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <TitleText variant="h2">
            My Projects
          </TitleText>

          <Typography
            variant="body1"
            sx={{
              color: "#f1f5f9",
              fontSize: "1.125rem",
              fontWeight: 500,
              maxWidth: "600px",
              mx: "auto",
              mb: 4,
              opacity: 0.95,
            }}
          >
            A collection of impactful projects solving real-world problems with modern web solutions.
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {memoizedProjects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Link href="/morproject" passHref>
            <ViewMoreButton
              variant="outlined"
              startIcon={<Eye size={18} />}
            >
              View More Projects
            </ViewMoreButton>
          </Link>
        </motion.div>
      </Container>

      {/* Scroll Indicator - Optimized animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={pulse}
        animate="animate"
      >
        <div className="w-3 h-8 border-2 border-cyan-400 rounded-full">
          <div className="w-1 h-2 bg-cyan-400 mx-auto mt-1" />
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default Projects;