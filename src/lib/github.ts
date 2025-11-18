// GitHub API service for fetching Wrapped data
// To use: Create a GitHub Personal Access Token and add it to your environment

interface GitHubRepo {
  name: string
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  updated_at: string
}

interface LanguageData {
  [key: string]: number
}

interface CommitData {
  date: string
  count: number
}

export class GitHubService {
  private token: string | null = null
  private username: string

  constructor(username: string = 'saai151', token?: string) {
    this.username = username
    this.token = token || null
  }

  private async fetchWithAuth(url: string): Promise<any> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github+json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }
    return response.json()
  }

  /**
   * Get all repositories for the user
   */
  async getRepositories(): Promise<GitHubRepo[]> {
    const url = `https://api.github.com/users/${this.username}/repos?per_page=100&sort=updated`
    return this.fetchWithAuth(url)
  }

  /**
   * Get language statistics across all repositories
   */
  async getLanguageStats(): Promise<LanguageData> {
    const repos = await this.getRepositories()
    const languageStats: LanguageData = {}

    // Fetch language data for each repo
    for (const repo of repos) {
      if (repo.languages_url) {
        try {
          const langData = await this.fetchWithAuth(repo.languages_url)
          Object.entries(langData).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + (bytes as number)
          })
        } catch (error) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, error)
        }
      }
    }

    return languageStats
  }

  /**
   * Calculate language percentages
   */
  async getLanguagePercentages(): Promise<Array<{ name: string; percentage: number; bytes: number }>> {
    const stats = await this.getLanguageStats()
    const total = Object.values(stats).reduce((sum, bytes) => sum + bytes, 0)

    return Object.entries(stats)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / total) * 100),
        bytes: bytes as number,
      }))
      .sort((a, b) => b.percentage - a.percentage)
  }

  /**
   * Get commit activity (requires GraphQL API or REST commits endpoint)
   * Note: This is a simplified version. For full commit history, you'd need to:
   * 1. Use GraphQL API with contributionsCollection
   * 2. Or fetch commits from each repo individually
   */
  async getCommitActivity(): Promise<CommitData[]> {
    // This is a placeholder - implement based on your needs
    // GraphQL example:
    // query {
    //   user(login: "saai151") {
    //     contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
    //       contributionCalendar {
    //         weeks {
    //           contributionDays {
    //             date
    //             contributionCount
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    
    return []
  }

  /**
   * Get commit count for a specific repository
   */
  async getRepoCommitCount(owner: string, repo: string): Promise<number> {
    try {
      // Use the GitHub API to get commit count
      // We'll fetch the first page and use the Link header to get total count
      const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github+json',
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
        },
      })
      
      if (!response.ok) {
        console.warn(`Failed to fetch commits for ${repo}:`, response.statusText)
        return 0
      }
      
      // Parse the Link header to get total count
      const linkHeader = response.headers.get('Link')
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/)
        if (match) {
          return parseInt(match[1], 10)
        }
      }
      
      // If no Link header, try to get the commits array length
      const commits = await response.json()
      return Array.isArray(commits) ? commits.length : 0
    } catch (error) {
      console.warn(`Error fetching commits for ${repo}:`, error)
      return 0
    }
  }

  /**
   * Get top repositories by commit count
   * Note: This requires fetching commits from each repo, which can be rate-limited
   */
  async getTopReposByCommits(limit: number = 5): Promise<Array<{ name: string; commits: number }>> {
    const repos = await this.getRepositories()
    
    // Fetch commit counts for all repos (in parallel)
    const reposWithCommits = await Promise.all(
      repos.map(async (repo) => {
        const commits = await this.getRepoCommitCount(this.username, repo.name)
        return {
          name: repo.name,
          commits,
        }
      })
    )
    
    return reposWithCommits
      .sort((a, b) => b.commits - a.commits)
      .slice(0, limit)
  }

  /**
   * Get total commit count across all repositories
   */
  async getTotalCommitCount(): Promise<number> {
    const repos = await this.getRepositories()
    const commitCounts = await Promise.all(
      repos.map((repo) => this.getRepoCommitCount(this.username, repo.name))
    )
    return commitCounts.reduce((sum, count) => sum + count, 0)
  }

  /**
   * Get pull request statistics
   */
  async getPRStats(): Promise<{ total: number; merged: number; open: number }> {
    // This would require fetching PRs from each repo
    // Example: GET /repos/{owner}/{repo}/pulls
    return { total: 0, merged: 0, open: 0 }
  }

  /**
   * Get user's total contributions using GraphQL API
   * This includes contributions to ALL repos (even ones they don't own)
   */
  async getUserContributions(): Promise<{
    totalCommitContributions: number
    totalPullRequestContributions: number
    totalIssueContributions: number
    totalRepositoryContributions: number
    restrictedContributionsCount: number
  }> {
    if (!this.token) {
      throw new Error('GitHub token required for GraphQL API')
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalRepositoryContributions
            restrictedContributionsCount
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: this.username }
      })
    })

    if (!response.ok) {
      throw new Error(`GraphQL API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
    }

    const contributions = data.data.user.contributionsCollection

    return {
      totalCommitContributions: contributions.totalCommitContributions,
      totalPullRequestContributions: contributions.totalPullRequestContributions,
      totalIssueContributions: contributions.totalIssueContributions,
      totalRepositoryContributions: contributions.totalRepositoryContributions,
      restrictedContributionsCount: contributions.restrictedContributionsCount,
    }
  }

  /**
   * Get commit activity by repository (for repos the user has contributed to)
   */
  async getContributionsByRepo(): Promise<Array<{ repo: string; commits: number }>> {
    if (!this.token) {
      throw new Error('GitHub token required for GraphQL API')
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            commitContributionsByRepository(maxRepositories: 10) {
              repository {
                name
                owner {
                  login
                }
              }
              contributions {
                totalCount
              }
            }
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: this.username }
      })
    })

    if (!response.ok) {
      throw new Error(`GraphQL API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors)
      return []
    }

    const repoContributions = data.data.user.contributionsCollection.commitContributionsByRepository

    return repoContributions.map((item: any) => ({
      repo: `${item.repository.owner.login}/${item.repository.name}`,
      commits: item.contributions.totalCount,
    }))
  }
}

// Helper function to use in components
export async function fetchWrappedData(token?: string) {
  const github = new GitHubService('saai151', token)
  
  try {
    const [languages, repos] = await Promise.all([
      github.getLanguagePercentages(),
      github.getTopReposByCommits(5),
    ])

    return {
      languages: languages.slice(0, 5).map(lang => ({
        name: lang.name,
        percentage: lang.percentage,
        color: getLanguageColor(lang.name),
      })),
      topRepos: repos,
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return null
  }
}

// Color mapping for common languages
function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f7df1e',
    'Go': '#00add8',
    'Python': '#3776ab',
    'Java': '#ed8b00',
    'C++': '#00599c',
    'C': '#a8b9cc',
    'Rust': '#000000',
    'Ruby': '#cc342d',
    'PHP': '#777bb4',
    'Swift': '#fa7343',
    'Kotlin': '#7f52ff',
    'Dart': '#0175c2',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
  }
  return colors[language] || '#1db954'
}

