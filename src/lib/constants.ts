export const PROFILE = {
  name: "Gazi Faysal Jubayer",
  firstName: "Gazi",
  tagline: "CAD designer | Programmer",
  headline: "Engineering precision meets digital craft.",
  bio: "As a dedicated and passionate professional in the fields of mechanical design, programming and software development, I bring a unique blend of engineering and IT expertise to the table. I thrive on solving complex problems and driving innovation.",
  email: "gazi.faysal.jubayer@gmail.com",
  phone: "+8801315669261",
  location: "Khulna, Bangladesh",
  github: "https://github.com/gazi-faysal-jubayer",
  linkedin: "https://www.linkedin.com/in/gazi-faysal-jubayer/",
  website: "https://gazi.faysal.jubayer",
} as const;

export const SKILLS = {
  engineering: [
    "SolidWorks",
    "AutoCAD",
    "Blender",
    "KeyShot",
    "Competitor analysis",
    "Business research",
    "Data Analysis",
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
    date: "August 2024",
    status: "Available online",
    doi: "https://doi.org/10.1016/j.tbench.2024.100172",
  },
] as const;

export const ACHIEVEMENTS = [
  {
    title: "Regional 1st Runner-Up and Global Nominee",
    event: "NASA International Space Apps Challenge 2023",
    date: "November 2023",
    description:
      "Recognized as 1st Runner-Up and Global Nominee, earning the title of Galactic Problem Solver for innovative contributions to the space industry.",
  },
  {
    title: "Regional 2nd Runner-Up and Global Nominee",
    event: "NASA International Space Apps Challenge 2024",
    date: "October 2024",
    description:
      "Earned 2nd Runner-Up and Global Nominee honors, along with the title of Galactic Problem Solver.",
  },
  {
    title: "2× Galactic Problem Solver",
    event: "NASA International Space Apps",
    date: "2023 – 2024",
    description:
      "Awarded Galactic Problem Solver in both the 2023 and 2024 NASA Space Apps Challenges.",
  },
  {
    title: "1st Runner-Up in National CAD Contest",
    event: "Calibration 1.0",
    date: "February 2024",
    description: "National CAD contest recognition for mechanical design excellence.",
  },
] as const;

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

export type ProjectType = "code" | "charity" | "mechanical" | "cad";

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
    slug: "uddhar",
    type: "charity",
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
    type: "code",
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
    slug: "nasa-space-apps-2023",
    type: "mechanical",
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
    type: "mechanical",
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
    slug: "portfolio",
    type: "code",
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
    slug: "mounting-bracket",
    type: "cad",
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
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export const PAGES = [
  { href: "/", label: "INDEX" },
  { href: "/work", label: "WORK" },
  { href: "/about", label: "ABOUT" },
  { href: "/experience", label: "LOG" },
  { href: "/contact", label: "CONTACT" },
] as const;
