# Adding an Open Graph Image

## Create the Image
1. **Dimensions**: Export as 1200×630 PNG
2. **Content**: Vylo logo + gradient background (matching site design)
3. **Design**: Use the same gradient as the hero section (#8A4FFF → #3BCBFF → #3CFFBC)

## Host the Image
- Upload to `/assets/og.png` in your project root
- Ensure the file is publicly accessible

## Update Meta Tags
In `index.html`, update these two lines:

```html
<meta property="og:image" content="https://vylohub.com/assets/og.png">
<meta property="twitter:image" content="https://vylohub.com/assets/og.png">
```

Replace `https://vylohub.com` with your actual domain.
