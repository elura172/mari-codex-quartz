#!/usr/bin/env python3
"""
Fix Broken Wiki Links in Markdown
==================================

Finds all [[Topic]] references and either:
1. Fixes them to match actual markdown files (fuzzy matching)
2. Removes broken references

Usage:
    python fix_wiki_links.py
"""

import re
from pathlib import Path
from difflib import get_close_matches

class WikiLinkFixer:
    def __init__(self, topics_dir: str):
        self.topics_dir = Path(topics_dir)
        self.md_files = set()
        self.slugs = {}
        self.load_topic_files()
    
    def load_topic_files(self):
        """Load all existing markdown files and create slug mapping"""
        print("Loading topic files...")
        
        for md_file in self.topics_dir.glob("*.md"):
            slug = md_file.stem  # filename without .md
            self.md_files.add(slug)
            
            # Also store the human-readable name from frontmatter
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Extract title from frontmatter
                    match = re.search(r'title:\s*"?([^"\n]+)"?', content)
                    if match:
                        title = match.group(1).strip()
                        self.slugs[title.lower()] = slug
            except:
                pass
        
        print(f"Found {len(self.md_files)} topic files")
    
    def find_best_match(self, reference: str) -> str:
        """Find best matching slug for a reference"""
        ref_lower = reference.lower()
        
        # Exact match (case-insensitive)
        if ref_lower in self.slugs:
            return self.slugs[ref_lower]
        
        # Try converting reference to slug format
        potential_slug = ref_lower.replace(' ', '-')
        if potential_slug in self.md_files:
            return potential_slug
        
        # Fuzzy match against slugs
        close_matches = get_close_matches(potential_slug, self.md_files, n=1, cutoff=0.6)
        if close_matches:
            return close_matches[0]
        
        # Fuzzy match against titles
        close_matches = get_close_matches(ref_lower, self.slugs.keys(), n=1, cutoff=0.6)
        if close_matches:
            return self.slugs[close_matches[0]]
        
        return None
    
    def process_file(self, md_file: Path) -> tuple:
        """Process a single markdown file and fix broken links"""
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        fixed_count = 0
        removed_count = 0
        
        # Find all [[...]] references
        def replace_link(match):
            nonlocal fixed_count, removed_count
            full_match = match.group(0)
            reference = match.group(1)
            
            # Try to find matching file
            best_match = self.find_best_match(reference)
            
            if best_match:
                # Convert slug to title case for display
                title = best_match.replace('-', ' ').title()
                fixed_count += 1
                return f"[[{title}]]"
            else:
                # Remove broken link
                removed_count += 1
                return ""  # Remove the link entirely
        
        # Replace all wiki links
        content = re.sub(r'\[\[([^\]]+)\]\]', replace_link, content)
        
        # Clean up empty lines from removed links
        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
        
        return content, fixed_count, removed_count, original_content != content
    
    def run(self, dry_run: bool = True):
        """Fix all wiki links in all markdown files"""
        print(f"\nProcessing {len(list(self.topics_dir.glob('*.md')))} markdown files...\n")
        
        total_fixed = 0
        total_removed = 0
        modified_files = 0
        
        for idx, md_file in enumerate(sorted(self.topics_dir.glob("*.md")), 1):
            content, fixed, removed, changed = self.process_file(md_file)
            
            if changed:
                total_fixed += fixed
                total_removed += removed
                modified_files += 1
                
                if idx % 100 == 0:
                    print(f"[{idx}] Processed {md_file.name}")
                    print(f"    Fixed: {fixed}, Removed: {removed}")
                
                if not dry_run:
                    with open(md_file, 'w', encoding='utf-8') as f:
                        f.write(content)
        
        print(f"\n{'='*60}")
        print("RESULTS")
        print(f"{'='*60}")
        print(f"Files modified:  {modified_files}")
        print(f"Links fixed:     {total_fixed}")
        print(f"Links removed:   {total_removed}")
        print(f"{'='*60}")
        
        if dry_run:
            print("\n⚠️  DRY RUN MODE - No files were modified")
            print("Run with --apply to actually fix the files\n")
        else:
            print("\n✅ Files updated successfully!\n")


if __name__ == "__main__":
    import sys
    
    topics_dir = "/Users/mirrr/mari-codex/content/topics"
    
    # Check for --apply flag
    apply_changes = "--apply" in sys.argv
    
    fixer = WikiLinkFixer(topics_dir)
    fixer.run(dry_run=not apply_changes)
