import { portfolioDefaults } from './portfolio-defaults'
import { supportedLanguages } from './language'
import { cmsProjectCopy } from './cms-project-copy'
import { hazeChillProjectCopy } from './haze-chill-project-copy'
import { websiteText } from './website-text'
import type { LocalizedText, PortfolioProject, PortfolioSection } from './portfolio'

export const translated = (key: string): LocalizedText => Object.fromEntries(supportedLanguages.map(language => [language, websiteText(language, key)]))
export const previewPortfolio: PortfolioProject[] = portfolioDefaults.map((project, index) => ({
  id: -(index + 1), order: index + 1, url: project.url, category: project.category,
  title: Object.fromEntries(supportedLanguages.map(language => [language, project.url === '/CMS' ? cmsProjectCopy[language].title : project.titleKey === 'projects.hazechill.title' ? hazeChillProjectCopy[language].title : websiteText(language, project.titleKey)])),
  description: Object.fromEntries(supportedLanguages.map(language => [language, project.url === '/CMS' ? cmsProjectCopy[language].intro : project.titleKey === 'projects.hazechill.title' ? hazeChillProjectCopy[language].description : websiteText(language, project.descriptionKey)])),
  tags: project.tags, image: project.logo || project.previewImage, containImage: Boolean(project.logo),
}))
export const previewPortfolioSection: PortfolioSection = { eyebrow: translated('projects.badge'), heading: translated('projects.title'), description: translated('projects.description'), showFilters: true }
