export const PROFILE = {
  name: "Gazi Faysal Jubayer",
  firstName: "Gazi",
  tagline: "Mechanical Engineer | Programmer",
  headline: "Engineering precision meets digital craft.",
  bio: "As a dedicated and passionate professional in mechanical design, engineering simulation, programming, and software development, I bring a unique blend of engineering and IT expertise to the table. From CAD and FEA/CFD work in tools like Ansys, Abaqus, and COMSOL to building software that ships, I thrive on solving complex problems and driving innovation.",
  email: "gazi.faysal.jubayer@gmail.com",
  phone: "+8801315669261",
  location: "Khulna, Bangladesh",
  github: "https://github.com/gazi-faysal-jubayer",
  linkedin: "https://www.linkedin.com/in/gazi-faysal-jubayer/",
  website: "https://gazi.faysal.jubayer",
  scholarId: "WdZWO3YAAAAJ",
  scholar: "https://scholar.google.com/citations?user=WdZWO3YAAAAJ&hl=en",
} as const;

export const SKILLS = {
  engineering: [
    "SolidWorks",
    "AutoCAD",
    "Ansys",
    "Abaqus",
    "COMSOL",
    "3D Printing",
    "nTop",
    "Hands-on fabrication",
  ],
  programming: [
    "Python",
    "C",
    "Dart",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "React",
    "Flutter",
    "Computer Vision",
    "Data Analysis",
  ],
} as const;

export const LANGUAGES = [
  { name: "Bangla", level: "Native" },
  { name: "English", level: "Professional" },
] as const;

export const EDUCATION = [
  {
    degree: "Mechanical Engineering",
    institution: "Khulna University of Engineering and Technology",
    year: "2022 - 2027",
    location: "Khulna, Bangladesh",
  },
  {
    degree: "HSC at science department",
    institution: "Khulna Public College",
    year: "2019 - 2021",
    location: "Khulna, Bangladesh",
  },
] as const;

export type ExperienceRole = {
  title: string;
  /** 0 = Jan … 11 = Dec */
  start: { month: number; year: number };
  /** null = Present */
  end: { month: number; year: number } | null;
  description?: string;
};

export type ExperienceEntry = {
  company: string;
  roles: ExperienceRole[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Fab Lab KUET",
    roles: [
      {
        title: "Student Operator",
        start: { month: 6, year: 2026 },
        end: null,
      },
    ],
  },
  {
    company: "3D Bytes",
    roles: [
      {
        title: "Founder",
        start: { month: 0, year: 2026 },
        end: null,
        description:
          "IT services and 3D design / printing studio based in Khulna, Bangladesh.",
      },
    ],
  },
  {
    company: "KILO FLIGHT",
    roles: [
      {
        title: "Vice Captain",
        start: { month: 6, year: 2026 },
        end: null,
        description: "Promoted to Vice Captain of Team Kilo Flight.",
      },
      {
        title: "Senior Executive at The Mechanical Powertrain Sub-Team",
        start: { month: 9, year: 2025 },
        end: { month: 6, year: 2026 },
        description:
          "Promoted to Senior Executive at the Mechanical Powertrain Sub-Team of Team Kilo Flight.",
      },
      {
        title: "Trainee Member at the Mechanical Powertrain Sub-Team",
        start: { month: 2, year: 2024 },
        end: { month: 9, year: 2025 },
      },
    ],
  },
  {
    company: "LOOP",
    roles: [
      {
        title: "Assistant Project Manager",
        start: { month: 9, year: 2025 },
        end: null,
      },
    ],
  },
  {
    company: "Team Durbar",
    roles: [
      {
        title: "Autonomous Lead",
        start: { month: 2, year: 2026 },
        end: null,
        description: "Promoted to Autonomous Lead at Team Durbar.",
      },
      {
        title: "Senior Executive at Autonomous Sub-Team",
        start: { month: 8, year: 2025 },
        end: { month: 2, year: 2026 },
        description:
          "Promoted to Senior Executive of the Autonomous Sub-Team at Team Durbar.",
      },
      {
        title: "Trainee Member at Autonomous Sub-Team",
        start: { month: 6, year: 2024 },
        end: { month: 8, year: 2025 },
      },
    ],
  },
  {
    company: "CADers",
    roles: [
      {
        title: "CPA (Chief Policy Analyst)",
        start: { month: 0, year: 2025 },
        end: null,
      },
      {
        title: "Assistant IT and Resources Officer",
        start: { month: 2, year: 2024 },
        end: { month: 0, year: 2025 },
        description:
          "CADers is a club of KUET which works with CAD (Computer Aided Design).",
      },
    ],
  },
  {
    company: "KUET Aerial Vehicles Engineering Network",
    roles: [
      {
        title: "Executive Member",
        start: { month: 11, year: 2024 },
        end: null,
      },
    ],
  },
  {
    company: "Autodesk User Group Network Bangladesh",
    roles: [
      {
        title: "Assistant Partnership Manager",
        start: { month: 10, year: 2024 },
        end: null,
      },
    ],
  },
  {
    company: "উদ্ধার - Uddhar",
    roles: [
      {
        title: "Chief Information Officer",
        start: { month: 7, year: 2024 },
        end: null,
        description:
          "Co-founded uddharbd.org during the 2024 Feni flood to coordinate disaster relief. The team now includes ~30 members and volunteers.",
      },
    ],
  },
  {
    company: "SEAN Publication",
    roles: [
      {
        title: "Campus Ambassador",
        start: { month: 9, year: 2024 },
        end: null,
      },
    ],
  },
  {
    company: "BANGLADESH 3DExperience & Solidworks User Group Network",
    roles: [
      {
        title: "Junior Marketing Executive",
        start: { month: 9, year: 2024 },
        end: null,
        description:
          "Junior Marketing Executive of the Campus Committee of Bangladesh 3DExperience & Solidworks User Group Network.",
      },
    ],
  },
  {
    company: "VSB - Virtual Solution Book",
    roles: [
      {
        title: "Co-Founder and Tech Lead",
        start: { month: 0, year: 2024 },
        end: null,
        description:
          "vsbbd.com — a digital platform providing solutions for HSC and admission students.",
      },
    ],
  },
  {
    company: "Team BengalSub",
    roles: [
      {
        title: "Website Team Lead and Mechanical Designer",
        start: { month: 4, year: 2025 },
        end: { month: 0, year: 2026 },
        description: "RoboSub 2025 — website lead and mechanical design.",
      },
    ],
  },
];

export const PUBLICATIONS = [
  {
    title:
      "Analyzing the impact of opportunistic maintenance optimization on manufacturing industries in Bangladesh: An empirical study",
    journal:
      "BenchCouncil Transactions on Benchmarks, Standards and Evaluations",
    volume: "4",
    issue: "2",
    articleNumber: "100172",
    date: "June 2024",
    publishedOnline: "August 2024",
    status: "Published",
    authors: [
      "Md. Ariful Alam",
      "Md. Rafiquzzaman",
      "Md. Hasan Ali",
      "Gazi Faysal Jubayer",
    ],
    doi: "https://doi.org/10.1016/j.tbench.2024.100172",
    url: "https://www.sciencedirect.com/science/article/pii/S2772485924000243",
  },
] as const;

export type Achievement = {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "mars-rover-rally-2025",
    title: "2nd Place — Mars Autonomous Rover Rally",
    event: "NASA Texas Space Grant · Team Durbar",
    date: "December 2025",
    description:
      "Placed 2nd in an international autonomous rover navigation challenge using ROS and Space Teams PRO simulation for Mars Kaiser Crater exploration.",
  },
  {
    id: "robosub-2025",
    title: "RoboSub 2025 Competitor",
    event: "Team BengalSub",
    date: "2025",
    description:
      "Leading mechanical design and web development for an autonomous underwater vehicle competing at RoboSub 2025.",
  },
  {
    id: "fs-concept-challenge-2025",
    title: "3rd Place — International FS Concept Challenge",
    event: "Formula Bharat",
    date: "2025",
    description:
      "Stood 3rd place in the International FS Concept Challenge 2025 arranged by Formula Bharat.",
  },
  {
    id: "nasa-space-apps-nominee",
    title: "2× NASA Space Apps Global Nominee",
    event: "NASA International Space Apps Challenge",
    date: "2023 – 2024",
    description:
      "Two-time Global Nominee at the NASA International Space Apps Challenge, recognized for innovative solutions to real-world space and Earth challenges.",
  },
  {
    id: "national-cad-podium",
    title: "4× National CAD Contest Podium",
    event: "National CAD Contests · Multiple Universities",
    date: "2024 – 2026",
    description:
      "Four-time national CAD contest podium winner across competitions held at different universities.",
  },
];

export const CERTIFICATIONS = [
  {
    name: "Solidworks Weldments Professional (CSWPA-WD)",
    organization: "Dassault Systèmes",
    date: "July 2024",
    credentialUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-FDSF19ASCX",
  },
  {
    name: "Solidworks Sheet Metal Professional (CSWPA-SM)",
    organization: "Dassault Systèmes",
    date: "June 2024",
    credentialUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-RAFH5TKCCV",
  },
  {
    name: "Solidworks CAD Design Professional (CSWP)",
    organization: "Dassault Systèmes",
    date: "June 2024",
    credentialUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-XRLJHD7BAM",
  },
  {
    name: "Solidworks CAD Design Associate (CSWA)",
    organization: "Dassault Systèmes",
    date: "April 2024",
    credentialUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-GT9ZTD3EUK",
  },
  {
    name: "Python Project for AI and Application Development",
    organization: "Credly by Pearson",
    date: "April 2024",
    credentialUrl:
      "https://www.credly.com/badges/6ea01fb6-f78d-424f-a040-62e72b3dcb8b/public_url",
  },
  {
    name: "Developing AI Applications with Python and Flask by IBM",
    organization: "Coursera",
    date: "April 2024",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/certificate/Z5T6FJDAQR",
  },
] as const;

export type ProjectType = "cad" | "simulation" | "hands-on" | "programming";

export const WORK_CATEGORIES: {
  id: ProjectType;
  label: string;
}[] = [
  { id: "cad", label: "CAD" },
  { id: "simulation", label: "Simulation" },
  { id: "hands-on", label: "Hands-on project" },
  { id: "programming", label: "Programming" },
];

export type Project = {
  slug: string;
  type: ProjectType;
  title: string;
  summary: string;
  description: string;
  year: string;
  tech: string[];
  highlights?: string[];
  link?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "gearbox-assembly",
    type: "cad",
    title: "Gearbox Assembly",
    summary: "Multi-stage helical gear reducer for industrial applications.",
    description:
      "A 3-stage helical gear reducer designed for industrial applications. Features compact design with high torque transmission efficiency, splash lubrication, and SKF bearings throughout.",
    year: "2024",
    tech: ["SolidWorks", "ANSYS", "KeyShot"],
    highlights: [
      "Gear ratio 25:1 · Input 1450 RPM → Output 58 RPM",
      "15 kW input power at 96% efficiency",
      "20MnCr5 gears, EN24 shafts, FG260 housing",
    ],
    featured: true,
  },
  {
    slug: "heat-exchanger",
    type: "cad",
    title: "Heat Exchanger",
    summary: "Counter-flow shell and tube exchanger for process cooling.",
    description:
      "Counter-flow shell and tube heat exchanger for chemical process cooling. Designed for high pressure and corrosive fluid applications with 500 kW heat duty.",
    year: "2024",
    tech: ["AutoCAD", "HTRI", "SolidWorks"],
    highlights: [
      "500 kW heat duty · 10 bar design pressure",
      "120 tubes · 600 mm shell diameter",
      "SA516 Gr.70 shell with SS316L tubes",
    ],
    featured: true,
  },
  {
    slug: "hydraulic-cylinder",
    type: "cad",
    title: "Hydraulic Cylinder",
    summary: "Double-acting actuator for press machine applications.",
    description:
      "Double-acting hydraulic cylinder for press machine application. Designed for high force and precision positioning at 210 bar operating pressure.",
    year: "2024",
    tech: ["SolidWorks", "HydroSym"],
    highlights: [
      "100 mm bore · 500 mm stroke · 210 bar",
      "Push force 165 kN · Pull force 125 kN",
      "Hard chrome rod with NBR and polyurethane seals",
    ],
    featured: false,
  },
  {
    slug: "conveyor-roller",
    type: "cad",
    title: "Conveyor Roller",
    summary: "Sealed idler roller for mining and quarry conveyors.",
    description:
      "Sealed bearing conveyor roller for bulk material handling. Designed for harsh mining and quarry environments with triple labyrinth sealing.",
    year: "2024",
    tech: ["SolidWorks", "AutoCAD"],
    highlights: [
      "159 mm diameter · 600 mm face length",
      "2500 N load capacity · 600 RPM rating",
      "Lifetime-greased 6204-2RS bearings",
    ],
    featured: false,
  },
  {
    slug: "spoon-rest-whale-spoon",
    type: "cad",
    title: "Oyster Spoon Rest & Whale Spoon",
    summary: "Client-commissioned kitchenware designs modeled in SolidWorks.",
    description:
      "An 'Oyster Shell Spoon Rest' and a whale-shaped spoon designed for a client commission — organic surface modeling work done in SolidWorks 2024, prepared for 3D printing.",
    year: "2026",
    tech: ["SolidWorks", "Surface Modeling", "3D Printing"],
    highlights: [
      "Organic, sculptural surface modeling",
      "Client-commissioned freelance work",
      "Print-ready output",
    ],
    featured: false,
  },
  {
    slug: "calibration-cad-contests",
    type: "cad",
    title: "Calibration CAD Contests",
    summary: "National CAD contest champion (1.0) and 1st Runner-Up (2.0).",
    description:
      "Won my first national CAD contest at CALIBRATION 1.0, then returned with Team Overthinker to take 1st Runner-Up at the CAD contest in CALIBRATION 2.0 — timed modeling challenges against teams from across the country.",
    year: "2024–2026",
    tech: ["SolidWorks", "Engineering Drawing", "Speed Modeling"],
    highlights: [
      "Champion — CALIBRATION 1.0",
      "1st Runner-Up — CALIBRATION 2.0 (Team Overthinker)",
      "National-level competition",
    ],
    featured: true,
  },
  {
    slug: "shadow-art-lamp",
    type: "hands-on",
    title: "Shadow Art Lamp",
    summary: "Custom 3D-printed lamp that projects any shadow design.",
    description:
      "A custom Shadow Art Lamp built under 3D Bytes — it can project virtually any custom shadow design, from characters and logos to calligraphy, names, or personalized artwork. Designed, printed, and assembled end to end.",
    year: "2026",
    tech: ["3D Printing", "3D Design", "Product Design"],
    highlights: [
      "Projects fully custom shadow artwork",
      "Designed and fabricated end to end",
      "Sold as a made-to-order product via 3D Bytes",
    ],
    featured: true,
  },
  {
    slug: "human-body-blur",
    type: "programming",
    title: "Human Body Blur",
    summary: "Computer-vision tool that selectively blurs people in video.",
    description:
      "A codebase that anonymizes individuals in video with pixel-accurate precision — selectively blur any person without manual video editing. Built to automate a tedious manual task using image processing.",
    year: "2025",
    tech: ["Python", "OpenCV", "Computer Vision"],
    highlights: [
      "Pixel-accurate person segmentation and blur",
      "Fully automated — no manual editing",
      "Open source on GitHub",
    ],
    link: "https://github.com/gazi-faysal-jubayer/human-body-blur",
    featured: false,
  },
  {
    slug: "3d-bytes-generators",
    type: "programming",
    title: "3D Bytes Web Generators",
    summary: "Interactive 3D model generators for the 3D Bytes website.",
    description:
      "A set of interactive 3D generators built for the website of my 3D printing business, 3D Bytes — letting visitors configure and preview printable designs directly in the browser.",
    year: "2026",
    tech: ["JavaScript", "Three.js", "Web Development"],
    highlights: [
      "Browser-based parametric model generation",
      "Built for the 3D Bytes storefront",
      "Bridges CAD and web development",
    ],
    featured: false,
  },
  {
    slug: "mounting-bracket",
    type: "simulation",
    title: "Mounting Bracket",
    summary: "FEA-optimized structural bracket for heavy equipment.",
    description:
      "Structural support bracket for industrial equipment mounting. FEA optimized for weight reduction while maintaining strength — reduced from 18 kg to 12.5 kg.",
    year: "2024",
    tech: ["SolidWorks", "ANSYS Workbench"],
    highlights: [
      "5000 kg load capacity · Safety factor 3.0",
      "Weight optimized 18 kg → 12.5 kg",
      "Max stress 145 MPa vs 355 MPa yield",
    ],
    featured: false,
  },
  {
    slug: "nasa-space-apps-2023",
    type: "hands-on",
    title: "NASA Space Apps Challenge 2023",
    summary: "Regional 1st Runner-Up and Global Nominee — Galactic Problem Solver.",
    description:
      "Participated in the NASA International Space Apps Challenge 2023, an international hackathon addressing global challenges through collaboration. Our team was recognized as 1st Runner-Up and Global Nominee.",
    year: "2023",
    tech: ["Innovation", "Problem Solving", "Collaboration"],
    highlights: [
      "Regional 1st Runner-Up",
      "Global Nominee",
      "Galactic Problem Solver title",
    ],
    featured: true,
  },
  {
    slug: "nasa-space-apps-2024",
    type: "hands-on",
    title: "NASA Space Apps Challenge 2024",
    summary: "Regional 2nd Runner-Up and Global Nominee — Galactic Problem Solver.",
    description:
      "Participated in the NASA International Space Apps Challenge 2024, focused on solving real-world challenges through innovation and teamwork. Earned 2nd Runner-Up and Global Nominee honors.",
    year: "2024",
    tech: ["Innovation", "Problem Solving", "Teamwork"],
    highlights: [
      "Regional 2nd Runner-Up",
      "Global Nominee",
      "Second Galactic Problem Solver title",
    ],
    featured: true,
  },
  {
    slug: "uddhar",
    type: "programming",
    title: "উদ্ধার — Uddhar",
    summary: "Disaster-relief charity platform born from the 2024 Feni floods.",
    description:
      "A charity website and organization helping people during disasters. Started during the Flood of 2024 in Feni, Bangladesh, Uddhar now operates with a team of about 30 members and volunteers, with a mobile app version on the way.",
    year: "2024",
    tech: ["Next.js", "React", "Database"],
    highlights: [
      "Live relief coordination platform at uddharbd.org",
      "Grew to ~30 members and volunteers",
      "Mobile app version in development",
    ],
    link: "https://uddharbd.org",
    featured: true,
  },
  {
    slug: "vsb",
    type: "programming",
    title: "VSB — Virtual Solution Book",
    summary: "Educational platform for HSC and admission students.",
    description:
      "vsbbd.com is a platform providing solutions for the problems of HSC and admission students across Bangladesh — built as Co-Founder and Tech Lead.",
    year: "2024",
    tech: ["Web Development", "Educational Platform"],
    highlights: [
      "Co-founded and led technical development",
      "Solutions for HSC and university admission students",
    ],
    link: "https://vsbbd.com",
    featured: true,
  },
  {
    slug: "portfolio",
    type: "programming",
    title: "Personal Portfolio",
    summary: "Futuristic multi-page portfolio with curtain page transitions.",
    description:
      "A motion-rich personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion — a dark, technical interface with doors-style page transitions between sections.",
    year: "2025",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Doors curtain page transitions",
      "Project case-study routes",
      "Scroll-driven motion system",
    ],
    link: "/",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export const PAGES = [
  { href: "/", label: "INDEX" },
  { href: "/about", label: "ABOUT" },
  { href: "/experience", label: "LOG" },
  { href: "/work", label: "WORK" },
  { href: "/contact", label: "CONTACT" },
] as const;
