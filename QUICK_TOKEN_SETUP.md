# Quick GitHub Token Setup (5 Minutes)

## TL;DR - Fast Setup

1. **Go here**: https://github.com/settings/tokens/new

2. **Settings**:
   - Name: `Portfolio Wrapped Full Access`
   - Expiration: `No expiration` (or your preference)
   - Scopes: Check **ONLY** these:
     - ✅ `repo` (this includes everything you need)
     - ✅ `read:user`
     - ✅ `read:org` (optional, but recommended for company repos)

3. **Click "Generate token"** at the bottom

4. **Copy the token** (starts with `ghp_...`)

5. **Add to your `.env` file**:
   ```bash
   # In /home/saaiarora/Documents/cursorTest/.env
   VITE_GITHUB_TOKEN=ghp_paste_your_token_here
   ```

6. **Restart your dev server**:
   ```bash
   npm run dev
   ```

7. **Done!** Open your site and click "2025 Wrapped"

## What This Gives You

✅ **All your commits** (including private repos)  
✅ **Contributions to any repo** (Shopify, IBM, Modaflows, etc.)  
✅ **Real PR counts** from GitHub  
✅ **Private repo data** (with proper access)  

## Verifying It Works

Open browser console (F12) and look for:
```
✅ Fetched GraphQL contribution data: { totalCommitContributions: 1234, ... }
```

If you see this, you're getting full data! 🎉

## Troubleshooting

**Problem**: Still seeing mock data  
**Solution**: Make sure:
1. Token is in `.env` file (not `.env.example`)
2. File is in project root: `/home/saaiarora/Documents/cursorTest/.env`
3. Dev server was restarted after adding token
4. Token has `repo` scope checked

**Problem**: "GraphQL API failed"  
**Solution**: Your token might not have the right scopes. Delete it and create a new one with `repo` scope checked.

## Security Note

⚠️ **Never commit your `.env` file to git!**  
It's already in `.gitignore`, but double-check before pushing code.

