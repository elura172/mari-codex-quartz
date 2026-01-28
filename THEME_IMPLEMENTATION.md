# Mari Codex Quartz Theme Implementation Guide

## Files Created

You now have 4 files to integrate into your Quartz setup:

1. **ringstate_hero.html** - The animated ring visualization (no UI, clean)
2. **quartz-theme.scss** - Main theme with colors, typography, and base styles
3. **index-component.tsx** - Custom homepage with hero section
4. **index-styles.scss** - Styling for the index page with responsive layout

---

## Installation Steps

### Step 1: Copy the Hero Animation

```bash
# Copy the hero HTML to your Quartz public assets
cp ringstate_hero.html ~/mari-codex-quartz/public/

# Or if you want it in static files:
cp ringstate_hero.html ~/mari-codex-quartz/static/
```

### Step 2: Install Fonts (Google Fonts)

Add this to the `<head>` of your Quartz template (usually `quartz/layout.html` or similar):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Spectral:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

These fonts are:
- **Cinzel** - Alchemical serif for headers
- **Spectral** - Elegant serif for body text
- **Space Mono** - Monospace for code

### Step 3: Add Theme SCSS

```bash
# Backup existing theme (if any)
cp ~/mari-codex-quartz/quartz/styles/base.scss ~/mari-codex-quartz/quartz/styles/base.scss.bak

# Copy theme
cp quartz-theme.scss ~/mari-codex-quartz/quartz/styles/

# Copy index styles
cp index-styles.scss ~/mari-codex-quartz/quartz/styles/index.scss
```

Then in `quartz/styles/index.ts`, import the theme:

```typescript
import "./base.scss"
import "./quartz-theme.scss"
import "./index.scss"
```

### Step 4: Create Custom Index Component

```bash
# Navigate to components
cd ~/mari-codex-quartz/quartz/components

# Create index component
cp ../../path/to/index-component.tsx ./index.tsx
```

Update `quartz/components/index.ts` to export it:

```typescript
export { default as Index } from "./index"
```

### Step 5: Update Quartz Config

In `quartz.config.ts`, ensure your configuration includes:

```typescript
import { Index } from "./quartz/components"

export const config: QuartzConfig = {
  configuration: {
    // ... other settings
    
    plugins: {
      filters: [],
      emitters: [
        // ... other emitters
      ]
    }
  },
  
  plugins: {
    transformers: [
      // ... existing transformers
    ],
    filters: [],
    emitters: [
      // Ensure homepage is set to use custom index
      {
        name: "contentPage",
        handler: ContentPage,
      }
    ]
  }
}
```

### Step 6: Build and Test

```bash
cd ~/mari-codex-quartz

# Clean build
rm -rf public
npm run build

# Serve locally
npm run serve
```

Visit `http://localhost:8080` - you should see:
- Ring state animation as hero section
- Dark mystical theme with your colors
- Gold, crimson, forest green, clay yellow accents
- Elegant typography throughout
- Left sidebar navigation
- Statistics section
- Topic browser

---

## Color Palette Reference

For custom components or future updates:

```
Primary Background:  #0a0e1a  (dark blue-black)
Secondary BG:        #151b2b  (slightly lighter)
Text Primary:        #f5f5f5  (white-silver)
Text Muted:          #a0a0a0  (medium gray)

Accent - Gold:       #d4af37  (golden-yellow)
Accent - Crimson:    #c91f1f  (crimson-red)
Accent - Green:      #2d5a3d  (forest green)
Accent - Clay:       #d4a574  (light clay-yellow)
Accent - Royal:      #4169e1  (royal blue)
```

---

## Typography Stack

**Headers:** Cinzel → IM Fell English → Crimson Text → serif
**Body:** Spectral → Crimson Text → serif
**Code:** Space Mono → Source Code Pro → monospace

---

## Customization Tips

### Adjust Colors
Edit the SCSS variable values at the top of `quartz-theme.scss`:

```scss
$color-accent-gold: #d4af37;     // Change this
$color-accent-crimson: #c91f1f;  // Or this
```

### Modify Hero Animation
Edit `ringstate_hero.html` directly to adjust:
- Ring colors (line ~148-160)
- Animation speed (line ~120)
- Breathing depth (line ~56)

### Change Sidebar Width
In `quartz-theme.scss`:

```scss
.sidebar {
  width: 280px;  // Change this value
}

main {
  margin-left: 280px;  // Match this
}
```

### Responsive Breakpoints
All components use `@media (max-width: 768px)` - adjust as needed.

---

## Troubleshooting

### Hero animation not showing
- Ensure `ringstate_hero.html` is in the correct path
- Check iframe `src` attribute in index component
- Verify CORS isn't blocking the iframe

### Fonts not loading
- Check Google Fonts link is in `<head>`
- Verify font names match exactly
- Clear browser cache

### Colors look different
- Browser color profiles vary
- Adjust colors in variables if needed
- Test in multiple browsers

### Sidebar overlapping content
- Adjust `margin-left` on main element
- Update breakpoint for mobile if needed

---

## Next Steps

1. Deploy to Vercel
2. Add favicon/branding
3. Integrate search functionality
4. Add graph visualization
5. Create Three Doors learning layer

Enjoy your dark mystical knowledge base! 🌙✨
