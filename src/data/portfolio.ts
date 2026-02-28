export interface Experience {
  company: string;
  role: string;
  period: string;
  duration: string;
  achievements: string[];
}

export interface Project {
  name: string;
  technologies: string[];
  description: string;
}

export const experiences: Experience[] = [
  {
    company: 'Shopify',
    role: 'Software Engineer Intern',
    period: 'Sep 2025',
    duration: '4 mos',
    achievements: [
      'Supporting Checkout platform processing 500M+ transactions across Ruby/Rails, GraphQL, and TypeScript',
      'Reduced validation errors by 55% & latency by 20% by unifying React hooks & streamlining GraphQL logic',
      'Prevented 90+ E2E test flakes by implementing a Ruby Kafka writer wrapper that suppressed Monorail events during test runs',
    ],
  },
  {
    company: 'IBM',
    role: 'Machine Learning Engineer Intern',
    period: 'May 2025',
    duration: '4 mos',
    achievements: [
      'Built Python FastMCP server enabling AI-powered debugging assistant for z/OS via Model Context Protocol (MCP), reducing developer troubleshooting time by 30%',
      "Contributed to Kubernetes open source project through IBM's jump start OSS program with core maintainers",
      'Integrated dynamic application security testing by containerizing OWASP ZAP with Podman into Jenkins CI/CD pipeline, saving 30+ annual work hours',
    ],
  },
  {
    company: 'IBM',
    role: 'Software Developer Intern',
    period: 'Jan 2025',
    duration: '5 mos',
    achievements: [
      'Built secure REST API endpoints in Java/JAX-RS for IMS debugger configuration management for IBM Z/OS client generating $1M+ annual revenue',
      'Created CI/CD pipeline with Jenkins, Linux and shell scripting for deploying Java service on hybrid cloud',
      'Eliminated 50+ security vulnerabilities in C/C++ codebase using SonarQube static analysis',
    ],
  },
  {
    company: 'Squeak',
    role: 'Technical Founder',
    period: 'Nov 2024',
    duration: '7 mos',
    achievements: [
      'Launched LLM-driven language learning platform generating revenue with 700+ users',
      'Built full-stack infrastructure using Supabase, React, Go with JWT authentication and PostgreSQL storage',
      'Deployed scalable backend with AWS Lambda/SQS and Terraform supporting distributed story generation',
      'Integrated RAG pipeline with Tavily/GCP Translation enabling multilingual story output',
    ],
  },
  {
    company: 'Autotrader',
    role: 'Software Developer Intern',
    period: 'Jan 2024',
    duration: '5 mos',
    achievements: [
      'Built Linear Regression model with Scikit-Learn delivering analytics to 1,500+ dealerships',
      'Improved data accuracy by 85% optimizing processing algorithms with tabula library',
      'Automated data pipeline with Python scripts, CLI tools in Linux environment, saving 200+ hours annually',
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'Squeak',
    technologies: ['React', 'Go', 'Supabase', 'AWS'],
    description:
      'LLM-driven language learning platform with 700+ users. Built full-stack infrastructure with Supabase, React, Go with JWT authentication.',
  },
  {
    name: 'PickUp',
    technologies: ['Express.js', 'React', 'Material UI', 'Docker', 'AWS'],
    description:
      'Full-stack web application with Express.js backend and React frontend. Implemented Google OAuth authentication and deployed on AWS RDS.',
  },
  {
    name: 'Caitlyn',
    technologies: ['C++', 'Docker', 'Intel Embree', 'CUDA'],
    description:
      'Ray-tracing renderer using C++, Embree, CUDA. Optimized rendering speeds by 53% using GPU acceleration.',
  },
];
