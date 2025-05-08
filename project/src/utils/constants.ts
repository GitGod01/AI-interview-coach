import { Role } from '../types';
import { BriefcaseIcon, CodeIcon, HeartPulseIcon, ServerIcon, LineChartIcon, PencilIcon } from 'lucide-react';

export const ROLES: Role[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Technical interview for software development positions',
    icon: CodeIcon.name,
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Interview focusing on product development and management',
    icon: BriefcaseIcon.name,
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Technical interview for data science and analytics roles',
    icon: LineChartIcon.name,
  },
  {
    id: 'healthcare',
    title: 'Healthcare Professional',
    description: 'Interview for various healthcare positions',
    icon: HeartPulseIcon.name,
  },
  {
    id: 'designer',
    title: 'UX/UI Designer',
    description: 'Interview for design roles focusing on user experience',
    icon: PencilIcon.name,
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Technical interview for DevOps and infrastructure roles',
    icon: ServerIcon.name,
  },
];

export const SAMPLE_QUESTIONS = {
  'software-engineer': [
    "Can you explain how you would design a scalable web application?",
    "What's your experience with React or similar frontend frameworks?",
    "How do you approach debugging a complex issue?",
    "Tell me about a challenging project you worked on recently.",
    "How do you stay updated with the latest technologies?",
  ],
  'product-manager': [
    "How do you prioritize features in a product backlog?",
    "Describe how you would validate a new product idea.",
    "How do you handle stakeholder disagreements?",
    "Tell me about a product you launched from concept to completion.",
    "How do you measure the success of a product?",
  ],
  'data-scientist': [
    "Explain how you would approach a classification problem.",
    "What techniques do you use for feature selection?",
    "How do you handle imbalanced datasets?",
    "Describe a data project where you provided actionable insights.",
    "How do you communicate technical findings to non-technical stakeholders?",
  ],
  'healthcare': [
    "How do you handle high-pressure situations?",
    "Describe your approach to patient care.",
    "How do you stay updated with the latest medical research?",
    "Tell me about a challenging case you handled.",
    "How do you collaborate with other healthcare professionals?",
  ],
  'designer': [
    "Walk me through your design process.",
    "How do you incorporate user feedback into your designs?",
    "Describe a project where you improved user experience significantly.",
    "How do you balance aesthetics with functionality?",
    "How do you advocate for user needs in the development process?",
  ],
  'devops': [
    "How do you approach CI/CD pipeline design?",
    "Describe your experience with containerization.",
    "How do you handle system failures or outages?",
    "What monitoring tools do you use and why?",
    "How do you balance security with development speed?",
  ],
};

export const FEEDBACK_TEMPLATES = [
  "Your answer was {quality}. {strength}. However, {improvement}.",
  "I noticed that you {observation}. This shows {quality}. To improve, consider {suggestion}.",
  "Your response demonstrates {strength}. To make it even stronger, try {improvement}.",
  "That's a {quality} answer. {strength}. For future interviews, remember to {suggestion}.",
];