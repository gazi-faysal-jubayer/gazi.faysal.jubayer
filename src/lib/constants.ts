export const PROFILE = {
  name: "Gazi Faysal Jubayer",
  tagline: "Bridging Mechanics and Software",
  bio: "A Mechanical Engineer passionate about automation, CAD design, and full-stack web development.",
  email: "gazi@example.com",
  github: "https://github.com/gazifaysaljubayer",
  linkedin: "https://linkedin.com/in/gazifaysaljubayer",
} as const;

export const SKILLS = {
  engineering: ["SolidWorks", "AutoCAD", "ANSYS", "Thermodynamics", "Matlab"],
  programming: ["Next.js", "Python", "C++", "Three.js", "React", "TypeScript"],
} as const;

export const PROJECTS = [
  {
    id: "proj_1",
    type: "code",
    title: "Portfolio OS",
    description: "This website - a Windows 11 themed portfolio built with Next.js",
    tech: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
    link: "/",
  },
  {
    id: "proj_2",
    type: "mechanical",
    title: "Gearbox Assembly",
    description: "3D CAD Model and Stress Analysis of a multi-stage gearbox",
    tech: ["SolidWorks", "ANSYS"],
  },
  {
    id: "proj_3",
    type: "code",
    title: "Automation Dashboard",
    description: "Real-time monitoring dashboard for industrial sensors",
    tech: ["React", "Python", "MQTT"],
  },
  {
    id: "proj_4",
    type: "mechanical",
    title: "Heat Exchanger Design",
    description: "Shell and tube heat exchanger with thermal analysis",
    tech: ["AutoCAD", "Matlab"],
  },
] as const;

export const EDUCATION = [
  {
    degree: "Bachelor of Science in Mechanical Engineering",
    institution: "Bangladesh University of Engineering & Technology",
    year: "2020 - 2024",
    gpa: "3.75/4.00",
  },
] as const;

export const EXPERIENCE = [
  {
    title: "Mechanical Design Intern",
    company: "Example Engineering Ltd.",
    period: "Jun 2023 - Aug 2023",
    description: "Assisted in CAD modeling and FEA analysis of mechanical components.",
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
    message: "Gazi just pushed to portfolio-os",
    time: "2 hours ago",
    icon: "git",
  },
  {
    id: "2",
    title: "CAD design updated",
    message: "Gearbox assembly revision 3.2",
    time: "5 hours ago",
    icon: "cube",
  },
  {
    id: "3",
    title: "Certificate earned",
    message: "Completed Advanced SolidWorks",
    time: "1 day ago",
    icon: "award",
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
              "portfolio-os": {
                name: "portfolio-os",
                type: "project",
                projectId: "proj_1",
              },
              "automation-dashboard": {
                name: "automation-dashboard",
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
              "gearbox-assembly": {
                name: "gearbox-assembly",
                type: "project",
                projectId: "proj_2",
              },
              "heat-exchanger": {
                name: "heat-exchanger",
                type: "project",
                projectId: "proj_4",
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
              "SolidWorks-Cert.pdf": {
                name: "SolidWorks-Cert.pdf",
                type: "file",
                fileType: "pdf",
              },
              "React-Cert.pdf": {
                name: "React-Cert.pdf",
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
  "portfolio-os": {
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
  "automation-dashboard": {
    language: "python",
    filename: "sensor_monitor.py",
    code: `import paho.mqtt.client as mqtt
import json
from datetime import datetime

class SensorMonitor:
    def __init__(self, broker: str, port: int = 1883):
        self.client = mqtt.Client()
        self.client.on_message = self.on_message
        self.client.connect(broker, port)
        self.data_buffer = []
    
    def on_message(self, client, userdata, msg):
        payload = json.loads(msg.payload)
        reading = {
            'timestamp': datetime.now().isoformat(),
            'sensor_id': payload['id'],
            'temperature': payload['temp'],
            'pressure': payload['pressure']
        }
        self.data_buffer.append(reading)
        self.process_reading(reading)
    
    def process_reading(self, reading: dict):
        if reading['temperature'] > 85:
            self.trigger_alert('HIGH_TEMP', reading)
        if reading['pressure'] > 150:
            self.trigger_alert('HIGH_PRESSURE', reading)
    
    def start(self):
        self.client.subscribe('sensors/#')
        self.client.loop_forever()`,
  },
} as const;

export const RESUME_CONTENT = `
═══════════════════════════════════════════════════════════════
                    GAZI FAYSAL JUBAYER
               Mechanical Engineer & Developer
═══════════════════════════════════════════════════════════════

CONTACT
───────────────────────────────────────────────────────────────
Email: gazi@example.com
GitHub: github.com/gazifaysaljubayer
LinkedIn: linkedin.com/in/gazifaysaljubayer
Location: Dhaka, Bangladesh

PROFESSIONAL SUMMARY
───────────────────────────────────────────────────────────────
Mechanical Engineering graduate with a strong foundation in 
CAD design, thermal analysis, and programming. Passionate about
bridging the gap between traditional engineering and modern
software development. Experienced in creating automation tools
and web applications that solve real engineering problems.

EDUCATION
───────────────────────────────────────────────────────────────
Bachelor of Science in Mechanical Engineering
Bangladesh University of Engineering & Technology
2020 - 2024 | GPA: 3.75/4.00

TECHNICAL SKILLS
───────────────────────────────────────────────────────────────
Engineering:    SolidWorks, AutoCAD, ANSYS, Matlab
                Thermodynamics, Fluid Mechanics, FEA

Programming:    Python, JavaScript/TypeScript, C++
                React, Next.js, Three.js, Node.js

Tools:          Git, Docker, Linux, VS Code

PROJECTS
───────────────────────────────────────────────────────────────
Portfolio OS (2024)
  - Windows 11 themed portfolio website using Next.js
  - Interactive 3D CAD model viewer with Three.js
  - Custom terminal emulator with portfolio commands

Gearbox Assembly Design (2023)
  - Multi-stage gearbox design in SolidWorks
  - Stress analysis and optimization using ANSYS
  - Reduced weight by 15% while maintaining strength

Automation Dashboard (2023)
  - Real-time sensor monitoring system
  - MQTT protocol for IoT communication
  - Python backend with React frontend

EXPERIENCE
───────────────────────────────────────────────────────────────
Mechanical Design Intern | Example Engineering Ltd.
June 2023 - August 2023
  - Assisted in CAD modeling of industrial components
  - Performed FEA analysis for structural optimization
  - Created technical documentation and drawings

CERTIFICATIONS
───────────────────────────────────────────────────────────────
- Certified SolidWorks Associate (CSWA)
- React Developer Certificate - Meta

═══════════════════════════════════════════════════════════════
`;

