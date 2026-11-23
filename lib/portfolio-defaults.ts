export interface PortfolioDefault {
 titleKey: string; descriptionKey: string; url: string; tags: string[]; category: string; type?: string; platform?: string; logo?: string; previewImage?: string
}

export const portfolioDefaults: PortfolioDefault[] = [
  {
    titleKey: "projects.cms.title",
    descriptionKey: "projects.cms.description",
    url: "/CMS",
    tags: ["CMS", "Dashboard", "Open Source"],
    category: "web",
    type: "website",
    logo: "/images/logo-invertable.png",
  },
  {
    titleKey: "projects.hazechill.title",
    descriptionKey: "projects.hazechill.description",
    url: "https://www.haze-chill.com/",
    tags: ["Webdesign", "Café", "Kassel"],
    category: "gastro",
    type: "website",
    previewImage: "/projects/haze-chill-website.jpg",
  },
  {
    titleKey: "projects.reel.title",
    descriptionKey: "projects.reel.description",
    url: "https://www.instagram.com/reel/DYug1AZoD9L/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    tags: ["Instagram", "Reel", "Content Editing", "Social Media"],
    category: "social",
    type: "social",
    platform: "instagram",
    previewImage: "/projects/haze-chill-instagram.png",
  },
  {
    titleKey: "projects.studio.title",
    previewImage: "/projects/studio-glace.jpg",
    descriptionKey: "projects.studio.description",
    url: "https://www.glace14.com/",
    tags: ["Design", "Studio", "Portfolio"],
    category: "design",
    type: "website",
  },
  {
    titleKey: "projects.joesgarage.title",
    logo: "/projects/joes-garage.svg",
    descriptionKey: "projects.joesgarage.description",
    url: "https://www.joes-garage.net",
    tags: ["Rock Bar", "Webdesign", "Events"],
    category: "gastro",
    type: "website",
  },
]
