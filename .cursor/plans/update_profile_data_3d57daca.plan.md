---
name: Update Profile Data
overview: Update all personal information, work experience, education, skills, projects, achievements, and certifications throughout the GaziOS portfolio to match the actual resume.
todos:
  - id: update-api-calls
    content: Update API calls to fetch multiple editions (Arabic, Bengali, English)
    status: completed
  - id: add-translation-toggles
    content: Add UI controls for showing/hiding translations
    status: completed
  - id: implement-audio
    content: Implement working audio player with reciter selection
    status: completed
  - id: add-tafseer
    content: Add expandable Tafseer section for each Ayah
    status: completed
  - id: enhance-ui
    content: Enhance Ayah card layout with all new features
    status: completed
---

# Update Profile Data from Resume

## Overview

Comprehensively update all profile information across the project to accurately reflect the resume data provided.

## Files to Update

### 1. [`src/lib/constants.ts`](src/lib/constants.ts) - Main Data File

**PROFILE Section**:

- Email: `gazi@example.com` → `gazi.faysal.jubayer@gmail.com`
- GitHub: Update to `https://github.com/gazi-faysal-jubayer`
- LinkedIn: Update to `https://www.linkedin.com/in/gazi`
- Add: `phone: "+8801315669261"`
- Add: `location: "Khulna, Bangladesh"`
- Tagline: `"Bridging Mechanics and Software"` → `"CAD designer | Programmer"`
- Update bio to match resume introduction

**SKILLS Section**:

```typescript
engineering: [
  "SolidWorks", "AutoCAD", "Blender", "KeyShot",
  "Competitor analysis", "Business research", "Data Analysis"
]
programming: [
  "Python", "C", "Dart", "JavaScript", "TypeScript",
  "Next.js", "React", "Flutter", "Computer Vision"
]
```

**EDUCATION Section** - Replace completely:

```typescript
[
  {
    degree: "Bachelor of Science in Mechanical Engineering",
    institution: "Khulna University of Engineering and Technology",
    year: "2022 - 2027",
    location: "Khulna, Bangladesh"
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institution: "Khulna Public College",
    year: "2019 - 2021",
    location: "Khulna, Bangladesh"
  }
]
```

**EXPERIENCE Section** - Replace completely with 8 positions:

1. Assistant IT and Resources Officer at CADers (March 2024 - Present)
2. Chief Information Officer (CIO) at উদ্ধার - Uddhar (August 2024 - Present)
3. Co-Founder and Tech Lead at VSB - Virtual Solution Book (January 2024 - Present)
4. Campus Ambassador at SEAN Publication (October 2024 - Present)
5. Junior Marketing Executive at BANGLADESH 3DExperience & Solidworks User Group (October 2024 - Present)
6. Assistant Partnership Manager at Autodesk User Group Network Bangladesh (November 2024 - Present)
7. Trainee Member at Autonomous Sub-Team Team Durbar (July 2024 - Present)
8. Local Ambassador at মেঘ Magazine (February 2022 - 2023)

**Add PUBLICATIONS Section**:

```typescript
export const PUBLICATIONS = [
  {
    title: "Analyzing the impact of opportunistic maintenance optimization on manufacturing industries in Bangladesh: An empirical study",
    date: "August 2024",
    status: "Available online: 9",
    doi: "https://doi.org/10.1016/j.tbench.2024.100172"
  }
];
```

**Add ACHIEVEMENTS Section**:

```typescript
export const ACHIEVEMENTS = [
  {
    title: "Regional 1st Runner-Up and Global Nominee",
    event: "NASA International Space Apps Challenge 2023",
    date: "November 2023",
    description: "Galactic Problem Solver - space industry innovation"
  },
  {
    title: "Regional 2nd Runner-Up and Global Nominee",
    event: "NASA International Space Apps Challenge 2024",
    date: "October 2023",
    description: "Galactic Problem Solver - addressing critical issues"
  },
  {
    title: "1st Runner-Up in National CAD contest",
    event: "Calibration 1.0",
    date: "February 2024"
  }
];
```

**Add CERTIFICATIONS Section** - 7 certifications:

1. Solidworks Weldments Professional (CSWPA-WD) - July 2024
2. Solidworks Sheet Metal Professional (CSWPA-SM) - June 2024
3. Solidworks CAD Design Professional (CSWP) - June 2024
4. Solidworks CAD Design Associate (CSWA) - April 2024
5. Python Project for AI and Application Development - Credly/Pearson - April 2024
6. Developing AI Applications with Python and Flask - IBM Coursera - April 2024

**Add LANGUAGES Section**:

```typescript
export const LANGUAGES = [
  { name: "Bangla", level: "Native" },
  { name: "English", level: "Professional" }
];
```

**Update RESUME_CONTENT** - Complete rewrite to match actual resume with all work experience, achievements, certifications in proper text format.

### 2. [`src/app/layout.tsx`](src/app/layout.tsx)

Update metadata description:

```
"A Windows 11 themed portfolio website for Gazi Faysal Jubayer - CAD Designer, Programmer, and Mechanical Engineering Student"
```

Update keywords:

```
["portfolio", "CAD designer", "programmer", "mechanical engineer", "Next.js", "SolidWorks", "Windows 11"]
```

### 3. Auto-Update Areas

The following files import from constants.ts and will automatically reflect changes:

- [`src/components/os/BootScreen.tsx`](src/components/os/BootScreen.tsx) - Uses PROFILE name
- [`src/components/os/StartMenu.tsx`](src/components/os/StartMenu.tsx) - Uses PROFILE and SKILLS
- [`src/components/apps/Terminal.tsx`](src/components/apps/Terminal.tsx) - Uses PROFILE, SKILLS, EDUCATION, EXPERIENCE
- [`src/components/apps/Browser.tsx`](src/components/apps/Browser.tsx) - Uses PROFILE links
- [`src/components/apps/Settings.tsx`](src/components/apps/Settings.tsx) - Uses PROFILE name
- [`src/components/apps/Notepad.tsx`](src/components/apps/Notepad.tsx) - Uses RESUME_CONTENT

## Key Data Points from Resume

- **Current Position**: Multiple roles including CIO at Uddhar, Tech Lead at VSB
- **Education**: KUET Mechanical Engineering (2022-2027), currently enrolled
- **Location**: Khulna, Bangladesh
- **Top Achievement**: 2x NASA Space Apps Challenge winner (Regional Runner-Up, Global Nominee)
- **Certifications**: 4 SolidWorks professional certifications + AI/Python certs
- **Publication**: Peer-reviewed research on manufacturing optimization
- **Skills Focus**: CAD design (SolidWorks, AutoCAD), Programming (Python, JS, Dart, Flutter)