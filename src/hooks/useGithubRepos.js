import { useEffect, useState } from 'react'

const REPOS = [
  'surqo', 'mylife-hub', 'cabletelco', 'promptkit',
  'donde-oscar', 'cielito-lindo', 'lash_lessa',
  'Franchise-API', 'auth-service',
]

const FALLBACK = [
  { name: 'Franchise-API', description: 'RESTful API para gestión de franquicias, sucursales y productos. Desarrollado con Spring Boot WebFlux y MongoDB.', homepage: null, html_url: 'https://github.com/ricardomb-tech/Franchise-API', stars: 0, languages: ['Java', 'Docker'], updated: '' },
  { name: 'auth-service', description: 'Microservicio de autenticación y autorización con JWT, roles y seguridad stateless.', homepage: null, html_url: 'https://github.com/ricardomb-tech/auth-service', stars: 0, languages: ['Java', 'Spring Boot'], updated: '' },
  { name: 'surqo', description: 'Plataforma IoT + IA que conecta sensores ESP32 con modelos de lenguaje para recomendaciones agronómicas.', homepage: null, html_url: 'https://github.com/ricardomb-tech/surqo', stars: 0, languages: ['Python', 'TypeScript', 'C++'], updated: '' },
  { name: 'mylife-hub', description: 'Sistema de gestión personal todo en uno. Spring Boot, Angular, Docker y PostgreSQL.', homepage: null, html_url: 'https://github.com/ricardomb-tech/mylife-hub', stars: 0, languages: ['Java', 'TypeScript', 'CSS'], updated: '' },
  { name: 'promptkit', description: 'Herramienta para construir y gestionar prompts de IA de forma eficiente.', homepage: null, html_url: 'https://github.com/ricardomb-tech/promptkit', stars: 0, languages: ['Python'], updated: '' },
  { name: 'cabletelco', description: 'Sistema de gestión para empresa de telecomunicaciones con facturación y soporte técnico.', homepage: null, html_url: 'https://github.com/ricardomb-tech/cabletelco', stars: 0, languages: ['Java', 'PostgreSQL'], updated: '' },
  { name: 'donde-oscar', description: 'App de localización en tiempo real para seguimiento de personas con IoT.', homepage: null, html_url: 'https://github.com/ricardomb-tech/donde-oscar', stars: 0, languages: ['TypeScript', 'CSS'], updated: '' },
  { name: 'lash_lessa', description: 'Landing page y sistema de reservas para estudio de belleza. Diseño moderno y responsivo.', homepage: null, html_url: 'https://github.com/ricardomb-tech/lash_lessa', stars: 0, languages: ['TypeScript', 'CSS'], updated: '' },
  { name: 'cielito-lindo', description: 'Sitio web para restaurante con menú interactivo, reservas y administración.', homepage: null, html_url: 'https://github.com/ricardomb-tech/cielito-lindo', stars: 0, languages: ['TypeScript', 'HTML'], updated: '' },
  { name: 'redis-cache-aside-catalog', description: 'Servicio de catálogo con patrón cache-aside sobre Redis para reducir la carga de la base de datos y acelerar las lecturas.', homepage: null, html_url: 'https://github.com/ricardomb-tech/redis-cache-aside-catalog', stars: 0, languages: ['Java', 'Redis', 'PostgreSQL'], updated: '' },
]

const CACHE_KEY = 'gh_repos_cache'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

function getHeaders() {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function fetchRepo(name) {
  const headers = getHeaders()
  const [repo, langs] = await Promise.all([
    fetch(`https://api.github.com/repos/ricardomb-tech/${name}`, { headers }).then(r => r.json()),
    fetch(`https://api.github.com/repos/ricardomb-tech/${name}/languages`, { headers }).then(r => r.json()).catch(() => ({})),
  ])
  if (!repo || repo.message) return null
  return {
    name: repo.name || name,
    description: repo.description || '',
    homepage: repo.homepage || null,
    html_url: repo.html_url || `https://github.com/ricardomb-tech/${name}`,
    stars: repo.stargazers_count || 0,
    languages: langs && typeof langs === 'object' && !langs.message ? Object.keys(langs).slice(0, 5) : [],
    updated: repo.updated_at || '',
  }
}

export function useGithubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Using static fallback data — no GitHub API calls
    setRepos(FALLBACK)
    setLoading(false)
  }, [])

  return { repos, loading }
}
