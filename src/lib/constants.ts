export const PROFILE = {
  name: "Gazi Faysal Jubayer",
  firstName: "Gazi",
  tagline: "Mechanical Engineer | Programmer",
  headline: "Engineering precision meets digital craft.",
  bio: "Mechanical Engineering student at KUET working across machine learning, full-stack development, and CAD design. 2× NASA Space Apps Global Nominee and Galactic Problem Solver, published researcher in manufacturing optimization, Champion of CAD Conqueror (EELEVEN AutoFest 2026), and 4× national CAD contest podium winner. CSWA, CSWP, CSWPA-SM, and CSWPA-WD certified, with leadership roles across Team Kilo Flight, Team Durbar, and Fab Lab KUET.",
  email: "gazi.faysal.jubayer@gmail.com",
  business: "https://www.facebook.com/3dbytesbd",
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
  link?: string;
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
    link: "https://www.facebook.com/3dbytesbd",
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
export type ProjectModelKind = "shredder" | "tpms" | "lamp";

export const WORK_CATEGORIES: {
  id: ProjectType;
  label: string;
}[] = [
  { id: "cad", label: "CAD" },
  { id: "hands-on", label: "Hands-on project" },
  { id: "simulation", label: "Simulation" },
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
  /** YouTube videos embedded on the project page */
  videos?: { id: string; title: string }[];
  /** Public source repository, shown as a "Source code" button */
  repo?: string;
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
    slug: "orcaslicer-tpms-infill",
    type: "hands-on",
    title: "Custom TPMS Infill for OrcaSlicer",
    summary:
      "Equation-driven TPMS-P and TPMS-IWP infill patterns with adaptive density, built into OrcaSlicer with Claude AI.",
    description:
      "A custom build of OrcaSlicer with brand-new infill patterns based on triply periodic minimal surfaces (TPMS) — smooth 3D structures defined by equations that spread load evenly in every direction. Working with Claude Opus 5.5, I reverse-engineered OrcaSlicer's infill code and added two fully equation-driven patterns: TPMS-P (Schwarz Primitive) and TPMS-IWP (Schoen I-WP). Part two adds an adaptive density option that varies infill density through the part (Normal Z mode, 10% interior density, exponential gradient). Tested by slicing the same test bar on a Bambu Lab A1 (0.4 mm nozzle, PLA, 0.20 mm Standard profile, 15% sparse infill): TPMS-P with adaptive density came out at 19m 01s and 8.92 g, saving 1m 10s and 0.36 g over the TPMS-IWP baseline. These are slicer estimates — FEA and physical strength tests are next.",
    year: "2026",
    tech: ["OrcaSlicer", "C++", "Claude AI", "3D Printing", "Bambu Lab A1"],
    highlights: [
      "TPMS-P (Schwarz Primitive) and TPMS-IWP (Schoen I-WP), fully equation-driven",
      "Adaptive density: Normal Z gradient, 10% interior, exponential falloff",
      "TPMS-P + adaptive: 19m 01s / 8.92 g vs 20m 11s / 9.28 g IWP baseline (slicer estimate)",
      "Tested on Bambu Lab A1 · PLA · 0.20 mm layers · 15% sparse infill",
      "Built with Claude Opus 5.5 — FEA and physical strength tests next",
    ],
    videos: [
      { id: "PJuFq3oD-FM", title: "Part 1 — TPMS-P infill" },
      { id: "jUkzMcTVLUA", title: "Part 2 — TPMS-IWP + adaptive density" },
    ],
    featured: true,
    model: "tpms",
  },
  {
    slug: "ac-lamp",
    type: "hands-on",
    title: "3D-Printed AC Lamp",
    summary: "Mains-powered table lamp, 3D printed and wired by hand as a gift.",
    description:
      "A mains-powered (AC) table lamp made with 3D printing and basic electronics — a rounded, frosted diffuser shade on a pastel-blue base that gives off a soft, even glow. I designed, printed, wired, and assembled it as a gift for my senior rollmate, and it marked my return to hands-on fabrication after a break.",
    year: "2026",
    tech: ["3D Printing", "3D Design", "Electronics", "Product Design"],
    highlights: [
      "Designed and 3D printed shade and base",
      "Wired with basic mains (AC) electronics",
      "Frosted diffuser for a soft, even glow",
      "Handmade as a gift for a senior rollmate",
    ],
    featured: false,
    model: "lamp",
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
    link: "https://www.facebook.com/3dbytesbd",
    featured: true,
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
    link: "https://pypi.org/project/exobengal/",
    repo: "https://github.com/gazi-faysal-jubayer/ExoBengal",
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
    slug: "human-body-blur",
    type: "programming",
    title: "Human Body Blur",
    summary: "Selectively blurs chosen people in video with pixel-accurate body masks.",
    description:
      "A full-body detection and blurring pipeline for anonymising specific individuals in video. YOLOv8 instance segmentation produces pixel-accurate body masks, ByteTrack keeps a stable ID on every person across frames, and a Gaussian blur is applied only to the track IDs you choose — while the original audio is preserved. It runs as a six-cell Jupyter notebook that installs its own dependencies and uses any CUDA-capable NVIDIA GPU.",
    year: "2025",
    tech: [
      "Python",
      "YOLOv8",
      "ByteTrack",
      "OpenCV",
      "PyTorch",
    ],
    highlights: [
      "YOLOv8-seg instance masks for pixel-accurate blurring",
      "ByteTrack multi-object tracking keeps IDs stable across frames",
      "Blur only the selected people — everyone else stays untouched",
      "Original audio preserved with moviepy",
      "Self-installing notebook, CUDA GPU accelerated",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/human-body-blur",
    featured: true,
  },
  {
    slug: "bangla-civic-intelligence",
    type: "programming",
    title: "Bangla Civic Intelligence Suite",
    summary: "Serverless Bangla civic platform: voice-driven document Q&A and AI civic-hotspot detection.",
    description:
      "A fully serverless, Bangla-language civic intelligence platform built with Next.js and Tailwind CSS. Dialect Document Q&A extracts text from Bangla document images with OCR, takes questions typed or spoken in a Bangla dialect, answers them with a language model and reads the answer aloud. The Civic Hotspot Detector analyses uploaded photos, videos and sensor readings to spot issues such as flooding, pollution and infrastructure damage, maps them on Leaflet heatmaps and writes its reports in Bangla. Every model is free and open source through Hugging Face, with Transformers.js fallbacks.",
    year: "2025",
    tech: [
      "Next.js",
      "Hugging Face",
      "Transformers.js",
      "Leaflet",
      "Supabase",
    ],
    highlights: [
      "OCR (TrOCR) → question answering (FLAN-T5 / BanglaBERT) → spoken Bangla answers (MMS-TTS)",
      "Whisper speech recognition for Bangla dialects",
      "DETR detection and BLIP captioning find civic issues in photos and video",
      "Leaflet hotspot heatmaps with reports written in Bangla",
      "100% free models with Transformers.js fallback chains",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/bangla-civic-intelligence",
    featured: true,
  },
  {
    slug: "virtual-keyboard",
    type: "programming",
    title: "Virtual Keyboard (Hand Tracking)",
    summary: "Type in the air — a webcam keyboard driven by real-time hand tracking.",
    description:
      "An AI-powered virtual keyboard you type on with your hands in the air. OpenCV and CVZone track the hand from an ordinary webcam in real time: hovering the index finger over a key selects it, and bringing the middle finger close to the index finger presses it, with Pynput sending the keystroke to the computer. It has a full QWERTY layout with Space, Enter and Backspace on a semi-transparent overlay.",
    year: "2024",
    tech: [
      "Python",
      "OpenCV",
      "CVZone",
      "NumPy",
      "Pynput",
    ],
    highlights: [
      "Real-time hand tracking from a standard webcam",
      "Pinch gesture (index + middle finger) presses a key",
      "Full QWERTY layout with Space, Enter and Backspace",
      "Sends real keystrokes to any app through Pynput",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/virtual-keyboard-opnCV",
    featured: true,
  },
  {
    slug: "wealthpilot",
    type: "programming",
    title: "WealthPilot",
    summary: "Personal finance workspace with exact money, a grounded AI copilot, and a debt & wealth planner.",
    description:
      "Built by Team Joker — five KUET students — for the Shenzhen International FinTech Competition 2026. WealthPilot is a personal finance workspace: a multi-currency ledger that stores money as exact integer minor units, on-device import of CSV, Excel and PDF statements and photographed receipts (pdf.js and tesseract.js OCR), and an AI copilot that answers only from server-computed facts and never sees amounts or personal data. It adds explainable insights — recurring-payment detection, unusual-spending alerts and a 30/60/90-day cash forecast — a debt and wealth planner, and location-aware partner offers, with security built in: revocable sessions, CSRF checks, a hash-chained audit log, and GDPR export and erasure.",
    year: "2026",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "tesseract.js",
    ],
    highlights: [
      "Shenzhen International FinTech Competition 2026 — Team Joker",
      "AI copilot grounded in server-computed facts; nothing saved until you confirm",
      "On-device import of CSV, Excel, PDF statements and receipt photos",
      "Snowball vs avalanche payoff, loan comparison and country investment plans",
      "Hash-chained audit log, CSRF protection, GDPR export and erasure",
    ],
    link: "https://darkslategray-duck-848813.hostingersite.com/",
    repo: "https://github.com/aseerawsaf45-dev/WealthPilot",
    featured: true,
  },
  {
    slug: "3d-bytes-generators",
    type: "programming",
    title: "3D Bytes Platform",
    summary: "Storefront, admin panel, and in-browser Gridfinity generators for my 3D printing studio.",
    description:
      "The web platform for 3D Bytes, my 3D printing studio in Bangladesh. It is a Next.js 14 App Router site with a shop, custom-order flow and a Supabase back end — Postgres with row-level security, storage buckets, and email/password and Google sign-in — plus an admin panel for managing products. Its free tools include a Gridfinity Generator Suite that builds parametric organiser parts such as bins and baseplates: set the dimensions, preview in real time and download a print-ready STL, all in the browser, with OpenSCAD compiled to WebAssembly and Three.js previews.",
    year: "2026",
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Three.js",
      "OpenSCAD WASM",
    ],
    highlights: [
      "Gridfinity Generator Suite — real-time preview, print-ready STL download",
      "OpenSCAD compiled to WebAssembly, running entirely in the browser",
      "Supabase schema: 14 tables, row-level security, 4 storage buckets",
      "Email/password and Google sign-in, admin product management",
      "Logo-derived dark theme built on Radix UI primitives",
    ],
    link: "https://www.facebook.com/3dbytesbd",
    featured: true,
  },
  {
    slug: "kilo-flight-website",
    type: "programming",
    title: "Team Kilo Flight Website",
    summary: "Web portal for KUET's Formula Student team, with a Google Sheets-powered roster.",
    description:
      "The web portal for Team Kilo Flight, KUET's pioneer Formula Student racing team, built with Next.js (App Router), TypeScript and React. It presents the cars (KILOFLIGHT Phoenix and Alpha), the sub-teams and their engineering workflow, sponsorship tiers, recruitment, and an interactive telemetry simulator. The full team roster — roles, departments, bios and photos across seasons — is managed from Google Sheets, so non-technical members can update it without touching code, and a built-in fallback dataset keeps the site up even when the sheet is unreachable.",
    year: "2026",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Google Sheets",
    ],
    highlights: [
      "Google Sheets roster with season tabs, role filters and instant search",
      "Telemetry simulator: G-force chart, speedometer, RPM shift lights, lap timer",
      "Car pages for KILOFLIGHT Phoenix and Alpha with spec comparison",
      "Sponsorship tiers and a recruitment portal",
      "Offline fallback dataset for zero downtime",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/KILO-FLIGHT-WEBSITE",
  },
  {
    slug: "bengalsub-website",
    type: "programming",
    title: "BengalSub Website",
    summary: "Website for Tech Autocrats, the KUET RoboSub autonomous-underwater-vehicle team.",
    description:
      "The website for Tech Autocrats (Team BengalSub), a 26-engineer team building autonomous underwater vehicles for RoboSub, built while I led the website team. It presents the Hangor AUVs, the team, research articles and team activities behind a dive-themed interface: a depth gauge and sonar-style radar that follow your scroll, light and dark themes, and site-wide search, with Three.js 3D scenes and Framer Motion animation.",
    year: "2025",
    tech: [
      "React",
      "Three.js",
      "Framer Motion",
      "Tailwind CSS",
    ],
    highlights: [
      "Live at bengalsub.com for RoboSub",
      "Dive-themed UI: scroll-driven depth gauge and sonar radar",
      "Hangor 1.0 and 2.0 AUV showcase pages",
      "Research articles, team activities and site search",
      "Light and dark themes",
    ],
    link: "https://www.bengalsub.com/",
    repo: "https://github.com/gazi-faysal-jubayer/BengalSub-web",
  },
  {
    slug: "cairrl-lab-website",
    type: "programming",
    title: "CAIRRL Lab Website",
    summary: "Database-driven website and admin dashboard for KUET's robotics research lab.",
    description:
      "A full-stack platform for CAIRRL — the Centre for Advanced Intelligent Robotics Research Laboratory at KUET. Public pages cover research areas and projects, people, publications (with one-click BibTeX and DOI links), news, events, a gallery and a join-us page, while a role-protected dashboard lets faculty and student coordinators manage all of it without touching code. Every dashboard action writes to Neon Postgres through Prisma, and media is uploaded directly to S3-compatible storage.",
    year: "2026",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Neon Postgres",
      "S3",
    ],
    highlights: [
      "CRUD dashboard for people, publications, research, news, events and gallery",
      "Publications catalogue with filters, BibTeX copy and DOI links",
      "Prisma + Neon Postgres with direct S3 uploads",
      "Role-based admin access",
      "Planned from a detailed PRD with an 8-stage roadmap",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/cairrl-lab-website",
  },
  {
    slug: "mybookshelf",
    type: "programming",
    title: "myBookshelf",
    summary: "A cosy social reading tracker — library, reading sessions, lending and book clubs.",
    description:
      "A personal library app for tracking what you read, with a warm, illustrated design. Readers add books by ISBN lookup, organise collections and wishlists, log reading sessions and reviews, and follow their reading analytics; a social layer adds friends, a feed, book clubs, direct messages, and lending and borrowing books between friends. Built with Next.js, Supabase for auth and data, and Radix UI components.",
    year: "2026",
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Radix UI",
      "Recharts",
    ],
    highlights: [
      "ISBN lookup to add books quickly",
      "Reading sessions, reviews and analytics dashboards",
      "Friends, feed, book clubs and direct messages",
      "Lend and borrow books between friends",
      "GitHub and Google sign-in",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/mybookshelf",
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
    slug: "3d-model-viewer",
    type: "programming",
    title: "3D Model Viewer (Autodesk APS)",
    summary: "Browser viewer for CAD and BIM models, built on Autodesk Platform Services.",
    description:
      "A web viewer for CAD and BIM models built on Autodesk Platform Services (APS). An Express server authenticates with APS, uploads files to its object storage and translates them with the Model Derivative API; the front end opens the result in the APS Viewer with a model-browser tree, element properties, and measure and section tools — shown here with a Revit (.rvt) building model.",
    year: "2025",
    tech: [
      "JavaScript",
      "Express",
      "Autodesk APS",
      "React",
      "Vite",
    ],
    highlights: [
      "Upload models straight from the browser",
      "Model Derivative translation for formats such as Revit .rvt",
      "Model-browser tree and element properties panel",
      "Measure, section and navigation tools from the APS Viewer",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/3D-model-viewer",
  },
  {
    slug: "bookprise-scraper",
    type: "programming",
    title: "Book Price Comparison Scraper",
    summary: "Flask app that compares a book's price on Rokomari and Wafilife.",
    description:
      "A small Flask web app that searches two of Bangladesh's biggest online bookstores, Wafilife and Rokomari, for the same book and lists both prices side by side with links. It scrapes results with Requests and BeautifulSoup and matches titles and authors across the two stores, normalising Bangla vowel signs so different spellings line up, before rendering a comparison table.",
    year: "2024",
    tech: [
      "Python",
      "Flask",
      "BeautifulSoup",
      "Requests",
    ],
    highlights: [
      "Side-by-side prices and links from Wafilife and Rokomari",
      "Cross-store title and author matching with Bangla spelling normalisation",
      "Server-rendered Flask templates",
      "Built in 2024 — the stores' page layouts have since changed",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/bookprise-comparing-scraper",
  },
  {
    slug: "camscanner",
    type: "programming",
    title: "CamScanner Clone",
    summary: "OpenCV document scanner that crops pages from a live phone-camera feed into PDFs.",
    description:
      "A lightweight document scanner in Python. It reads frames from a phone used as an IP camera, finds the document with Gaussian blur, Canny edge detection and contour analysis, outlines the largest shape and, at a key press, crops it and saves it as a timestamped PDF.",
    year: "2023",
    tech: [
      "Python",
      "OpenCV",
      "NumPy",
      "Pillow",
    ],
    highlights: [
      "Live IP-camera feed from a phone",
      "Canny edges and largest-contour detection to find the page",
      "One key press saves a cropped, timestamped PDF",
    ],
    repo: "https://github.com/gazi-faysal-jubayer/gazis-camscanner-v1",
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
