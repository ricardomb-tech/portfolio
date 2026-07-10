import { createContext, useContext, useState } from 'react'
import { translations, detectLang } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang] = useState(detectLang)
  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
