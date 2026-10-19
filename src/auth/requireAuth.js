import { redirect } from '@tanstack/react-router'

export const TOKEN_STORAGE_KEY = 'token'

export function getToken() {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)?.trim()
    return token && token !== 'null' && token !== 'undefined' ? token : null
  } catch {
    // Bloqueia o acesso também quando o navegador não permite ler o storage.
    return null
  }
}

export function requireAuth() {
  if (!getToken()) {
    throw redirect({ to: '/login', replace: true })
  }
}
