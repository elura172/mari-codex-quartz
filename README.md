# Mari Swaruu Codex

A digital-garden knowledge base of cosmic contact and consciousness exploration — 1,355 interlinked topic notes distilled from 494 Mari Swaruu transcripts, published with [Quartz v4](https://quartz.jzhao.xyz/).

**Live site:** https://elura172.github.io/mari-codex-quartz/

## Structure

- `content/index.md` — homepage (hero animation + stats)
- `content/topics/<category>/` — the 1,355 topic notes, organized into twelve thematic categories (cosmology, star races, galactic politics, taygetan crew, …); each note carries quotes, source transcripts, tags, and wikilinks to related concepts
- `content/concepts/` — stub pages for referenced concepts not yet consolidated into full topics; backlinks collect their appearances
- `quartz/styles/custom.scss` — the dark mystical theme (gold/crimson/clay/royal palette, Cinzel/Spectral/Space Mono typography)
- `quartz/static/ringstate-hero.htm` — self-contained canvas ring animation embedded on the homepage

## Development

```bash
npm ci
npx quartz build --serve   # http://localhost:8080
```

Deployment is automatic: every push to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.
