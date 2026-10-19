import { useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { getLoginErrorMessage, login } from '../services/auth.js'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitting = useRef(false)
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting.current) return

    const form = new FormData(event.currentTarget)
    submitting.current = true
    setIsSubmitting(true)
    setMessage('')
    setError('')

    try {
      const data = await login({
        email: form.get('email'),
        password: form.get('password'),
      })
      await router.invalidate()
      await router.navigate({
        to: data.usuario?.tipo === 'administrador' ? '/dashboard' : '/agendamentos',
        replace: true,
      })
    } catch (error) {
      setError(getLoginErrorMessage(error))
    } finally {
      submitting.current = false
      setIsSubmitting(false)
    }
  }

  function notifyUnavailable() {
    setMessage('Esta opção ainda não está disponível.')
  }

  return (
    <section className="flex min-h-[min(100svh,826px)] w-full max-w-[430px] flex-col px-5 pt-8 pb-10 font-inter leading-normal text-ink [&_:focus-visible]:outline-3 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent" aria-labelledby="login-title">
      <div className="mb-[22px] grid size-[52px] shrink-0 place-items-center rounded-[14px] bg-primary text-2xl font-extrabold text-white" aria-label="Agenda Local">A</div>
      <h1 id="login-title" className="text-[25px] leading-normal font-semibold tracking-[-0.015em]">Entrar</h1>
      <p className="mt-1.5 mb-[26px] text-[14.5px] text-muted">Acompanhe seus horários marcados e remarque em poucos toques.</p>

      <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <div className="mb-4">
          <label className="mb-1.5 block text-[13.5px] font-medium text-gray-700" htmlFor="login-email">E-mail</label>
          <input className="w-full rounded-lg border-[1.5px] border-line bg-white px-[13px] py-3 text-[15px] text-ink placeholder:text-[#818892] focus:border-primary focus:shadow-[0_0_0_3px_#e6f0f3] focus:outline-none" id="login-email" name="email" type="email" autoComplete="username"
            placeholder="seu@email.com" disabled={isSubmitting} required />
        </div>
        <div className="mb-4">
          <label className="mb-1.5 block text-[13.5px] font-medium text-gray-700" htmlFor="login-password">Senha</label>
          <div className="relative">
            <input className="w-full rounded-lg border-[1.5px] border-line bg-white px-[13px] py-3 text-[15px] text-ink placeholder:text-[#818892] focus:border-primary focus:shadow-[0_0_0_3px_#e6f0f3] focus:outline-none pr-[90px]" id="login-password" name="password" type={showPassword ? 'text' : 'password'}
              autoComplete="current-password" placeholder="Digite sua senha" disabled={isSubmitting} required />
            <button type="button" className="absolute top-1 right-1 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-lg bg-transparent px-2.5 py-1.5 text-[13.5px] font-semibold text-primary hover:underline"
              aria-controls="login-password" aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="button" className="inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-lg bg-transparent px-3.5 py-[9px] text-[13.5px] font-semibold text-primary hover:underline"
            onClick={notifyUnavailable}>Esqueci minha senha</button>
        </div>
        <button type="submit" disabled={isSubmitting} className="disabled:cursor-wait disabled:opacity-60 mt-3.5 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-[18px] py-[13px] text-[15px] font-semibold text-white hover:bg-primary-dark">{isSubmitting ? 'Entrando…' : 'Entrar'}</button>
        {error && <p className="mt-3 text-[13px] text-[#c4562b]" role="alert">{error}</p>}
      </form>

      <div className="my-5 flex items-center gap-3 text-[13px] text-muted before:h-px before:flex-1 before:bg-line before:content-[''] after:h-px after:flex-1 after:bg-line after:content-['']">ou</div>
      <button type="button" className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-primary bg-white px-[18px] py-[13px] text-[15px] font-semibold text-primary hover:bg-primary-light"
        onClick={notifyUnavailable}>Continuar com Google</button>
      <p className="pt-3 text-[13px] text-primary" role="status">{message}</p>

      <div className="mt-auto pt-7">
        <p className="text-center text-[13.5px] text-muted">Ainda não tem conta?{' '}
          <button type="button" className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-transparent px-1 py-0.5 text-[13.5px] font-semibold text-primary hover:underline"
            onClick={notifyUnavailable}>Criar conta</button>
        </p>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-white px-[15px] py-3.5 shadow-[0_1px_3px_rgba(15,32,38,0.09)] max-[359px]:flex-wrap">
          <span className="text-xl" aria-hidden="true">💼</span>
          <div className="flex-1 max-[359px]:min-w-40">
            <h2 className="text-sm font-bold">Tem um negócio?</h2>
            <p className="text-[12.5px] text-muted">Cadastre seu estabelecimento e receba agendamentos.</p>
          </div>
          <button type="button" className="inline-flex min-h-[38px] shrink-0 cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-primary bg-white px-3.5 py-[9px] text-[13.5px] font-semibold text-primary hover:bg-primary-light max-[359px]:ml-auto"
            onClick={notifyUnavailable}>Começar</button>
        </div>
      </div>
    </section>
  )
}
