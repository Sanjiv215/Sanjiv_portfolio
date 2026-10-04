// Single source of content. Every string here is taken from public/resume.pdf.

export const PROFILE = {
  name: "Sanjiv Prasad",
  firstName: "Sanjiv",
  initials: "SP",
  role: "Full-Stack Developer",
  title: "Fullstack Developer Intern",
  email: "Sanjivprasad360@gmail.com",
  phone: "+91 9561552194",
  phoneHref: "tel:+919561552194",
  degree: "B.Tech CSE (AI/ML)",
  dept: "CSE (AI/ML)",
  university: "SVYASA University",
  resumeSummary: [
    "B.Tech CSE (AI/ML) student and Full-Stack Developer focused on building real-world, production-oriented applications with Python, FastAPI, React, and modern databases.",
    "Experienced in full-stack development through an IIT Patna internship, client projects, and open-source development, including Vigilo, a Python static security scanner.",
    "Passionate about backend architecture, AI applications, cybersecurity, and developer tools, with a strong focus on learning by building and solving real-world problems.",
  ],
  extraLine: "Developing strong fundamentals in programming, data structures, and software development.",
  interests: "Backend architecture, AI applications, cybersecurity, and developer tools",
  quote: "I learn by building — and I build to solve real-world problems.",
  github: "https://github.com/Sanjiv215",
  linkedin: "http://www.linkedin.com/in/prasadsanjiv",
  resume: "/resume.pdf",
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export type Skill = { name: string; symbol: string; logo: string; usedIn?: string[] };

export const SKILL_GROUPS: { family: string; skills: Skill[] }[] = [
  {
    family: "Languages",
    skills: [
      { name: "Python", symbol: "Py", logo: "python", usedIn: ["Vigilo", "PySentra"] },
      { name: "JavaScript", symbol: "Js", logo: "javascript", usedIn: ["Code Alpha internship"] },
      { name: "TypeScript", symbol: "Ts", logo: "typescript" },
    ],
  },
  {
    family: "Frontend",
    skills: [
      { name: "HTML", symbol: "Ht", logo: "html5", usedIn: ["Code Alpha internship"] },
      { name: "CSS", symbol: "Cs", logo: "css3", usedIn: ["Code Alpha internship"] },
      { name: "React", symbol: "Re", logo: "react" },
      { name: "Vite", symbol: "Vi", logo: "vitejs", usedIn: ["My Portfolio"] },
      { name: "jQuery", symbol: "Jq", logo: "jquery" },
    ],
  },
  {
    family: "Backend",
    skills: [
      { name: "Node.js", symbol: "No", logo: "nodejs" },
      { name: "Express", symbol: "Ex", logo: "express" },
      { name: "FastAPI", symbol: "Fa", logo: "fastapi" },
    ],
  },
  {
    family: "Databases",
    skills: [
      { name: "MySQL", symbol: "My", logo: "mysql" },
      { name: "MongoDB", symbol: "Mg", logo: "mongodb" },
    ],
  },
  {
    family: "Data & AI",
    skills: [
      { name: "NumPy", symbol: "Np", logo: "numpy" },
      { name: "Pandas", symbol: "Pd", logo: "pandas" },
      { name: "AI Tools", symbol: "Ai", logo: "ai" },
    ],
  },
  {
    family: "Practices",
    skills: [
      { name: "Deployment", symbol: "Dp", logo: "deployment", usedIn: ["My Portfolio", "IIT Patna internship"] },
      { name: "Collaboration", symbol: "Co", logo: "collaboration" },
      { name: "Leadership", symbol: "Ld", logo: "leadership" },
      { name: "Rapid Learning", symbol: "Rl", logo: "learning" },
    ],
  },
];

export const EXPERIENCE = [
  {
    year: "2026",
    title: "Fullstack Developer Intern",
    place: "IIT Patna",
    detail:
      "Developed scalable full-stack web applications, integrating responsive frontends, RESTful APIs, databases, authentication, and deployment workflows.",
  },
  {
    year: "2025",
    title: "Frontend Developer Intern",
    place: "Code Alpha",
    detail:
      "Developed responsive user interfaces using HTML, CSS, and JavaScript. Focused on clean design, usability, and cross-browser compatibility.",
  },
];

export const EDUCATION = [
  {
    year: "Present",
    title: "Bachelor of Technology — CSE (AI/ML)",
    place: "SVYASA University",
    detail:
      "Developing strong fundamentals in programming, data structures, and software development. Working on academic projects with hands-on experience in Python and web technologies.",
  },
  {
    year: "2023 – 2025",
    title: "Higher Secondary Education (HSC)",
    place: "GS Vidya Mandir",
    detail:
      "Completed higher secondary studies with a focus on mathematics and science fundamentals. Developed analytical thinking, problem-solving skills, and academic discipline.",
  },
];

// Chronological path for the Experience section.
export const TIMELINE = [EDUCATION[1], EXPERIENCE[1], EXPERIENCE[0], EDUCATION[0]];

export const PROJECTS = [
  {
    id: "vigilo",
    index: "01",
    title: "Vigilo",
    kicker: "Open source · Python",
    description: "An Automated Python-Based Security Scanner for Detecting Vulnerabilities and Code Security Issues.",
    link: "https://github.com/Sanjiv215/VIGILO-Python-Package",
    linkLabel: "View on GitHub",
  },
  {
    id: "pysentra",
    index: "02",
    title: "PySentra",
    kicker: "Python platform",
    description: "An Intelligent Python-Based Platform for Automated Code Analysis and Security Monitoring.",
    link: "https://github.com/Sanjiv215/PySentra",
    linkLabel: "View on GitHub",
  },
  {
    id: "smartbuy",
    index: "03",
    title: "SmartBuy-AI",
    kicker: "Agentic browser",
    description:
      "An agentic browser for price comparison — an Intelligent Application for Real-Time Product Price Comparison and an Interactive Browser.",
    link: "https://smart-buy-bmqt.vercel.app/",
    linkLabel: "View live",
  },
  {
    id: "erp",
    index: "04",
    title: "ERP Portal",
    kicker: "Enterprise portal",
    description:
      "An Integrated Enterprise Resource Planning (ERP) Portal for Streamlined Business Operations and Centralized Management.",
    link: "https://vercel.com/sanjiv215s-projects/erp-portal/FdpH1gHRjMzT17W4MBQxYKpGF46o",
    linkLabel: "View project",
  },
  {
    id: "portfolio",
    index: "05",
    title: "My Portfolio",
    kicker: "Vite · API",
    description: "My portfolio, created using the latest simple Vite with some connection to an API and also deployed.",
    link: "https://sanjivportfolio.vercel.app/",
    linkLabel: "View live",
  },
];
