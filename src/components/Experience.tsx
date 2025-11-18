import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Briefcase } from 'lucide-react'

interface ExperienceItem {
  company: string
  role: string
  period: string
  achievements: string[]
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      company: 'Shopify',
      role: 'Software Engineer Intern',
      period: 'September 2025 - December 2025',
      achievements: [
        'Supporting Checkout platform processing 500M+ transactions across Ruby/Rails, GraphQL, and TypeScript',
        'Reduced validation errors by 55% & latency by 20% by unifying React hooks & streamlining GraphQL logic',
        'Prevented 90+ E2E test flakes by implementing a Ruby Kafka writer wrapper that suppressed Monorail events during test runs'
      ]
    },
    {
      company: 'IBM',
      role: 'Machine Learning Engineer Intern',
      period: 'May 2025 - August 2025',
      achievements: [
        'Built Python FastMCP server enabling AI-powered debugging assistant for z/OS via Model Context Protocol (MCP), reducing developer troubleshooting time by 30%',
        'Contributed to Kubernetes open source project through IBM\'s jump start OSS program with core maintainers',
        'Integrated dynamic application security testing by containerizing OWASP ZAP with Podman into Jenkins CI/CD pipeline, saving 30+ annual work hours'
      ]
    },
    {
      company: 'IBM',
      role: 'Software Developer Intern',
      period: 'January 2025 - May 2025',
      achievements: [
        'Built secure REST API endpoints in Java/JAX-RS for IMS debugger configuration management for IBM Z/OS client generating $1M+ annual revenue',
        'Created CI/CD pipeline with Jenkins, Linux and shell scripting for deploying Java service on hybrid cloud',
        'Eliminated 50+ security vulnerabilities in C/C++ codebase using SonarQube static analysis'
      ]
    },
    {
      company: 'Squeak',
      role: 'Technical Founder',
      period: 'November 2024 - May 2025',
      achievements: [
        'Launched LLM-driven language learning platform generating revenue with 700+ users',
        'Built full-stack infrastructure using Supabase, React, Go with JWT authentication and PostgreSQL storage',
        'Deployed scalable backend with AWS Lambda/SQS and Terraform supporting distributed story generation',
        'Integrated RAG pipeline with Tavily/GCP Translation enabling multilingual story output'
      ]
    },
    {
      company: 'Autotrader',
      role: 'Software Developer Intern',
      period: 'January 2024 – May 2024',
      achievements: [
        'Built Linear Regression model with Scikit-Learn delivering analytics to 1,500+ dealerships',
        'Improved data accuracy by 85% optimizing processing algorithms with tabula library',
        'Automated data pipeline with Python scripts, CLI tools in Linux environment, saving 200+ hours annually',
        'Processed 5,000+ vehicle records with Pandas/SQL on Redash providing market insights',
        'Automated image uploads to 350+ websites with Python, saving 200+ hours annually'
      ]
    }
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Experience</h2>
      </div>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <Card key={index} className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-light-gray transition-colors group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-spotify-green rounded flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{exp.company}</h3>
                    <p className="text-spotify-text-secondary text-sm">{exp.role}</p>
                  </div>
                </div>
                <span className="text-spotify-text-secondary text-xs bg-spotify-light-gray px-3 py-1 rounded-full">
                  {exp.period}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-spotify-text-secondary text-sm flex items-start gap-2">
                    <span className="text-spotify-green mt-1.5">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Experience
