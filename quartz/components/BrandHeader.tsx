import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

const BrandHeader: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? "Mari Swa Wiki"
  const baseDir = pathToRoot(fileData.slug!)
  
  return (
    <header class={`brand-header ${displayClass ?? ""}`}>
      <a href={baseDir} class="brand-link">
        <div class="brand-logo-space">
          <img src="/logo.svg" alt="Mari Swa Wiki" class="brand-logo" />
        </div>
        <h1 class="brand-title">{title}</h1>
      </a>
    </header>
  )
}

BrandHeader.css = `
.brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  border-bottom: 2px solid rgba(212, 175, 55, 0.2);
  margin-bottom: 2rem;
}

.brand-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: 1rem;
}

.brand-logo-space {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.05);
  border-radius: 12px;
  border: 2px solid rgba(212, 175, 55, 0.2);
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.brand-title {
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  color: #d4af37;
  margin: 0;
  text-shadow: 0 2px 8px rgba(212, 175, 55, 0.2);
}

.brand-header a:hover {
  border: none;
}

.brand-header a:hover .brand-title {
  color: #d4a574;
}

@media (max-width: 768px) {
  .brand-header {
    padding: 1.5rem 1rem;
  }
  
  .brand-logo-space {
    width: 80px;
    height: 80px;
  }
  
  .brand-title {
    font-size: 1.5rem;
  }
}
`

export default (() => BrandHeader) satisfies QuartzComponentConstructor
