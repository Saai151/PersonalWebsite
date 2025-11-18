# Assets Guide - Image Organization

This guide explains how to organize and use images in your React + Vite portfolio website.

## Folder Structure

There are two main locations for images, each with different use cases:

```
cursorTest/
├── public/
│   └── images/          # Static assets (recommended for profile photos)
│       └── profile.jpg
│
└── src/
    └── assets/
        └── images/      # Assets imported in components
            └── logo.svg
```

## Option 1: Public Folder (Recommended for Profile Photos)

**Location:** `public/images/`

**Best for:**
- Profile photos
- Large images
- Images referenced by URL
- Images that don't need processing

**How to use:**

1. Place your image in `public/images/profile.jpg`

2. Reference it in your component:
```tsx
// Direct path (starts with /)
<img src="/images/profile.jpg" alt="Profile" />
```

3. **Example in Hero component:**
```tsx
const profileImage = '/images/profile.jpg'
<img src={profileImage} alt="Saai Arora" />
```

**Advantages:**
- ✅ Simple path references
- ✅ No import needed
- ✅ Can be accessed by URL
- ✅ Good for large images

## Option 2: Assets Folder (For Component Imports)

**Location:** `src/assets/images/`

**Best for:**
- Icons and logos
- Small images
- Images that need optimization
- Images bundled with components

**How to use:**

1. Place your image in `src/assets/images/logo.svg`

2. Import it in your component:
```tsx
import logoImg from '@/assets/images/logo.svg'

<img src={logoImg} alt="Logo" />
```

**Advantages:**
- ✅ Vite optimizes images automatically
- ✅ TypeScript support
- ✅ Better for bundling
- ✅ Can use dynamic imports

## Current Setup

The Hero component is configured to use:
- **Path:** `public/images/profile.jpg`
- **Fallback:** Shows "SA" initials if image not found

## Adding Your Profile Photo

1. **Save your profile photo** as `profile.jpg` (or `.png`, `.webp`, etc.)

2. **Place it in:** `public/images/profile.jpg`

3. **Update the path in Hero.tsx** if needed:
```tsx
const profileImage = '/images/profile.jpg' // Make sure filename matches
```

4. The component will automatically:
   - Display your photo if it exists
   - Show "SA" initials as fallback if image is missing

## Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp` (recommended for smaller file sizes)
- `.svg` (for icons/logos)
- `.gif`

## Image Optimization Tips

1. **Profile photos:** Use `.jpg` or `.webp`, keep under 500KB
2. **Icons:** Use `.svg` for scalability
3. **Optimize before adding:** Use tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)

## Example: Using Images in Other Components

### In Projects Component:
```tsx
// public/images/projects/pickup.jpg
<img src="/images/projects/pickup.jpg" alt="PickUp Project" />
```

### In Sidebar:
```tsx
// src/assets/images/logo.svg
import logo from '@/assets/images/logo.svg'
<img src={logo} alt="Logo" />
```

## Troubleshooting

**Image not showing?**
- Check the file path matches exactly (case-sensitive)
- Ensure file is in the correct folder
- Check browser console for 404 errors
- Verify the image file isn't corrupted

**Image too large?**
- Optimize the image before adding
- Consider using `.webp` format
- Resize to appropriate dimensions (e.g., 400x400px for profile)

