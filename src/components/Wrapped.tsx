import React, { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, Github, Loader2, Share2, Code, Coffee, Zap, Trophy, Heart } from 'lucide-react'
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
        
        // Try to get contribution data from GraphQL (includes all repos, even ones you don't own)
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

        const [repos, languagePercentages] = await Promise.all([
          github.getRepositories(),
          github.getLanguagePercentages(),
        ])

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

        // Add hardcoded Shopify contributions (private org repos not captured by API)
        const SHOPIFY_COMMITS = 30
        const SHOPIFY_PRS = 10
        
        totalCommits = totalCommits + SHOPIFY_COMMITS
        const adjustedPRs = (userContributions?.totalPullRequestContributions || Math.floor(totalCommits / 20)) + SHOPIFY_PRS

        console.log('✅ Successfully fetched GitHub data:', {
          repos: repos.length,
          languages: languagePercentages.length,
          totalCommits: totalCommits - SHOPIFY_COMMITS, // original
          totalCommitsWithShopify: totalCommits, // with Shopify
          includesPrivateRepos: !!userContributions,
          restrictedContributions: userContributions?.restrictedContributionsCount || 0
        })

        // Hardcoded language percentages reflecting work at Shopify, IBM, and Squeak
        const languages: LanguageStat[] = [
          { name: 'Python', percentage: 30, color: getLanguageColor('Python') },
          { name: 'Ruby', percentage: 20, color: getLanguageColor('Ruby') },
          { name: 'TypeScript', percentage: 18, color: getLanguageColor('TypeScript') },
          { name: 'Go', percentage: 15, color: getLanguageColor('Go') },
          { name: 'Java', percentage: 10, color: getLanguageColor('Java') },
          { name: 'JavaScript', percentage: 7, color: getLanguageColor('JavaScript') },
        ]

        // Use top repos by commits for top projects
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

        // Add Shopify to top repos if not already there
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
          totalCommits: 1280, // Includes Shopify contributions
          totalPRs: 73, // Includes Shopify PRs
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
          contributions: 1353, // Updated with Shopify
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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

  const slides = [
    { id: 0, component: <IntroSlide /> },
    { id: 1, component: <HookSlide data={wrappedData} /> },
    { id: 2, component: <GenresSlide languages={wrappedData.languages} /> },
    { id: 3, component: <TopArtistsSlide /> },
    { id: 4, component: <CodeHabitsSlide data={wrappedData} /> },
    { id: 5, component: <SpecialMomentsSlide /> },
    { id: 6, component: <TopReposSlide repos={wrappedData.topRepos} /> },
    { id: 7, component: <PersonalitySlide languages={wrappedData.languages} data={wrappedData} /> },
    { id: 8, component: <ShareSlide onClose={onClose} data={wrappedData} /> },
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-[#101010] via-[#1a0a2e] to-[#16213e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#1ED760] animate-spin mx-auto mb-6" />
          <p className="text-white text-2xl font-bold mb-2">Compiling your year...</p>
          <p className="text-gray-400 text-sm">
            {import.meta.env.VITE_GITHUB_TOKEN ? '🔐 Fetching real GitHub data' : '⚠️ Using mock data'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden relative bg-gradient-to-br from-[#101010] via-[#1a0a2e] to-[#16213e]">
      <div className="absolute top-6 right-6 z-[100]">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-full">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className={`h-full flex items-center justify-center pb-24 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {slides[currentSlide].component}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-[100]">
        <Button variant="ghost" size="icon" onClick={handlePrevious} disabled={currentSlide === 0} className="text-white hover:bg-white/10 rounded-full disabled:opacity-20">
          <ChevronLeft className="w-7 h-7" />
        </Button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrentSlide(i); setIsAnimating(false) }, 300) }} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-10 bg-[#1ED760]' : 'w-2 bg-white/30'}`} />
          ))}
        </div>
        <Button variant="ghost" size="icon" onClick={handleNext} disabled={currentSlide === slides.length - 1} className="text-white hover:bg-white/10 rounded-full disabled:opacity-20">
          <ChevronRight className="w-7 h-7" />
        </Button>
      </div>
    </div>
  )
}

// SLIDE 1: Intro with pun
const IntroSlide: React.FC = () => {
  return (
    <div className="text-center px-8 max-w-5xl">
      <div className="mb-12">
        <div className="w-80 h-80 mx-auto bg-gradient-to-br from-[#1ED760] via-[#00D4FF] to-[#8B5CF6] rounded-3xl shadow-2xl flex items-center justify-center wrapped-blob wrapped-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <Code className="w-32 h-32 text-white z-10" />
        </div>
      </div>
      <h1 className="text-7xl md:text-8xl font-black text-white mb-8 wrapped-headline tracking-tight">
        2025 WRAPPED
      </h1>
      <p className="text-3xl md:text-4xl text-gray-300 mb-4">
        It's been a year of <span className="text-[#1ED760] font-black">commits</span>,<br />
        <span className="text-[#00D4FF] font-black">code reviews</span>, and <span className="text-[#8B5CF6] font-black">deploys</span>
      </p>
      <p className="text-xl text-gray-400 mt-8 italic">
        Let's see what Saai's been building...
      </p>
    </div>
  )
}

// SLIDE 2: Hook slide - overall contributions
const HookSlide: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="text-center px-8 max-w-5xl">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-6 wrapped-label">SAAI'S 2025 IN CODE</p>
      <h1 className="text-7xl md:text-8xl font-black text-white mb-12 wrapped-headline tracking-tight leading-tight">
        SAAI DIDN'T JUST<br />CODE THIS YEAR.<br />
        <span className="text-[#1ED760]">HE SHIPPED.</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#1ED760]/20 to-[#1ED760]/5 rounded-3xl p-8 border border-[#1ED760]/30">
          <div className="text-6xl font-black text-[#1ED760] mb-3">
            <CountUpNumber value={data.totalCommits} />
          </div>
          <p className="text-gray-300 text-lg font-semibold">Commits</p>
        </div>
        <div className="bg-gradient-to-br from-[#00D4FF]/20 to-[#00D4FF]/5 rounded-3xl p-8 border border-[#00D4FF]/30">
          <div className="text-6xl font-black text-[#00D4FF] mb-3">
            <CountUpNumber value={data.totalPRs} />
          </div>
          <p className="text-gray-300 text-lg font-semibold">PRs Merged</p>
        </div>
        <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-[#8B5CF6]/5 rounded-3xl p-8 border border-[#8B5CF6]/30">
          <div className="text-6xl font-black text-[#8B5CF6] mb-3">
            <CountUpNumber value={data.repoCount} />
          </div>
          <p className="text-gray-300 text-lg font-semibold">Repos</p>
        </div>
      </div>
      <p className="text-gray-400 text-xl mt-12">
        <span className="text-[#1ED760] font-bold"><CountUpNumber value={data.contributions} /></span> total contributions
      </p>
      <p className="text-gray-500 text-lg mt-4 italic">
        (and broke prod only <span className="text-[#1ED760] font-bold">{data.prodIncidents}</span> times 👀)
      </p>
    </div>
  )
}

// SLIDE 3: Top "Genres" (Languages)
const GenresSlide: React.FC<{ languages: LanguageStat[] }> = ({ languages }) => {
  if (languages.length === 0) return null
  const topLang = languages[0]
  
  return (
    <div className="text-center px-8 max-w-6xl w-full">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-6 wrapped-label">SAAI'S TOP GENRE</p>
      <h2 className="text-8xl md:text-9xl font-black text-white mb-8 wrapped-headline">{topLang.name.toUpperCase()}</h2>
      <div className="text-7xl md:text-8xl font-black text-[#1ED760] wrapped-stat mb-12">
        <CountUpNumber value={topLang.percentage} suffix="%" />
      </div>
      <div className="space-y-4 max-w-3xl mx-auto">
        {languages.slice(0, 5).map((lang, i) => (
          <div key={i} className="relative">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-white text-xl font-bold">{lang.name}</span>
              <span className="text-gray-400 text-lg font-bold">{lang.percentage}%</span>
            </div>
            <div className="h-4 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full rounded-full wrapped-bar" style={{ width: `${lang.percentage}%`, backgroundColor: lang.color, transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-xl mt-12 italic">
        {topLang.name === 'TypeScript' ? 'Type safety is his love language' : 
         topLang.name === 'Python' ? 'He speaks fluent snake 🐍' :
         topLang.name === 'Go' ? 'Gopher life chose him' :
         topLang.name === 'Java' ? 'Still brewing that coffee ☕' :
         'He has great taste in syntax'}
      </p>
    </div>
  )
}

// SLIDE 4: Top "Artists" (Companies/Projects from resume)
const TopArtistsSlide: React.FC = () => {
  const companies = [
    { 
      name: 'Shopify', 
      role: 'Software Engineer Intern',
      period: 'Sep - Dec 2025',
      icon: '🛍️',
      color: 'from-green-500 to-green-600',
      highlight: '500M+ transactions'
    },
    { 
      name: 'IBM', 
      role: 'ML Engineer + SWE Intern',
      period: 'Jan - Aug 2025',
      icon: '💼',
      color: 'from-blue-500 to-blue-600',
      highlight: 'Kubernetes contributor'
    },
    { 
      name: 'Squeak', 
      role: 'Technical Founder',
      period: 'Nov 2024 - May 2025',
      icon: '🎯',
      color: 'from-purple-500 to-purple-600',
      highlight: '700+ users'
    },
    { 
      name: 'Autotrader', 
      role: 'Software Developer Intern',
      period: 'Jan - May 2024',
      icon: '🚗',
      color: 'from-orange-500 to-red-500',
      highlight: '1,500+ dealerships'
    },
  ]

  return (
    <div className="w-full max-w-6xl px-8">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-6 text-center wrapped-label">TOP ARTISTS · COLLABS</p>
      <h2 className="text-6xl md:text-7xl font-black text-white mb-12 text-center wrapped-headline">
        WHERE SAAI<br />SHIPPED CODE
      </h2>
      <div className="space-y-6">
        {companies.map((company, i) => (
          <div key={i} className="wrapped-card-enter" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className={`bg-gradient-to-r ${company.color} p-1 rounded-3xl`}>
              <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-4xl md:text-6xl">{company.icon}</div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{company.name}</h3>
                    <p className="text-gray-400 text-base md:text-lg">{company.role}</p>
                    <p className="text-[#1ED760] text-xs md:text-sm font-bold mt-1">{company.period}</p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">{company.highlight}</p>
                  </div>
                </div>
                <div className="text-4xl md:text-6xl font-black text-white opacity-20">#{i + 1}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 5: Code Habits (commit times)
const CodeHabitsSlide: React.FC<{ data: any }> = ({ data }) => {
  const timeBlocks = [
    { time: '🌅 Morning (6am-12pm)', percentage: 15, color: '#FFA500' },
    { time: '☀️ Afternoon (12pm-6pm)', percentage: 35, color: '#FFD700' },
    { time: '🌆 Evening (6pm-10pm)', percentage: 30, color: '#FF6B6B' },
    { time: '🌙 Night Owl (10pm-6am)', percentage: 20, color: '#8B5CF6' },
  ]

  return (
    <div className="w-full max-w-5xl px-8 text-center">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-6 wrapped-label">CODE HABITS · LISTENING PATTERNS</p>
      <h2 className="text-6xl md:text-7xl font-black text-white mb-4 wrapped-headline">
        SAAI CODED<br />LIKE THIS
      </h2>
      <p className="text-2xl text-gray-300 mb-12">
        Most active: <span className="text-[#1ED760] font-black">{data.peakDay}s</span> at <span className="text-[#1ED760] font-black">{data.peakTime}</span>
      </p>
      
      <div className="space-y-6 mb-12">
        {timeBlocks.map((block, i) => (
          <div key={i} className="wrapped-card-enter" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-left mb-3 flex items-center justify-between px-2">
              <span className="text-white text-lg font-bold">{block.time}</span>
              <span className="text-gray-400 font-bold">{block.percentage}%</span>
            </div>
            <div className="h-6 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full wrapped-bar flex items-center justify-end pr-4" 
                style={{ 
                  width: `${block.percentage}%`, 
                  backgroundColor: block.color,
                  transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <span className="text-white text-xs font-bold">{block.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-[#8B5CF6]/5 rounded-3xl p-8 border border-[#8B5CF6]/30">
        <Coffee className="w-12 h-12 text-[#8B5CF6] mx-auto mb-4" />
        <p className="text-2xl text-white font-bold">Late Night Coder</p>
        <p className="text-gray-400 mt-2">Saai's commits peaked after 10 PM</p>
        <p className="text-[#8B5CF6] font-bold mt-2">☕ Coffee level: MAXIMUM</p>
      </div>
    </div>
  )
}

// SLIDE 6: Special Moments (from resume)
const SpecialMomentsSlide: React.FC = () => {
  const moments = [
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'Squeak Launch',
      description: '700+ users, revenue-generating platform',
      color: 'from-yellow-500 to-orange-500',
      emoji: '🚀'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Shopify Impact',
      description: 'Reduced validation errors by 55%',
      color: 'from-green-500 to-emerald-500',
      emoji: '⚡'
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: 'AI Debugging Assistant',
      description: 'Built FastMCP AI agent for z/OS',
      color: 'from-blue-500 to-cyan-500',
      emoji: '🤖'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: '$1M+ Revenue',
      description: 'IBM Z/OS debugger REST APIs',
      color: 'from-purple-500 to-pink-500',
      emoji: '💰'
    },
  ]

  return (
    <div className="w-full max-w-6xl px-8">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-6 text-center wrapped-label">SPECIAL MOMENTS · PEAK TRACKS</p>
      <h2 className="text-6xl md:text-7xl font-black text-white mb-12 text-center wrapped-headline">
        SAAI'S BIGGEST<br />HITS IN 2025
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {moments.map((moment, i) => (
          <div key={i} className="wrapped-card-enter" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className={`bg-gradient-to-br ${moment.color} p-1 rounded-3xl`}>
              <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-8 text-center h-full">
                <div className="text-5xl md:text-6xl mb-4">{moment.emoji}</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-3">{moment.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{moment.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-3xl text-gray-300">
          He didn't just write code.<br />
          <span className="text-[#1ED760] font-black">He made an impact.</span>
        </p>
      </div>
    </div>
  )
}

// SLIDE 7: Top Repos
const TopReposSlide: React.FC<{ repos: Array<{ name: string; commits: number }> }> = ({ repos }) => {
  return (
    <div className="w-full max-w-5xl px-8">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-8 text-center wrapped-label">TOP TRACKS · REPOS</p>
      <h2 className="text-6xl md:text-7xl font-black text-white mb-12 text-center wrapped-headline">
        SAAI'S MOST<br />PLAYED REPOS
      </h2>
      <div className="space-y-4">
        {repos.map((repo, i) => (
          <div key={i} className="wrapped-card-enter" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#1ED760]/50 transition-all flex items-center justify-between hover:scale-[1.02]">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1ED760] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-lg">
                  <Github className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{repo.name}</h3>
                  <p className="text-gray-400">
                    <CountUpNumber value={repo.commits} /> commits · On repeat 🔁
                  </p>
                </div>
              </div>
              <span className="text-5xl font-black text-[#1ED760]">#{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SLIDE 8: Personality
const PersonalitySlide: React.FC<{ languages: LanguageStat[]; data: any }> = ({ languages, data }) => {
  const topLang = languages[0]?.name || 'Code'
  
  const personalities: { [key: string]: { title: string; description: string; traits: string[] } } = {
    'TypeScript': {
      title: 'THE BACKEND AI ARCHITECT',
      description: 'Saai builds intelligent backend systems that scale. From AI-powered debugging to LLM pipelines—he architects the future.',
      traits: ['FastMCP protocol expert', 'Distributed systems', 'AI/ML integration']
    },
    'Ruby': {
      title: 'THE RAILS PERFORMANCE ENGINEER',
      description: 'From Shopify\'s checkout to enterprise systems, Saai optimizes Rails at massive scale.',
      traits: ['500M+ transactions/day', '55% error reduction', 'GraphQL optimization']
    },
    'Go': {
      title: 'THE BACKEND SYSTEMS ARCHITECT',
      description: 'Simple, elegant, blazing fast. Saai builds distributed backend systems and AI pipelines with Go.',
      traits: ['Microservices at scale', 'AWS Lambda/SQS', 'Story generation engine']
    },
    'Python': {
      title: 'THE AI SYSTEMS ENGINEER',
      description: 'From FastMCP servers to ML models, Saai architects AI-powered backend systems that solve real problems.',
      traits: ['Model Context Protocol', 'RAG pipelines', 'AI debugging assistant']
    },
    'Java': {
      title: 'THE ENTERPRISE BACKEND ENGINEER',
      description: 'Saai builds production-grade backend systems that generate millions. REST APIs, CI/CD, and enterprise architecture.',
      traits: ['$1M+ revenue systems', 'JAX-RS expert', 'Security-first mindset']
    },
    'default': {
      title: 'THE BACKEND SYSTEMS BUILDER',
      description: 'From AI pipelines to distributed systems—Saai architects and ships production backend code that scales.',
      traits: ['Multi-language backend expert', 'AI/ML integration', 'Systems thinking']
    }
  }

  const personality = personalities[topLang] || personalities['default']
  
  return (
    <div className="text-center px-8 max-w-5xl">
      <p className="text-[#1ED760] text-sm font-bold tracking-widest uppercase mb-8 wrapped-label">SAAI'S DEV PERSONALITY · MUSIC PROFILE</p>
      <h2 className="text-7xl md:text-8xl font-black text-white mb-12 wrapped-headline leading-tight">
        {personality.title}
      </h2>
      <div className="bg-gradient-to-br from-[#1ED760]/20 to-[#00D4FF]/20 rounded-3xl p-12 border border-[#1ED760]/30 mb-8">
        <p className="text-2xl text-gray-200 leading-relaxed mb-8">
          {personality.description}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {personality.traits.map((trait, i) => (
            <span key={i} className="px-5 py-2 bg-white/10 text-white rounded-full text-sm font-bold border border-white/20">
              {trait}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-4xl font-black text-[#1ED760]"><CountUpNumber value={data.activeDays} /></div>
          <p className="text-gray-400 text-sm mt-2">Active Days</p>
        </div>
        <div>
          <div className="text-4xl font-black text-[#00D4FF]"><CountUpNumber value={languages.length} /></div>
          <p className="text-gray-400 text-sm mt-2">Languages Used</p>
        </div>
        <div>
          <div className="text-4xl font-black text-[#8B5CF6]"><CountUpNumber value={data.repoCount} /></div>
          <p className="text-gray-400 text-sm mt-2">Projects Built</p>
        </div>
      </div>
    </div>
  )
}

// SLIDE 9: Share
const ShareSlide: React.FC<{ onClose: () => void; data: any }> = ({ onClose, data }) => {
  return (
    <div className="text-center px-8 max-w-5xl">
      <h2 className="text-7xl md:text-8xl font-black text-white mb-8 wrapped-headline leading-tight">
        THAT'S SAAI'S<br />2025 WRAPPED
      </h2>
      
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-[#1ED760] via-[#00D4FF] to-[#8B5CF6] p-1 rounded-3xl mb-12 wrapped-gradient">
        <div className="bg-[#0a0a0a] rounded-3xl p-8">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-5xl font-black text-[#1ED760]">{data.totalCommits}</div>
              <p className="text-gray-400 text-sm mt-1">Commits</p>
            </div>
            <div>
              <div className="text-5xl font-black text-[#00D4FF]">{data.totalPRs}</div>
              <p className="text-gray-400 text-sm mt-1">PRs</p>
            </div>
            <div>
              <div className="text-5xl font-black text-[#8B5CF6]">{data.repoCount}</div>
              <p className="text-gray-400 text-sm mt-1">Repos</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg">
            Built amazing things. Shipped real code.<br />
            <span className="text-white font-bold">Ready for 2026.</span>
          </p>
        </div>
      </div>

      <p className="text-2xl text-gray-300 mb-12">
        Thanks for building amazing things this year.<br />
        Here's to shipping even more in 2026! 🚀
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button variant="spotify" size="lg" onClick={onClose} className="px-12 py-6 text-xl font-bold rounded-full">
          Back to Portfolio
        </Button>
        <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/saai151', '_blank')} className="px-12 py-6 text-xl font-bold rounded-full border-2 border-white/20 text-white hover:bg-white/10">
          <Github className="w-6 h-6 mr-3" />
          View on GitHub
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Saai's 2025 Dev Wrapped",
                text: `I made ${data.totalCommits} commits and shipped ${data.totalPRs} PRs in 2025!`,
                url: window.location.href
              })
            }
          }}
          className="px-12 py-6 text-xl font-bold rounded-full border-2 border-[#1ED760] text-[#1ED760] hover:bg-[#1ED760]/10"
        >
          <Share2 className="w-6 h-6 mr-3" />
          Share
        </Button>
      </div>
    </div>
  )
}

export default Wrapped
