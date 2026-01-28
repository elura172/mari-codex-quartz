// Custom Index Component for Mari Codex
// Displays ring state hero animation + topic browser

import { QuartzComponent, QuartzComponentProps } from "./types"
import { getAllSlugs, getFileContent } from "../utils"
import style from "./styles/index.scss"
import { classNameList } from "../utils"

interface IndexProps extends QuartzComponentProps {
  showSearch?: boolean
  showGraph?: boolean
}

export default class Index extends QuartzComponent {
  static defaultProps: IndexProps = {
    showSearch: true,
    showGraph: false,
  }

  renderHero(): string {
    return `
      <section class="hero-section">
        <div class="hero-container">
          <iframe 
            src="/ringstate-hero.html" 
            class="hero-frame"
            frameborder="0"
            scrolling="no"
            style="border: none; background: #000;"
          ></iframe>
          <div class="hero-overlay">
            <div class="hero-content">
              <h1>Mari Swaruu Codex</h1>
              <p class="tagline">A living knowledge base of cosmic contact and consciousness exploration</p>
            </div>
          </div>
        </div>
      </section>
    `
  }

  renderSearch(props: IndexProps): string {
    if (!props.showSearch) return ""
    
    return `
      <section class="search-section">
        <div class="search-container">
          <input 
            type="search" 
            id="search-input"
            placeholder="Search topics, concepts, entities..."
            class="search-box"
            aria-label="Search topics"
          />
          <div id="search-results" class="search-results"></div>
        </div>
      </section>
    `
  }

  renderTopicBrowser(props: IndexProps): string {
    return `
      <section class="topics-section">
        <div class="topics-header">
          <h2>Explore Topics</h2>
          <p class="section-desc">1150+ topics organized from 494 transcripts</p>
        </div>
        <div class="topics-grid" id="topics-grid">
          <!-- Topics will be populated by JavaScript -->
        </div>
      </section>
    `
  }

  renderStatistics(): string {
    return `
      <section class="stats-section">
        <div class="stats-container">
          <div class="stat-card">
            <span class="stat-number">494</span>
            <span class="stat-label">Transcripts</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">3214</span>
            <span class="stat-label">Total Topics</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">1150</span>
            <span class="stat-label">Summaries</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">5</span>
            <span class="stat-label">Master Topics</span>
          </div>
        </div>
      </section>
    `
  }

  renderAbout(): string {
    return `
      <section class="about-section">
        <div class="about-container">
          <h2>About This Codex</h2>
          <div class="about-content">
            <p>
              The Mari Swaruu Codex is a comprehensive knowledge base extracting core concepts, 
              entities, themes, and cosmological frameworks from 494 transcripts of contact and 
              consciousness exploration.
            </p>
            <p>
              Topics are organized hierarchically, with master topics grouping semantically 
              similar concepts, providing navigable pathways through complex interdimensional 
              and philosophical material.
            </p>
            <div class="about-features">
              <div class="feature">
                <h3>Semantic Organization</h3>
                <p>Topics grouped by meaning, not just alphabetically</p>
              </div>
              <div class="feature">
                <h3>Rich Context</h3>
                <p>Each topic includes quotes, sources, and related concepts</p>
              </div>
              <div class="feature">
                <h3>Navigable Graph</h3>
                <p>Explore connections between ideas visually</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  override async render(props: IndexProps): Promise<string> {
    return `
      <article class="index-container">
        ${this.renderHero()}
        
        <div class="index-content">
          ${this.renderSearch(props)}
          ${this.renderStatistics()}
          ${this.renderTopicBrowser(props)}
          ${this.renderAbout()}
        </div>
      </article>
    `
  }
}
