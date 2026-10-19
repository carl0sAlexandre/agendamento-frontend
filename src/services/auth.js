import { api } from './api.js'
import { TOKEN_STORAGE_KEY } from '../auth/requireAuth.js'

export async function login({ email, password }) {
  const { data } = await api.post('/Login', {
    email: email.trim(),
    password,
  }, { skipAuth: true })

  const token = typeof data?.token === 'string' ? data.token.trim() : ''
  if (!token || token === 'null' || token === 'undefined') {
    throw new Error('O servidor não retornou um token de acesso válido.')
  }

  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  } catch {
    throw new Error('Não foi possível salvar a sessão. Permita o armazenamento neste navegador e tente novamente.')
  }

  return data
}

export function getLoginErrorMessage(error) {
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return 'O servidor demorou para responder. Tente novamente.'
    }
    if (error.isAxiosError) {
      return 'Não conseguimos falar com o servidor. Confira sua conexão e tente novamente.'
    }
    return error.message || 'Não foi possível entrar. Tente novamente.'
  }

  // O backend retorna 406 para credenciais inválidas.
  if ([401, 406].includes(error.response.status)) {
    return 'E-mail ou senha incorretos. Tente novamente.'
  }
  if (error.response.status === 429) {
    return 'Muitas tentativas de acesso. Aguarde um pouco e tente novamente.'
  }
  return 'Não foi possível entrar. Tente novamente mais tarde.'
}
