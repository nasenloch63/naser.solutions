import { CMSProjectPage } from "@/components/cms-project-page"
import { publicPageMetadata } from "@/lib/seo"

export const metadata = publicPageMetadata("/CMS")

export default function Page() {
  return <CMSProjectPage />
}
