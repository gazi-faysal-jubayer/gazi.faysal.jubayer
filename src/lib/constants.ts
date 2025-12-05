export const PROFILE = {
  name: "Gazi Faysal Jubayer",
  tagline: "CAD designer | Programmer",
  bio: "As a dedicated and passionate professional in the fields of mechanical design, programming and software development, I bring a unique blend of engineering and IT expertise to the table. I thrive on solving complex problems and driving innovation.",
  email: "gazi.faysal.jubayer@gmail.com",
  phone: "+8801315669261",
  location: "Khulna, Bangladesh",
  github: "https://github.com/gazi-faysal-jubayer",
  linkedin: "https://www.linkedin.com/in/gazi",
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

export const EXPERIENCE = [
  {
    title: "Assistant IT and Resources Officer",
    company: "CADers",
    period: "March 2024 - Present",
    description: "CADers is a club of KUET which works with CAD (Computer Aided Design).",
  },
  {
    title: "Chief Information Officer (CIO)",
    company: "উদ্ধার - Uddhar",
    period: "August 2024 - Present",
    description:
      "During the Flood of 2024 in Feni, Bangladesh, I with some of my friends created this charity website and organization, uddharbd.org, to help people during the time of disaster. From then, we work continuously. Now, our team has about 30 members along with volunteers. We will publish our app version soon.",
  },
  {
    title: "Co-Founder and Tech Lead",
    company: "VSB - Virtual Solution Book",
    period: "January 2024 - Present",
    description:
      "vsbbd.com is a platform where we provide solutions the problems of the students of HSC and admission students.",
  },
  {
    title: "Campus Ambassador",
    company: "SEAN Publication",
    period: "October 2024 - Present",
    description: "",
  },
  {
    title: "Junior Marketing Executive",
    company: "BANGLADESH 3DExperience & Solidworks User Group netwoRk",
    period: "October 2024 - Present",
    description: "",
  },
  {
    title: "Assistant Partnership Manager",
    company: "Autodesk User Group Network Bangladesh",
    period: "November 2024 - Present",
    description: "",
  },
  {
    title: "Trainee Member at Autonomous Sub-Team",
    company: "Team Durbar",
    period: "July 2024 - Present",
    description: "",
  },
  {
    title: "Local Ambassador",
    company: "মেঘ Magazine",
    period: "February 2022 - 2023",
    description: "",
  },
] as const;

export const PUBLICATIONS = [
  {
    title:
      "Analyzing the impact of opportunistic maintenance optimization on manufacturing industries in Bangladesh: An empirical study",
    date: "August 2024",
    status: "Available online: 9",
    doi: "https://doi.org/10.1016/j.tbench.2024.100172",
  },
] as const;

export const ACHIEVEMENTS = [
  {
    title: "Regional 1st Runner-Up and Global Nominee",
    event: "NASA International Space Apps Challenge 2023",
    date: "November 2023",
    description:
      "I participated in the NASA Space App Challenge 2023, an international hackathon addressing global challenges through collaboration. Our team was recognized as 1st Runner-Up and Global Nominee, earning me the title of Galactic Problem Solver for innovative contributions to the space industry and real-world problem-solving.",
  },
  {
    title: "Regional 2nd Runner-Up and Global Nominee",
    event: "NASA International Space Apps Challenge 2024",
    date: "October 2023",
    description:
      "I participated in the NASA Space App Challenge 2024, a global hackathon focused on solving real-world challenges through innovation and teamwork. Our project earned 2nd Runner-Up and Global Nominee honors, along with the title of Galactic Problem Solver, recognizing my contributions to addressing critical issues in the space industry.",
  },
  {
    title: "2 Time Galactic Problem Solver Titel",
    event: "NASA International Space Apps",
    date: "November 2023 - October 2023",
    description: "First Time in the NASA Space App Challenge 2023. Second Time in the NASA Space App Challenge 2024.",
  },
  {
    title: "1st Runner-Up in National CAD contest",
    event: "Calibration 1.0",
    date: "February 2024",
    description: "",
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

export const PROJECTS = [
  {
    id: "proj_1",
    type: "code",
    title: "GaziOS Portfolio",
    description: "This website - a Windows 11 themed portfolio built with Next.js",
    tech: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion"],
    link: "/",
  },
  {
    id: "proj_2",
    type: "charity",
    title: "উদ্ধার - Uddhar",
    description: "Charity website and organization helping people during disasters",
    tech: ["Next.js", "React", "Database"],
    link: "https://uddharbd.org",
  },
  {
    id: "proj_3",
    type: "code",
    title: "VSB - Virtual Solution Book",
    description: "Platform providing solutions for HSC and admission students",
    tech: ["Web Development", "Educational Platform"],
    link: "https://vsbbd.com",
  },
  {
    id: "proj_4",
    type: "mechanical",
    title: "NASA Space Apps Challenge 2023",
    description: "Galactic Problem Solver - Regional 1st Runner-Up and Global Nominee",
    tech: ["Innovation", "Problem Solving", "Collaboration"],
  },
  {
    id: "proj_5",
    type: "mechanical",
    title: "NASA Space Apps Challenge 2024",
    description: "Galactic Problem Solver - Regional 2nd Runner-Up and Global Nominee",
    tech: ["Innovation", "Problem Solving", "Teamwork"],
  },
] as const;

export const WALLPAPERS = [
  {
    id: "default",
    name: "Windows Default",
    type: "gradient",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "mechanical",
    name: "Mechanical Blueprint",
    type: "gradient",
    value: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: "circuit",
    name: "Circuit Board",
    type: "gradient",
    value: "linear-gradient(135deg, #0c0c0c 0%, #1a472a 50%, #2d5a27 100%)",
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    type: "gradient",
    value: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
  },
  {
    id: "sunset",
    name: "Sunset",
    type: "gradient",
    value: "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)",
  },
  {
    id: "dark",
    name: "Pure Dark",
    type: "solid",
    value: "#0a0a0a",
  },
] as const;

export const NOTIFICATIONS = [
  {
    id: "1",
    title: "New commit pushed",
    message: "Gazi just pushed to GaziOS Portfolio",
    time: "2 hours ago",
    icon: "git",
  },
  {
    id: "2",
    title: "Certificate earned",
    message: "SolidWorks Professional (CSWP) certified",
    time: "5 hours ago",
    icon: "award",
  },
  {
    id: "3",
    title: "Achievement unlocked",
    message: "NASA Space Apps 2x winner",
    time: "1 day ago",
    icon: "trophy",
  },
] as const;

export const FILE_SYSTEM = {
  "C:": {
    name: "Local Disk (C:)",
    type: "drive",
    children: {
      Projects: {
        name: "Projects",
        type: "folder",
        children: {
          Code: {
            name: "Code",
            type: "folder",
            children: {
              "gazios-portfolio": {
                name: "gazios-portfolio",
                type: "project",
                projectId: "proj_1",
              },
              "uddhar-website": {
                name: "uddhar-website",
                type: "project",
                projectId: "proj_2",
              },
              "vsb-platform": {
                name: "vsb-platform",
                type: "project",
                projectId: "proj_3",
              },
            },
          },
        },
      },
      Users: {
        name: "Users",
        type: "folder",
        children: {
          Gazi: {
            name: "Gazi",
            type: "folder",
            children: {
              Documents: {
                name: "Documents",
                type: "folder",
                children: {
                  "Resume.pdf": {
                    name: "Resume.pdf",
                    type: "file",
                    fileType: "pdf",
                  },
                  "Publication.pdf": {
                    name: "Publication.pdf",
                    type: "file",
                    fileType: "pdf",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "D:": {
    name: "Data (D:)",
    type: "drive",
    children: {
      Projects: {
        name: "Projects",
        type: "folder",
        children: {
          CAD: {
            name: "CAD",
            type: "folder",
            children: {
              "solidworks-projects": {
                name: "solidworks-projects",
                type: "folder",
              },
              "autocad-designs": {
                name: "autocad-designs",
                type: "folder",
              },
            },
          },
        },
      },
    },
  },
  "E:": {
    name: "Storage (E:)",
    type: "drive",
    children: {
      Documents: {
        name: "Documents",
        type: "folder",
        children: {
          Certificates: {
            name: "Certificates",
            type: "folder",
            children: {
              "CSWPA-WD.pdf": {
                name: "CSWPA-WD.pdf",
                type: "file",
                fileType: "pdf",
              },
              "CSWPA-SM.pdf": {
                name: "CSWPA-SM.pdf",
                type: "file",
                fileType: "pdf",
              },
              "CSWP.pdf": {
                name: "CSWP.pdf",
                type: "file",
                fileType: "pdf",
              },
              "CSWA.pdf": {
                name: "CSWA.pdf",
                type: "file",
                fileType: "pdf",
              },
              "Python-AI-Cert.pdf": {
                name: "Python-AI-Cert.pdf",
                type: "file",
                fileType: "pdf",
              },
              "IBM-Flask-Cert.pdf": {
                name: "IBM-Flask-Cert.pdf",
                type: "file",
                fileType: "pdf",
              },
            },
          },
          Achievements: {
            name: "Achievements",
            type: "folder",
            children: {
              "NASA-2023.pdf": {
                name: "NASA-2023.pdf",
                type: "file",
                fileType: "pdf",
              },
              "NASA-2024.pdf": {
                name: "NASA-2024.pdf",
                type: "file",
                fileType: "pdf",
              },
            },
          },
        },
      },
    },
  },
} as const;

export const CODE_SNIPPETS = {
  "gazios-portfolio": {
    language: "typescript",
    filename: "useOSStore.ts",
    code: `import { create } from 'zustand';

interface Window {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface OSState {
  windows: Window[];
  activeWindowId: string | null;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
}

export const useOSStore = create<OSState>((set) => ({
  windows: [],
  activeWindowId: null,
  openWindow: (id) => set((state) => ({
    windows: [...state.windows, { 
      id, 
      title: id,
      isMinimized: false,
      isMaximized: false,
      zIndex: state.windows.length + 1
    }],
    activeWindowId: id
  })),
  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id)
  })),
}));`,
  },
  "uddhar-website": {
    language: "javascript",
    filename: "charity.js",
    code: `// Uddhar - Charity Platform
// Helping people during disasters

const donationManager = {
  campaigns: [],
  volunteers: [],
  
  async createCampaign(name, goal, location) {
    const campaign = {
      id: Date.now(),
      name,
      goal,
      raised: 0,
      location,
      status: 'active'
    };
    this.campaigns.push(campaign);
    return campaign;
  },
  
  async processDonation(campaignId, amount) {
    const campaign = this.campaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.raised += amount;
      return { success: true, message: 'Donation processed' };
    }
    return { success: false, message: 'Campaign not found' };
  }
};`,
  },
  "vsb-platform": {
    language: "python",
    filename: "solutions.py",
    code: `# VSB - Virtual Solution Book
# Educational platform for HSC students

class SolutionProvider:
    def __init__(self):
        self.subjects = ['Physics', 'Chemistry', 'Math', 'Biology']
        self.solutions = {}
    
    def add_solution(self, subject, chapter, problem, solution):
        key = f"{subject}_{chapter}_{problem}"
        self.solutions[key] = {
            'subject': subject,
            'chapter': chapter,
            'problem': problem,
            'solution': solution,
            'views': 0
        }
    
    def get_solution(self, subject, chapter, problem):
        key = f"{subject}_{chapter}_{problem}"
        if key in self.solutions:
            self.solutions[key]['views'] += 1
            return self.solutions[key]
        return None
    
    def search_solutions(self, query):
        results = []
        for solution in self.solutions.values():
            if query.lower() in solution['problem'].lower():
                results.append(solution)
        return results`,
  },
} as const;

export const RESUME_CONTENT = `
═══════════════════════════════════════════════════════════════
                    GAZI FAYSAL JUBAYER
                CAD designer | Programmer
═══════════════════════════════════════════════════════════════

CONTACT
───────────────────────────────────────────────────────────────
Location: Khulna, Bangladesh
Phone: +8801315669261
Email: gazi.faysal.jubayer@gmail.com
LinkedIn: linkedin.com/in/gazi
GitHub: github.com/gazi-faysal-jubayer

PROFESSIONAL SUMMARY
───────────────────────────────────────────────────────────────
As a dedicated and passionate professional in the fields of 
mechanical design, programming and software development, I bring
a unique blend of engineering and IT expertise to the table. 
I thrive on solving complex problems and driving innovation.

WORK EXPERIENCE
───────────────────────────────────────────────────────────────
Assistant IT and Resources Officer
CADers | March 2024 - Present
• CADers is a club of KUET which works with CAD (Computer 
  Aided Design).

Chief Information Officer (CIO)
উদ্ধার - Uddhar | August 2024 - Present
• Created charity website uddharbd.org during Flood 2024
• Team has about 30 members along with volunteers
• App version coming soon

Co-Founder and Tech Lead
VSB - Virtual Solution Book | January 2024 - Present
• vsbbd.com provides solutions for HSC and admission students

Campus Ambassador
SEAN Publication | October 2024 - Present

Junior Marketing Executive
BANGLADESH 3DExperience & Solidworks User Group
October 2024 - Present

Assistant Partnership Manager
Autodesk User Group Network Bangladesh
November 2024 - Present

Trainee Member at Autonomous Sub-Team
Team Durbar | July 2024 - Present

Local Ambassador
মেঘ Magazine | February 2022 - 2023

EDUCATION
───────────────────────────────────────────────────────────────
Mechanical Engineering
Khulna University of Engineering and Technology
2022 - 2027 | Khulna, Bangladesh

HSC at science department
Khulna Public College
2019 - 2021 | Khulna, Bangladesh

PUBLICATION
───────────────────────────────────────────────────────────────
Analyzing the impact of opportunistic maintenance 
optimization on manufacturing industries in Bangladesh: 
An empirical study
August 2024 | Available online: 9
DOI: https://doi.org/10.1016/j.tbench.2024.100172

ACHIEVEMENTS
───────────────────────────────────────────────────────────────
Regional 1st Runner-Up and Global Nominee
NASA International Space Apps Challenge 2023
November 2023
• Earned title of Galactic Problem Solver
• Innovative contributions to space industry

Regional 2nd Runner-Up and Global Nominee
NASA International Space Apps Challenge 2024
October 2023
• 2nd time Galactic Problem Solver
• Addressing critical issues in space industry

2 Time Galactic Problem Solver Title
NASA International Space Apps
• First Time: Challenge 2023
• Second Time: Challenge 2024

1st Runner-Up in National CAD contest
Calibration 1.0 | February 2024

LICENSES & CERTIFICATIONS
───────────────────────────────────────────────────────────────
Solidworks Weldments Professional (CSWPA-WD)
Dassault Systèmes | July 2024
Credential: cv.virtualtester.com/qr/?b=SLDWRKS&i=C-FDSF19ASCX

Solidworks Sheet Metal Professional (CSWPA-SM)
Dassault Systèmes | June 2024
Credential: cv.virtualtester.com/qr/?b=SLDWRKS&i=C-RAFH5TKCCV

Solidworks CAD Design Professional (CSWP)
Dassault Systèmes | June 2024
Credential: cv.virtualtester.com/qr/?b=SLDWRKS&i=C-XRLJHD7BAM

Solidworks CAD Design Associate (CSWA)
Dassault Systèmes | April 2024
Credential: cv.virtualtester.com/qr/?b=SLDWRKS&i=C-GT9ZTD3EUK

Python Project for AI and Application Development
Credly by Pearson | April 2024
Credential: credly.com/badges/6ea01fb6-f78d-424f-a040-
            62e72b3dcb8b/public_url

Developing AI Applications with Python and Flask by IBM
Coursera | April 2024
Credential: coursera.org/account/accomplishments/certificate/
            Z5T6FJDAQR

SKILLS
───────────────────────────────────────────────────────────────
Engineering:   SolidWorks, AutoCAD, Blender, KeyShot
               Competitor analysis, Business research
               Data Analysis

Programming:   Python, C, Dart, JavaScript, TypeScript
               Next.js, React, Flutter, Computer Vision

LANGUAGES
───────────────────────────────────────────────────────────────
Bangla - Native
English - Professional

═══════════════════════════════════════════════════════════════
`;
