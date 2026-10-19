import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import './App.css'

const navigation = [
  ['/', 'Início'],
  ['/agendar', 'Agendar'],
  ['/agendamentos', 'Agendamentos'],
  ['/dashboard', 'Dashboard'],
  ['/servicos', 'Serviços'],
  ['/escala', 'Escala'],
  ['/clientes', 'Clientes'],
  ['/login', 'Entrar'],
]

export default function App() {
  const isLogin = useRouterState({ select: (state) => state.location.pathname.replace(/\/$/, '') === '/login' })

  if (isLogin) {
    return <main id="conteudo" className="grid min-h-svh place-items-center bg-surface p-0"><Outlet /></main>
  }

  return (
    <>
      <header className="app-header">
        <Link to="/" className="brand">Agendamento</Link>
        <nav aria-label="Navegação principal">
          {navigation.map(([to, label]) => (
            <Link key={to} to={to} activeOptions={{ exact: true }}
              activeProps={{ className: 'active' }}>
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main id="conteudo"><Outlet /></main>
    </>
  )
}
