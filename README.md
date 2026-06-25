# ☕ Kopi O King

**Singapore Hawker Idle Clicker — offline-first PWA**

Tap to brew kopi. Hire aunties. Unlock Chilli Crab. Earn that Michelin Star.

---

## How to play

1. **Tap the coffee cup** to earn money
2. **Buy Menu items** (🍽️ tab) — each item earns $$/sec passively
3. **Buy Upgrades** (⬆️ tab) — multiply click power and CPS
4. **Check Stats** (📊 tab) — track progress, view best CPS, reset if needed
5. Progress **auto-saves every 10 seconds** to your device
6. Come back later — you earn while away (up to 2 hours of offline earnings)

## Items

| Item | Cost | $/sec |
|------|------|-------|
| Kopi O | $15 | 0.1 |
| Kaya Toast | $100 | 0.5 |
| Teh Tarik | $500 | 2 |
| Nasi Lemak | $2,000 | 8 |
| Chicken Rice | $8,000 | 30 |
| Char Kway Teow | $30,000 | 100 |
| Laksa | $100,000 | 350 |
| Satay | $400,000 | 1,200 |
| Chilli Crab | $1.5M | 4,500 |
| Mao Shan Wang | $6M | 18,000 |

## Deploy to GitHub Pages

```
git init
git add .
git commit -m "Launch Kopi O King"
git remote add origin https://github.com/YOUR_USERNAME/kopi-o-king.git
git push -u origin main
# Enable GitHub Pages: Settings → Pages → main / root
```

## Deploy checklist (M1: ALWAYS do this)

- [ ] Bump `CACHE = 'kok-vN'` in `sw.js` every time `index.html` changes
- [ ] Upload `sw.js` AND `index.html` together — never one without the other
- [ ] Test on real phone at GitHub Pages URL (not localhost preview)
- [ ] Test offline: load → close → airplane mode → reopen from home screen

## Stack

- Vanilla HTML/CSS/JS — zero build step, zero dependencies
- IndexedDB for save state
- Service Worker for offline play
- GitHub Pages deployable

## Privacy

All data stored locally on device (IndexedDB). No server. No analytics. No network requests during gameplay.

---

*Built with Claude · Singapore · June 2026*