import { Issue } from "@/components/issue/Issue"
import { hoverCss } from "@/components/issue/markup"

export default function Home() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
      <Issue />
    </main>
  )
}
