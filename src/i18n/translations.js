export const translations = {
  es: {
    nav: {
      home: 'INICIO',
      about: 'SOBRE MÍ',
      skills: 'HABILIDADES',
      projects: 'PROYECTOS',
      contact: 'CONTACTO',
    },
    hero: {
      terminal: 'DESARROLLADOR DE SOFTWARE',
      screenText: 'Construyo backends que piensan y sistemas que perduran.',
      screenHighlight: ['piensan', 'perduran'],
    },
    about: {
      label: '(Sobre mí)',
      bio: 'Soy Ricardo Martinez, desarrollador backend con más de 3 años construyendo sistemas escalables potenciados por IA e IoT.',
    },
    skills: {
      categories: ['BACKEND', 'DISEÑO WEB', 'IA', 'IoT'],
      hover: 'pasa el mouse',
      descriptions: {
        'BACKEND': 'APIs escalables, microservicios y arquitecturas que sostienen productos en producción sin fallar.',
        'DISEÑO WEB': 'Interfaces modernas y responsivas que conectan la experiencia del usuario con la lógica del negocio.',
        'IA': 'Integración de LLMs y pipelines inteligentes para automatizar decisiones en tiempo real.',
        'IoT': 'Sensores, dispositivos embebidos y plataformas de telemetría que conectan el mundo físico con la nube.',
      },
    },
    projects: {
      title: 'PROYECTOS',
      label: 'proyecto',
      more: '& más',
      github: 'github →',
      live: 'live →',
      terminalPhrase: 'construyo sistemas que no se caen a las 3am.',
      worldEndPhrase: 'fin del recorrido. lo bueno viene ahora.',
    },
    outro: {
      label: '(Ricardo)',
      bio: [
        'Soy desarrollador de software apasionado por crear soluciones innovadoras, limpias y eficientes. Me especializo en aplicaciones web y móviles, arquitecturas de microservicios y soluciones IoT, cuidando siempre la calidad del código y la experiencia del usuario.',
        'Trabajo con tecnologías modernas y metodologías ágiles, y disfruto cada proyecto con dedicación, alegría y compromiso. Creo en la transparencia, el trabajo en equipo y en construir cosas que dejen algo bueno en la vida de las personas.',
        'Mi meta es simple: seguir creciendo, aprender cada día y aportar valor con una sonrisa.',
      ],
      photoPending: 'foto pendiente —',
    },
    contact: {
      label: '(Contacto)',
      heading: 'CONSTRUYAMOS ALGO',
      subheading: '¿Tienes un proyecto en mente? Siempre estoy abierto a contribuir en algo creativo.',
      nameLabel: 'nombre',
      namePlaceholder: 'tu nombre',
      emailLabel: 'email',
      emailPlaceholder: 'tu@email.com',
      messageLabel: 'mensaje',
      messagePlaceholder: 'cuéntame sobre tu proyecto...',
      submit: 'enviar mensaje →',
      social: 'encuéntrame en',
      downloadCV: 'Descargar CV',
      footer: 'diseñado y desarrollado por Ricardo Martinez',
    },
  },
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      skills: 'SKILLS',
      projects: 'PROJECTS',
      contact: 'CONTACT',
    },
    hero: {
      terminal: 'SOFTWARE DEVELOPER',
      screenText: 'I build backends that think and systems that last.',
      screenHighlight: ['think', 'last'],
    },
    about: {
      label: '(About)',
      bio: 'I am Ricardo Martinez, backend developer with over 3 years building scalable systems powered by AI and IoT.',
    },
    skills: {
      categories: ['BACKEND', 'WEB DESIGN', 'AI', 'IoT'],
      hover: 'hover',
      descriptions: {
        'BACKEND': 'Scalable APIs, microservices and architectures that keep production products running without failing.',
        'DISEÑO WEB': 'Modern, responsive interfaces that connect user experience with business logic.',
        'IA': 'LLM integration and intelligent pipelines to automate real-time decisions.',
        'IoT': 'Sensors, embedded devices and telemetry platforms that connect the physical world to the cloud.',
      },
    },
    projects: {
      title: 'PROJECTS',
      label: 'project',
      more: '& more',
      github: 'github →',
      live: 'live →',
      terminalPhrase: 'i build systems that don’t go down at 3am.',
      worldEndPhrase: 'end of the road. the good part starts now.',
    },
    outro: {
      label: '(Ricardo)',
      bio: [
        'I am a software developer passionate about creating innovative, clean and efficient solutions. I specialize in web and mobile applications, microservice architectures and IoT solutions, always caring about code quality and user experience.',
        'I work with modern technologies and agile methodologies, and I enjoy every project with dedication, joy and commitment. I believe in transparency, teamwork, and building things that leave something good in people’s lives.',
        'My goal is simple: keep growing, learn every day, and add value with a smile.',
      ],
      photoPending: 'photo pending —',
    },
    contact: {
      label: '(Contact)',
      heading: "LET'S BUILD SOMETHING",
      subheading: 'Have a project in mind? I’m always open to contributing to something creative.',
      nameLabel: 'name',
      namePlaceholder: 'your name',
      emailLabel: 'email',
      emailPlaceholder: 'you@email.com',
      messageLabel: 'message',
      messagePlaceholder: 'tell me about your project...',
      submit: 'send message →',
      social: 'find me on',
      downloadCV: 'Download CV',
      footer: 'designed & built by Ricardo Martinez',
    },
  },
}

export function detectLang() {
  if (typeof navigator === 'undefined') return 'en'
  const raw = (navigator.language || navigator.userLanguage || 'en').toLowerCase()
  return raw.startsWith('es') ? 'es' : 'en'
}
