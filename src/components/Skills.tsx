import React from 'react'

interface SkillCategory {
  title: string
  skills: string[]
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      skills: ['Ruby', 'Go', 'Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS']
    },
    {
      title: 'Frameworks & Tools',
      skills: ['Rails', 'React', 'Express', 'Docker', 'K8s', 'AWS', 'GCP', 'Postgres', 'Terraform', 'Git']
    }
  ]

  const getGradient = (name: string) => {
    const gradients = [
      'from-red-500 to-orange-500',
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
    ]
    const index = name.length % gradients.length
    return gradients[index]
  }

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <section className="mb-12">
      {skillCategories.map((category, idx) => (
        <div key={idx} className="mb-6 md:mb-8 last:mb-0">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">{category.title}</h2>
            <span className="text-xs md:text-sm font-bold text-spotify-text-secondary uppercase tracking-widest hover:underline cursor-pointer hidden sm:block">
              Show All
            </span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
            {category.skills.map((skill, i) => (
              <div 
                key={i} 
                className="bg-[#181818] hover:bg-[#282828] p-2 md:p-4 rounded-lg transition-all duration-300 cursor-pointer group flex flex-col items-center gap-2 md:gap-3 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${(idx * 5 + i) * 50}ms` }}
              >
                <div className={`w-14 h-14 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${getGradient(skill)} shadow-lg group-hover:shadow-xl transition-shadow flex items-center justify-center`}>
                  <span className="text-sm md:text-2xl font-bold text-white drop-shadow-md">{getInitials(skill)}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-white text-xs md:text-sm truncate w-full">{skill}</h3>
                  <p className="text-[10px] md:text-xs text-spotify-text-secondary mt-0.5 md:mt-1 hidden sm:block">Skill</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Skills
