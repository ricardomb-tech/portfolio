import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import CategoriesIntro from './components/CategoriesIntro'
import ProjectsSection from './components/ProjectsSection'

export default function App() {
  // Las secciones usan la fuente "AldoTheApache" en encabezados grandes. Si
  // termina de cargar después de que ScrollTrigger ya midió las posiciones
  // de pin (con la fuente de respaldo), el layout se reajusta y esas
  // posiciones cacheadas quedan desfasadas — lo que deja ver un instante de
  // la sección anterior antes de que el pin siguiente entre en efecto.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CategoriesIntro />
      <ProjectsSection />
    </>
  )
}
