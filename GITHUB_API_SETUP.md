# GitHub API Setup Guide

This guide explains how to integrate real GitHub data into your Wrapped component.

## Overview

The `src/lib/github.ts` file contains a `GitHubService` class that can fetch:
- Repository statistics
- Language breakdown
- Commit activity
- Top repositories

## Setup Steps

### 1. Create a GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click "Generate new token"
3. Configure:
   - **Token name**: `portfolio-wrapped`
   - **Expiration**: Choose your preference (90 days recommended)
   - **Repository access**: Only select repositories (or all if you want)
   - **Permissions**:
     - `Contents`: Read-only
     - `Metadata`: Read-only (always selected)
4. Click "Generate token"
5. **Copy the token immediately** - you won't be able to see it again!

### 2. Add Token to Your Project

**Option A: Environment Variables (Recommended for Production)**

Create a `.env` file in the root directory:
```env
VITE_GITHUB_TOKEN=your_token_here
```

Then update `Wrapped.tsx` to use it:
```tsx
const token = import.meta.env.VITE_GITHUB_TOKEN
const github = new GitHubService('saai151', token)
```

**Option B: Hardcode (For Development Only)**

⚠️ **Never commit tokens to git!** Use this only for local testing.

### 3. Update Wrapped Component

In `src/components/Wrapped.tsx`, you can fetch real data:

```tsx
import { fetchWrappedData } from '@/lib/github'

const Wrapped: React.FC<WrappedProps> = ({ onClose }) => {
  const [wrappedData, setWrappedData] = useState(null)
  
  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    fetchWrappedData(token).then(data => {
      if (data) {
        setWrappedData(data)
      }
    })
  }, [])
  
  // Use wrappedData instead of mock data
}
```

## API Endpoints Used

### REST API Endpoints

1. **Get User Repositories**
   ```
   GET https://api.github.com/users/{username}/repos
   ```

2. **Get Repository Languages**
   ```
   GET https://api.github.com/repos/{owner}/{repo}/languages
   ```

3. **Get Repository Commits**
   ```
   GET https://api.github.com/repos/{owner}/{repo}/commits
   ```

### GraphQL API (Advanced)

For more efficient queries, especially for commit activity:

```graphql
query {
  user(login: "saai151") {
    contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
    repositories(first: 100) {
      nodes {
        name
        languages(first: 10) {
          edges {
            size
            node {
              name
            }
          }
        }
      }
    }
  }
}
```

## Rate Limits

GitHub API has rate limits:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

The `GitHubService` class handles this by:
- Using authentication when a token is provided
- Batching requests where possible
- Caching results (you can add caching)

## Example Usage

```tsx
import { GitHubService } from '@/lib/github'

// Initialize service
const github = new GitHubService('saai151', 'your_token_here')

// Get language statistics
const languages = await github.getLanguagePercentages()
console.log(languages)
// Output: [
//   { name: 'TypeScript', percentage: 34, bytes: 123456 },
//   { name: 'Go', percentage: 26, bytes: 98765 },
//   ...
// ]

// Get top repositories
const topRepos = await github.getTopReposByCommits(5)
console.log(topRepos)
// Output: [
//   { name: 'squeak-backend', commits: 123 },
//   ...
// ]
```

## Security Notes

1. **Never commit tokens to git**
   - Add `.env` to `.gitignore`
   - Use environment variables

2. **For production**, consider:
   - Using a backend API route to proxy GitHub requests
   - Storing tokens server-side only
   - Using GitHub OAuth for user-specific data

3. **Token permissions**: Use the minimum required permissions

## Troubleshooting

**Error: "GitHub API error: 401 Unauthorized"**
- Check that your token is valid
- Verify token has correct permissions
- Ensure token hasn't expired

**Error: "GitHub API error: 403 Forbidden"**
- You've hit rate limits
- Wait or use authentication
- Check token permissions

**No data showing:**
- Check browser console for errors
- Verify username is correct
- Ensure repositories are public (or token has access)

## Next Steps

1. Implement GraphQL queries for better performance
2. Add caching to reduce API calls
3. Create a backend API route for production
4. Add error handling and loading states
5. Implement commit activity visualization

