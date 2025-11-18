import React from 'react'
import { Card, CardContent } from './ui/card'
import { User, MapPin, Calendar, Briefcase, Plane, Heart } from 'lucide-react'

const About: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">About</h2>
      </div>
      <Card className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-light-gray transition-colors">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-spotify-green" />
                  Who I Am
                </h3>
                <p className="text-spotify-text-secondary leading-relaxed">
                  I'm a Computer Science student at 
                  <span className="inline-flex items-center gap-1 mx-1">
                    <img src="/images/waterloo.jpeg" alt="UW" className="w-5 h-5 rounded-full object-cover inline" />
                    <span className="text-spotify-green font-semibold">University of Waterloo</span>
                  </span>
                  with a passion for building intelligent backend systems. From AI-powered debugging assistants to distributed LLM pipelines, 
                  I love architecting systems that solve real problems at scale. Whether it's optimizing Shopify's 
                  checkout for 500M+ transactions or building FastMCP servers for IBM's z/OS, I'm all about 
                  performance, scalability, and clean architecture.
                </p>
              </div>
              
              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-spotify-green" />
                  What I Do
                </h3>
                <p className="text-spotify-text-secondary leading-relaxed">
                  Currently building at <span className="text-spotify-green font-semibold">Shopify</span>, 
                  where I work on Checkout infrastructure with Ruby on Rails, TypeScript, and GraphQL. 
                  Previously, I built AI debugging assistants at <span className="text-spotify-green font-semibold">IBM</span>, 
                  founded <span className="text-spotify-green font-semibold">Squeak</span> (an LLM-powered language learning platform), 
                  and contributed to open-source projects like Kubernetes. I specialize in backend systems, 
                  AI/ML integration, and performance optimization.
                </p>
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-spotify-green" />
                  Beyond Code
                </h3>
                <p className="text-spotify-text-secondary leading-relaxed">
                  2025 was wild! Got my first tattoo, traveled to Tokyo 🇯🇵, LA, SF, NYC, and Chicago. 
                  When I'm not shipping code, you'll find me exploring new cities, hanging out with friends, 
                  or planning my next adventure.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-spotify-green" />
                  Location
                </h3>
                <p className="text-spotify-text-secondary">
                  Waterloo, Ontario, Canada
                </p>
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-spotify-green" />
                  Current Status
                </h3>
                <p className="text-spotify-text-secondary">
                  Software Engineer Intern @ Shopify
                  <br />
                  <span className="text-spotify-green">Graduating June 2027</span>
                </p>
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-spotify-green" />
                  2025 Adventures
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['🇯🇵 Japan', '🌴 LA', '🌉 SF', '🗽 NYC', '🌆 Chicago', '💉 First Tattoo'].map((adventure, i) => (
                    <span key={i} className="px-3 py-1.5 bg-spotify-light-gray text-white text-sm rounded-full hover:bg-spotify-green transition-colors cursor-default">
                      {adventure}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {['Backend Systems', 'AI/ML', 'Distributed Systems', 'Performance Optimization', 'Open Source', 'Cloud Infrastructure'].map((interest, i) => (
                    <span key={i} className="px-3 py-1.5 bg-spotify-light-gray text-white text-sm rounded-full hover:bg-spotify-green transition-colors cursor-default">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default About
