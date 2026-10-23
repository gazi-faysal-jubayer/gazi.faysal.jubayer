export const PROFILE = {
  name: "Gazi Faysal Jubayer",
  firstName: "Gazi",
  tagline: "Mechanical Engineer | Programmer",
  headline: "Engineering precision meets digital craft.",
  bio: "Mechanical Engineering student at KUET working across machine learning, full-stack development, and CAD design. 2× NASA Space Apps Global Nominee and Galactic Problem Solver, published researcher in manufacturing optimization, Champion of CAD Conqueror (EELEVEN AutoFest 2026), and 4× national CAD contest podium winner. CSWA, CSWP, CSWPA-SM, and CSWPA-WD certified, with leadership roles across Team Kilo Flight, Team Durbar, and Fab Lab KUET.",
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
    "Blender",
    "KeyShot",
    "Sheet Metal Design",
    "Hands-on fabrication",
  ],
  programming: [
    "Python",
    "C",
    "SQL",
    "Dart",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "React",
    "Flutter",
    "TensorFlow",
    "Scikit-learn",
    "Django",
    "FastAPI",
    "ROS",
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
    degree: "B.Tech in Mechanical Engineering",
    institution: "Khulna University of Engineering and Technology",
    year: "Dec 2022 - Jun 2027",
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
    company: "ONNEXX",
    roles: [
      {
        title: "Jr. Mechanical Engineer (Part-time)",
        start: { month: 9, year: 2026 },
        end: null,
        description:
          "Mechanical engineering for the Project ONNEXX sound system (Texas, USA).",
      },
    ],
  },
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
        title: "Founder & Technical Lead",
        start: { month: 0, year: 2026 },
        end: null,
        description:
          "Commercial 3D printing service for rapid prototyping and custom fabrication — running Bambu Lab P1S hardware and tuning Bambu Studio / OrcaSlicer profiles (alternating infill, custom raster angles) for strong, engineering-grade parts.",
      },
    ],
  },
  {
    company: "KILO FLIGHT",
    roles: [
      {
        title: "Vice Captain (Technical)",
        start: { month: 9, year: 2025 },
        end: null,
        description:
          "Leading technical operations, engineering design, and vehicle fabrication; designing and optimizing powertrain systems in SolidWorks and mentoring sub-teams on CAD best practices.",
      },
      {
        title: "Senior Executive at The Mechanical Powertrain Sub-Team",
        start: { month: 9, year: 2025 },
        end: { month: 9, year: 2025 },
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
        title: "Project Manager",
        start: { month: 8, year: 2026 },
        end: null,
        description: "Promoted to Project Manager at LOOP (Sep 16, 2026).",
      },
      {
        title: "Assistant Project Manager",
        start: { month: 9, year: 2025 },
        end: { month: 8, year: 2026 },
      },
    ],
  },
  {
    company: "Team Durbar",
    roles: [
      {
        title: "Autonomous Lead",
        start: { month: 8, year: 2025 },
        end: null,
        description:
          "Directing autonomous navigation for the KUET Mars Rover with ROS, OpenCV, and Python — perception, path planning, and sensor integration. 2nd place at the NASA Texas Space Grant Mars Autonomous Rover Rally (Dec 2025).",
      },
      {
        title: "Senior Executive at Autonomous Sub-Team",
        start: { month: 8, year: 2025 },
        end: { month: 8, year: 2025 },
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
          "Co-founded uddharbd.org during the 2024 Feni flood to coordinate disaster relief. Leading a 30+ member technical team building the Django web platform and Flutter mobile app.",
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
          "vsbbd.com — an EdTech platform serving 1000+ HSC and university admission students, built with Django and Selenium-based content automation.",
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
  {
    company: "Team BengalBoat",
    roles: [
      {
        title: "Website Team Lead",
        start: { month: 9, year: 2025 },
        end: null,
        description:
          "Building the team's responsive website showcasing its maritime projects.",
      },
    ],
  },
  {
    company: "Sholo Magazine",
    roles: [
      {
        title: "Local Ambassador",
        start: { month: 1, year: 2022 },
        end: { month: 11, year: 2023 },
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
    id: "cad-conqueror-2026",
    title: "Champion — CAD Conqueror",
    event: "EELEVEN Bangladesh AutoFest 2026",
    date: "2026",
    description:
      "Secured 1st place in the national Car Concept Design and Fabrication Contest for innovative automotive CAD modeling and manufacturing planning.",
  },
  {
    id: "mie-robolution-cad",
    title: "Champion — MIE Robolution CAD Contest",
    event: "MIE Department, CUET · Team Phenol",
    date: "2026",
    description:
      "Won 1st place and a 17,000 BDT prize at the national CAD competition organized by the Mechanical and Industrial Engineering Department, CUET.",
  },
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
    title: "2× Galactic Problem Solver · Global Nominee",
    event: "NASA International Space Apps Challenge",
    date: "2023 – 2024",
    description:
      "Two-time Global Nominee and Galactic Problem Solver at the NASA International Space Apps Challenge — Regional 1st Runner-Up in 2023 and Regional 2nd Runner-Up in 2024.",
  },
  {
    id: "national-cad-podium",
    title: "4× National CAD Contest Podium",
    event: "National CAD Contests · Multiple Universities",
    date: "2024 – 2026",
    description:
      "Four-time national CAD contest podium winner across universities — Champion at EELEVEN AutoFest 2026 and CUET MIE Robolution; 1st Runner-Up at Calibration 1.0 (Feb 2024), Calibration 2.0 (May 2026), and Energy Fest 1.0.",
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
  {
    name: "Python for Data Science, AI & Development",
    organization: "IBM",
    date: "",
    credentialUrl: undefined,
  },
] as const;

export type ProjectType = "cad" | "simulation" | "hands-on" | "programming";

/** Bespoke 3D viewport model; otherwise the per-type model is used. */
export type ProjectModelKind = "shredder";

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
  model?: ProjectModelKind;
  /** Derived at build time from the first image in public/projects/<slug>/ */
  cover?: string;
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
    slug: "mine-shredder-machine",
    type: "cad",
    title: "Mine Shredder Machine",
    summary: "Belt-driven rotary shredder that reduces mining waste for easier disposal.",
    description:
      "A fully functional mine shredder machine designed in SOLIDWORKS to shred and process mining waste, reducing its bulk so it is easier to handle and dispose of. Material is fed through an inclined hopper into the cutting chamber, where a rotor drum carrying four bolted-on fixed blades cuts against a comb-style adjustable blade so the cutting gap can be tuned. The rotor shaft runs on two 6008 deep-groove ball bearings and is driven by a motor on the stand's lower shelf through a belt and two matched pulleys; shredded output drops out through the discharge tray. The complete 21-item assembly — stand, mounting frame and pad, chamber, hopper, drive, and ISO 8765 / ISO 4762 fasteners — is documented in A2 assembly and exploded-view drawings (1:20) with a full bill of materials, plus a motion animation.",
    year: "2024",
    tech: ["SolidWorks", "Assembly Design", "Engineering Drawings", "Motion Animation"],
    highlights: [
      "Rotor drum with 4 fixed blades cutting against an adjustable comb blade",
      "Belt drive with matched pulleys from a shelf-mounted motor",
      "Rotor shaft supported on two 6008 deep-groove ball bearings",
      "21-item BOM with A2 assembly and exploded-view drawings",
      "Published on GrabCAD — 180+ downloads",
    ],
    link: "https://grabcad.com/library/mine-shredder-machine-1",
    featured: true,
    model: "shredder",
  },
  {
    slug: "calibration-cad-contests",
    type: "cad",
    title: "Calibration CAD Contests",
    summary: "1st Runner-Up at the CALIBRATION 1.0 and 2.0 national CAD contests.",
    description:
      "Took 1st Runner-Up at the CAD contest in CALIBRATION 1.0 (Feb 2024), then returned with Team Overthinker to place 1st Runner-Up again at CALIBRATION 2.0 (May 2026) — timed modeling challenges against teams from across the country.",
    year: "2024–2026",
    tech: ["SolidWorks", "Engineering Drawing", "Speed Modeling"],
    highlights: [
      "1st Runner-Up — CALIBRATION 1.0 (Feb 2024)",
      "1st Runner-Up — CALIBRATION 2.0 (May 2026, Team Overthinker)",
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
    tech: ["Django", "Flutter", "PostgreSQL"],
    highlights: [
      "Django REST API with PostgreSQL for real-time donation tracking",
      "Connects donors with flood victims at uddharbd.org",
      "Flutter mobile app for iOS and Android in development",
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
    tech: ["Django", "Selenium", "Web Scraping"],
    highlights: [
      "Serves 1000+ HSC and university admission students",
      "Selenium-based scraping for automated content aggregation",
      "User auth, content management, and advanced search",
    ],
    link: "https://vsbbd.com",
    featured: true,
  },
  {
    slug: "exobengal",
    type: "programming",
    title: "ExoBengal",
    summary: "AI-powered exoplanet detection platform with ML, web, and chatbot.",
    description:
      "An AI exoplanet discovery ecosystem: a PyPI package of ML models trained on NASA Kepler data, an interactive Next.js site with 3D orbital visualizations and galaxy maps, models served from Cerebrium Cloud, and the Cosmo AI chatbot for natural-language astronomy questions.",
    year: "2024",
    tech: ["TensorFlow", "Scikit-learn", "Next.js", "FastAPI", "Cerebrium"],
    highlights: [
      "90% accuracy (0.90 AUC-ROC) on Kepler Q1–Q17 · 38,746+ exoplanets",
      "Random Forest, CNN, KNN, and Decision Tree models with auto-retraining",
      "Earth Similarity Index scoring and probability thresholding",
      "3D orbital visualizations, galaxy maps, and live dashboards",
      "Cosmo AI chatbot powered by Gemini 2.5 Flash",
    ],
    featured: true,
  },
  {
    slug: "mars-rover-navigation",
    type: "programming",
    title: "Mars Autonomous Rover Navigation",
    summary: "ROS autonomy stack that placed 2nd at the NASA Texas Space Grant rally.",
    description:
      "Autonomous navigation algorithms built with Team Durbar for Mars Kaiser Crater terrain exploration in a high-fidelity, physics-based Space Teams PRO simulation — including path planning, obstacle avoidance, and mission strategies for in-situ resource utilization and habitability assessment.",
    year: "2025",
    tech: ["ROS", "Python", "Space Teams PRO"],
    highlights: [
      "2nd place — NASA Texas Space Grant Mars Autonomous Rover Rally",
      "Path planning and obstacle avoidance on Kaiser Crater terrain",
      "Mission strategy for ISRU and habitability assessment",
    ],
    featured: true,
  },
  {
    slug: "autonomous-vehicle-navigation",
    type: "programming",
    title: "Autonomous Vehicle Navigation System",
    summary: "Real-time OpenCV detection and path planning for autonomous driving.",
    description:
      "A computer-vision navigation system with real-time object detection and tracking in OpenCV, combined with sensor fusion and path planning for obstacle avoidance.",
    year: "2024",
    tech: ["Python", "OpenCV", "Computer Vision"],
    highlights: [
      "Real-time object detection and tracking",
      "Sensor fusion for robust perception",
      "Path planning with obstacle avoidance",
    ],
    featured: false,
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
