import CMSPage, { generateMetadata as generateCMSMetadata } from './(frontend)/[...slug]/page'

const params = Promise.resolve<{ slug?: string[] }>({})

export const generateMetadata = () => generateCMSMetadata({ params })

export default function HomePage() {
  return CMSPage({ params })
}
