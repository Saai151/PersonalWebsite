import React, { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, Github, Loader2, Code, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { GitHubService } from '../lib/github'
import CountUpNumber from './CountUpNumber'
import './Wrapped.css'

interface WrappedProps {
  onClose: () => void
}

interface LanguageStat {
  name: string
  percentage: number
  color: string
}

interface ProjectStat {
  name: string
  metric: string
  description: string
  tech: string[]
}

const Wrapped: React.FC<WrappedProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [wrappedData, setWrappedData] = useState({
    totalCommits: 0,
    totalPRs: 0,
    prodIncidents: 3,
    languages: [] as LanguageStat[],
    topProjects: [] as ProjectStat[],
    topRepos: [] as Array<{ name: string; commits: number }>,
    activeDays: 0,
    peakDay: 'Tuesday',
    peakTime: '11 PM',
    repoCount: 0,
    contributions: 0,
  })

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6', 'JavaScript': '#f7df1e', 'Go': '#00add8',
      'Python': '#3776ab', 'Java': '#ed8b00', 'C++': '#00599c',
      'C': '#a8b9cc', 'Rust': '#000000', 'Ruby': '#cc342d',
      'PHP': '#777bb4', 'Swift': '#fa7343', 'Kotlin': '#7f52ff',
      'Dart': '#0175c2', 'HTML': '#e34c26', 'CSS': '#1572b6',
      'Shell': '#89e051', 'Dockerfile': '#384d54', 'Makefile': '#427819',
    }
    return colors[language] || '#1ED760'
  }

  // Fetch GitHub data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN
        const hasToken = !!token
        
        if (!hasToken) {
          console.warn('⚠️ VITE_GITHUB_TOKEN not found. Using mock data.')
          throw new Error('No GitHub token provided')
        }

        console.log('🔍 Fetching real GitHub data...')
        const github = new GitHubService('saai151', token)
        
        // Try to get contribution data from GraphQL
        let userContributions
        let contributionsByRepo
        try {
          [userContributions, contributionsByRepo] = await Promise.all([
            github.getUserContributions(),
            github.getContributionsByRepo(),
          ])
          console.log('✅ Fetched GraphQL contribution data:', userContributions)
        } catch (error) {
          console.warn('⚠️ GraphQL API failed, using REST API fallback:', error)
          userContributions = null
          contributionsByRepo = null
        }

        const repos = await github.getRepositories()
        await github.getLanguagePercentages()

        // Use GraphQL data if available, otherwise fall back to REST API
        let totalCommits
        let topRepos
        
        if (userContributions && contributionsByRepo) {
          totalCommits = userContributions.totalCommitContributions
          topRepos = contributionsByRepo
            .sort((a: any, b: any) => b.commits - a.commits)
            .slice(0, 5)
            .map((item: any) => ({
              name: item.repo,
              commits: item.commits
            }))
        } else {
          // Fallback to REST API (only your own repos)
          totalCommits = await github.getTotalCommitCount()
          topRepos = await github.getTopReposByCommits(5)
        }

        // Add hardcoded Shopify contributions
        const SHOPIFY_COMMITS = 30
        const SHOPIFY_PRS = 10
        
        totalCommits = totalCommits + SHOPIFY_COMMITS
        const adjustedPRs = (userContributions?.totalPullRequestContributions || Math.floor(totalCommits / 20)) + SHOPIFY_PRS

        // Hardcoded language percentages
        const languages: LanguageStat[] = [
          { name: 'Python', percentage: 30, color: getLanguageColor('Python') },
          { name: 'Ruby', percentage: 20, color: getLanguageColor('Ruby') },
          { name: 'TypeScript', percentage: 18, color: getLanguageColor('TypeScript') },
          { name: 'Go', percentage: 15, color: getLanguageColor('Go') },
          { name: 'Java', percentage: 10, color: getLanguageColor('Java') },
          { name: 'JavaScript', percentage: 7, color: getLanguageColor('JavaScript') },
        ]

        const topProjects: ProjectStat[] = topRepos.slice(0, 3).map((repo: any, index: number) => {
          const repoDetails = repos.find((r: any) => r.name === repo.name || repo.name.includes(r.name))
          return {
            name: repo.name.includes('/') ? repo.name.split('/')[1] : repo.name,
            metric: `${repo.commits} commits`,
            description: index === 0 ? 'Most commits' : index === 1 ? 'Second most active' : 'Third most active',
            tech: repoDetails?.language ? [repoDetails.language] : ['Various'],
          }
        })

        const activeDays = Math.min(365, repos.length * 15)

        // Add Shopify to top repos
        const hasShopify = topRepos.some((repo: any) => 
          repo.name.toLowerCase().includes('shopify') || repo.name.toLowerCase().includes('checkout')
        )
        
        if (!hasShopify) {
          topRepos.unshift({
            name: 'shopify/checkout',
            commits: SHOPIFY_COMMITS
          })
          topRepos = topRepos.slice(0, 5) // Keep only top 5
        }

        setWrappedData({
          totalCommits,
          totalPRs: adjustedPRs,
          prodIncidents: 3,
          languages,
          topProjects,
          topRepos,
          activeDays,
          peakDay: 'Tuesday',
          peakTime: '11 PM',
          repoCount: repos.length,
          contributions: totalCommits + adjustedPRs,
        })
      } catch (error) {
        console.error('❌ Error fetching GitHub data:', error)
        setWrappedData({
          totalCommits: 1280,
          totalPRs: 73,
          prodIncidents: 3,
          languages: [
            { name: 'TypeScript', percentage: 26, color: '#3178c6' },
            { name: 'Go', percentage: 24, color: '#00add8' },
            { name: 'Ruby', percentage: 22, color: '#cc342d' },
            { name: 'Java', percentage: 12, color: '#ed8b00' },
            { name: 'JavaScript', percentage: 10, color: '#f7df1e' },
            { name: 'Python', percentage: 6, color: '#3776ab' },
          ],
          topProjects: [
            { name: 'Squeak', metric: '700+ users', description: 'Revenue-generating platform', tech: ['React', 'Go', 'Supabase', 'AWS'] },
            { name: 'Modaflows', metric: 'Private project', description: 'Enterprise workflow automation', tech: ['TypeScript', 'React'] },
            { name: 'PickUp', metric: 'Full-stack MVP', description: 'Social sports platform', tech: ['Express.js', 'React', 'AWS'] },
          ],
          topRepos: [
            { name: 'squeak-backend', commits: 423 },
            { name: 'modaflows', commits: 312 },
            { name: 'squeak-frontend', commits: 271 },
            { name: 'pickup-app', commits: 189 },
            { name: 'shopify/checkout', commits: 30 },
          ],
          activeDays: 210,
          peakDay: 'Tuesday',
          peakTime: '11 PM',
          repoCount: 16,
          contributions: 1353,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const slides = [
    { id: 0, component: <IntroSlide />, bg: 'from-[#1ED760]/30 via-[#121212] to-[#000000]' },
    { id: 1, component: <HookSlide data={wrappedData} />, bg: 'from-[#00D4FF]/30 via-[#121212] to-[#000000]' },
    { id: 2, component: <GenresSlide languages={wrappedData.languages} />, bg: 'from-[#8B5CF6]/30 via-[#121212] to-[#000000]' },
    { id: 3, component: <TopArtistsSlide />, bg: 'from-orange-500/30 via-[#121212] to-[#000000]' },
    { id: 4, component: <CodeHabitsSlide data={wrappedData} />, bg: 'from-yellow-500/30 via-[#121212] to-[#000000]' },
    { id: 5, component: <SpecialMomentsSlide />, bg: 'from-pink-500/30 via-[#121212] to-[#000000]' },
    { id: 6, component: <TopReposSlide repos={wrappedData.topRepos} />, bg: 'from-emerald-500/30 via-[#121212] to-[#000000]' },
    { id: 7, component: <PersonalitySlide languages={wrappedData.languages} />, bg: 'from-purple-500/30 via-[#121212] to-[#000000]' },
    { id: 8, component: <ShareSlide onClose={onClose} data={wrappedData} />, bg: 'from-[#1ED760]/30 via-[#121212] to-[#000000]' },
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsAnimating(false)
      }, 400)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
        setIsAnimating(false)
      }, 400)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#1ED760] animate-spin mx-auto mb-6" />
          <p className="text-white text-2xl font-bold mb-2 font-circular">Compiling your year...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black text-white font-circular">
      <div className="wrapped-grain opacity-30"></div>
      
      {/* Dynamic Background */}
      <div 
        className={`absolute inset-0 transition-colors duration-700 ease-in-out bg-gradient-to-br ${slides[currentSlide].bg}`} 
      />

      {/* Header Controls */}
      <div className="absolute top-6 right-6 z-[110]">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
          <X className="w-8 h-8" />
        </Button>
      </div>

      {/* Main Content */}
      <div className={`h-full w-full flex items-center justify-center pb-24 relative z-[105] transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        {slides[currentSlide].component}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-6 z-[110]">
        {/* Progress Bars */}
        <div className="flex gap-2 w-full max-w-md px-4">
          {slides.map((_, i) => (
            <div 
              key={i} 
              onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrentSlide(i); setIsAnimating(false) }, 300) }} 
              className="h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden cursor-pointer transition-all hover:h-2"
            >
              <div 
                className={`h-full bg-white transition-all duration-300 ${i <= currentSlide ? 'w-full' : 'w-0'} ${i === currentSlide ? 'bg-white' : 'opacity-50'}`} 
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-12">
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrevious} 
            disabled={currentSlide === 0} 
            className="text-white/50 hover:text-white rounded-full disabled:opacity-10 hover:bg-white/10 w-12 h-12"
           >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNext} 
            disabled={currentSlide === slides.length - 1} 
            className="text-white/50 hover:text-white rounded-full disabled:opacity-10 hover:bg-white/10 w-12 h-12"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// SLIDE 1: Intro with pun
const IntroSlide: React.FC = () => {
  return (
    <div className="text-center px-4 max-w-5xl wrapped-slide">
      <div className="mb-12 relative">
        <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-br from-[#1ED760] via-[#00D4FF] to-[#8B5CF6] rounded-full blur-3xl opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-br from-[#1ED760] via-[#00D4FF] to-[#8B5CF6] rounded-[3rem] shadow-2xl flex items-center justify-center wrapped-blob wrapped-gradient relative overflow-hidden rotate-3 hover:rotate-6 transition-transform duration-700">
          <Code className="w-32 h-32 text-white mix-blend-overlay" />
        </div>
      </div>
      <h1 className="text-6xl md:text-9xl font-black text-white mb-8 wrapped-headline tracking-tighter">
        2025<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1ED760] to-[#00D4FF]">WRAPPED</span>
      </h1>
      <p className="text-2xl md:text-4xl text-white/80 mb-4 font-medium">
        It's been a year of commits, code reviews, and deploys.
      </p>
    </div>
  )
}

// SLIDE 2: Hook slide - overall contributions
const HookSlide: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="text-center px-4 max-w-6xl wrapped-slide w-full">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-8 wrapped-label">YOUR YEAR IN CODE</p>
      <h1 className="text-5xl md:text-8xl font-black text-white mb-16 wrapped-headline tracking-tighter leading-[0.9]">
        YOU DIDN'T JUST<br />CODE THIS YEAR.<br />
        <span className="text-[#1ED760]">YOU SHIPPED.</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-6xl font-black text-[#1ED760] mb-2 wrapped-stat">
            <CountUpNumber value={data.totalCommits} />
          </div>
          <p className="text-white/60 font-bold uppercase tracking-wider text-sm">Commits</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors delay-100">
          <div className="text-6xl font-black text-[#00D4FF] mb-2 wrapped-stat">
            <CountUpNumber value={data.totalPRs} />
          </div>
          <p className="text-white/60 font-bold uppercase tracking-wider text-sm">PRs Merged</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors delay-200">
          <div className="text-6xl font-black text-[#8B5CF6] mb-2 wrapped-stat">
            <CountUpNumber value={data.repoCount} />
          </div>
          <p className="text-white/60 font-bold uppercase tracking-wider text-sm">Repos Active</p>
        </div>
      </div>
      
      <div className="mt-12 text-xl text-white/50">
        Top 1% of contributors in your timezone (probably)
      </div>
    </div>
  )
}

// SLIDE 3: Top "Genres" (Languages)
const GenresSlide: React.FC<{ languages: LanguageStat[] }> = ({ languages }) => {
  if (languages.length === 0) return null
  const topLang = languages[0]
  
  return (
    <div className="px-8 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center wrapped-slide">
      <div className="text-left">
        <p className="text-[#8B5CF6] text-sm font-bold tracking-widest uppercase mb-4 wrapped-label">TOP GENRE</p>
        <h2 className="text-7xl md:text-9xl font-black text-white mb-6 wrapped-headline tracking-tighter leading-none">
          {topLang.name.toUpperCase()}
        </h2>
        <div className="text-3xl font-bold text-[#8B5CF6] mb-8">
          You spent <CountUpNumber value={topLang.percentage} suffix="%" /> of your time here.
        </div>
        <p className="text-white/60 text-xl italic max-w-md">
           {topLang.name === 'TypeScript' ? '"If it doesn\'t have types, I don\'t want it."' : 
            topLang.name === 'Python' ? '"Indentations are my love language."' :
            topLang.name === 'Go' ? '"Simplicity is the ultimate sophistication."' :
            'You have great taste in syntax.'}
        </p>
      </div>

      <div className="space-y-3 w-full">
        {languages.slice(0, 5).map((lang, i) => (
          <div key={i} className="group relative h-16 md:h-20 w-full bg-white/5 rounded-lg overflow-hidden flex items-center px-6 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 wrapped-card-enter" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="absolute left-0 top-0 bottom-0 bg-current opacity-20 transition-all duration-1000 group-hover:opacity-30 wrapped-bar" style={{ width: `${lang.percentage}%`, color: lang.color }}></div>
            <div className="relative z-10 flex justify-between w-full items-center">
               <div className="flex items-center gap-4">
                 <span className="text-white/40 font-bold text-xl w-6">{i + 1}</span>
                 <span className="text-white font-bold text-xl md:text-2xl">{lang.name}</span>
               </div>
               <span className="text-white/60 font-bold">{lang.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 4: Top Artists
const TopArtistsSlide: React.FC = () => {
  const companies = [
    { name: 'Shopify', role: 'SWE Intern', period: 'Fall 2025', image: '/images/Shopify.png' },
    { name: 'IBM', role: 'ML Engineer', period: 'Summer 2025', image: '/images/IBM.png' },
    { name: 'Squeak', role: 'Founder', period: '2024-2025', image: '/images/Squeak.png' },
    { name: 'Autotrader', role: 'Developer', period: 'Winter 2024', image: '/images/Autotrader.ca.png' },
  ]

  return (
    <div className="text-center w-full max-w-4xl wrapped-slide">
      <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-8 wrapped-label">TOP ARTISTS</p>
      <h2 className="text-6xl md:text-8xl font-black text-white mb-16 wrapped-headline tracking-tight">
        THE LINEUP
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        {companies.map((company, i) => (
          <div key={i} className="bg-[#181818] hover:bg-[#282828] p-6 rounded-2xl transition-all duration-300 group text-left wrapped-card-enter cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform overflow-hidden p-2">
                {company.image ? (
                  <img src={company.image} alt={company.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-2xl">🏢</span>
                )}
             </div>
             <h3 className="text-2xl font-black text-white mb-1">{company.name}</h3>
             <p className="text-white/60 font-medium">{company.role}</p>
             <p className="text-white/40 text-sm mt-4 uppercase tracking-wider font-bold">{company.period}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 5: Code Habits
const CodeHabitsSlide: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full max-w-5xl px-8 flex flex-col md:flex-row items-center gap-12 wrapped-slide">
      <div className="flex-1 text-left">
         <p className="text-yellow-500 text-sm font-bold tracking-widest uppercase mb-6 wrapped-label">LISTENING HABITS</p>
         <h2 className="text-6xl md:text-8xl font-black text-white mb-8 wrapped-headline leading-none">
           NIGHT<br/>OWL
         </h2>
         <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/10">
            <p className="text-2xl text-white font-bold mb-2">You were most active on {data.peakDay}s.</p>
            <p className="text-white/60 text-lg">Your commits peaked around {data.peakTime}, proving that sleep is indeed optional for shipping.</p>
         </div>
      </div>
      
      <div className="flex-1 w-full max-w-md">
         <div className="aspect-square rounded-full bg-gradient-to-b from-yellow-500 to-orange-600 p-1 animate-spin-slow" style={{ animationDuration: '20s' }}>
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_25%,#Eab308_40%,transparent_45%)] opacity-20"></div>
               <div className="w-4 h-4 bg-white rounded-full z-10"></div>
               <div className="absolute w-[45%] h-1 bg-white/50 top-1/2 left-1/2 origin-left -rotate-45"></div>
               <div className="absolute w-[30%] h-1 bg-white top-1/2 left-1/2 origin-left rotate-[120deg]"></div>
               
               {/* Labels */}
               <span className="absolute top-4 text-xs font-bold text-white/50">12AM</span>
               <span className="absolute bottom-4 text-xs font-bold text-white/50">12PM</span>
               <span className="absolute right-4 text-xs font-bold text-white/50">6AM</span>
               <span className="absolute left-4 text-xs font-bold text-white/50">6PM</span>
            </div>
         </div>
      </div>
    </div>
  )
}

// SLIDE 6: Special Moments
const SpecialMomentsSlide: React.FC = () => {
  const moments = [
    { title: 'Launched Squeak', desc: '700+ users', color: 'text-yellow-400' },
    { title: 'Shopify Impact', desc: '-55% Validation Errors', color: 'text-green-400' },
    { title: 'IBM Revenue', desc: '$1M+ Generated', color: 'text-blue-400' },
  ]

  return (
    <div className="text-center w-full max-w-5xl wrapped-slide">
      <h2 className="text-6xl md:text-8xl font-black text-white mb-16 wrapped-headline">
        YOUR TOP<br/>MOMENTS
      </h2>
      
      <div className="space-y-8">
        {moments.map((m, i) => (
          <div key={i} className="relative overflow-hidden group cursor-pointer wrapped-card-enter" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-baseline justify-between border-b border-white/20 pb-4 group-hover:border-white transition-colors">
               <h3 className={`text-4xl md:text-6xl font-black ${m.color} opacity-80 group-hover:opacity-100 transition-opacity`}>{m.title}</h3>
               <p className="text-xl md:text-2xl font-bold text-white/60 group-hover:text-white transition-colors">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 7: Top Repos (List view style)
const TopReposSlide: React.FC<{ repos: Array<{ name: string; commits: number }> }> = ({ repos }) => {
  return (
    <div className="w-full max-w-4xl px-8 wrapped-slide">
      <p className="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-8 wrapped-label">ON REPEAT</p>
      
      <div className="flex flex-col gap-4">
        {repos.map((repo, i) => (
          <div key={i} className="flex items-center gap-6 p-4 rounded-xl hover:bg-white/10 transition-all group wrapped-card-enter" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="text-xl font-bold text-emerald-400 w-6 text-center">{i + 1}</span>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded flex items-center justify-center text-black font-bold shadow-lg group-hover:scale-105 transition-transform">
               <Github className="w-6 h-6" />
            </div>
            <div className="flex-1">
               <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{repo.name}</h3>
               <p className="text-white/50 text-sm font-medium">{repo.commits} plays (commits)</p>
            </div>
            <div className="hidden md:block text-white/30 font-bold text-sm tracking-wider">2025</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 8: Personality
const PersonalitySlide: React.FC<{ languages: LanguageStat[] }> = ({ languages }) => {
  const topLang = languages[0]?.name || 'Code'
  const personalities: { [key: string]: string } = {
    'TypeScript': 'THE ARCHITECT',
    'Ruby': 'THE OPTIMIZER',
    'Go': 'THE MINIMALIST',
    'Python': 'THE SCIENTIST',
    'Java': 'THE ENTERPRISE',
  }
  const title = personalities[topLang] || 'THE BUILDER'

  return (
    <div className="text-center px-8 max-w-5xl wrapped-slide">
      <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 animate-spin-slow" style={{ animationDuration: '10s' }}>
         <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <Zap className="w-20 h-20 text-white" />
         </div>
      </div>
      
      <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-4 wrapped-label">YOUR CODING PERSONALITY</p>
      <h2 className="text-6xl md:text-8xl font-black text-white mb-8 wrapped-headline tracking-tight">
        {title}
      </h2>
      <p className="text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
        You don't just write code; you craft systems. With {topLang} as your main instrument, you orchestrate complex logic into simple, beautiful solutions.
      </p>
    </div>
  )
}

// SLIDE 9: Share
const ShareSlide: React.FC<{ onClose: () => void; data: any }> = ({ onClose, data }) => {
  return (
    <div className="text-center px-8 max-w-5xl wrapped-slide">
      <div className="bg-gradient-to-br from-[#1ED760] via-[#00D4FF] to-[#8B5CF6] p-1 rounded-[2.5rem] shadow-2xl mb-12 rotate-1 hover:rotate-0 transition-transform duration-500">
        <div className="bg-black rounded-[2.4rem] p-12 md:p-16 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
           <div className="relative z-10">
              <p className="text-white/50 font-bold tracking-widest uppercase mb-2">MY 2025 WRAPPED</p>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 wrapped-headline">SAAI ARORA</h2>
              
              <div className="grid grid-cols-3 gap-4 text-left">
                 <div>
                    <div className="text-4xl font-black text-[#1ED760]"><CountUpNumber value={data.totalCommits} /></div>
                    <p className="text-white/50 text-sm font-bold uppercase">Commits</p>
                 </div>
                 <div>
                    <div className="text-4xl font-black text-[#00D4FF]"><CountUpNumber value={data.totalPRs} /></div>
                    <p className="text-white/50 text-sm font-bold uppercase">PRs</p>
                 </div>
                 <div>
                    <div className="text-4xl font-black text-[#8B5CF6]"><CountUpNumber value={data.repoCount} /></div>
                    <p className="text-white/50 text-sm font-bold uppercase">Repos</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button onClick={onClose} className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-full font-bold text-lg tracking-wide transform hover:scale-105 transition-all">
          BACK TO PORTFOLIO
        </Button>
        <Button variant="outline" onClick={() => window.open('https://github.com/saai151', '_blank')} className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full font-bold text-lg tracking-wide">
          <Github className="w-5 h-5 mr-2" />
          GITHUB
        </Button>
      </div>
    </div>
  )
}

export default Wrapped
