import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App.jsx'
import { requireAuth } from './auth/requireAuth.js'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ModulePage from './pages/ModulePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const rootRoute = createRootRoute({
  component: App,
  notFoundComponent: NotFoundPage,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const agendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agendar',
  beforeLoad: requireAuth,
  component: () => (
    <ModulePage
      title="Agendar serviço"
      description="Escolha um serviço, um profissional e um horário disponível."
    />
  ),
})

const agendamentosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/agendamentos',
  beforeLoad: requireAuth,
  component: () => (
    <ModulePage
      title="Agendamentos"
      description="Consulte seus atendimentos e acompanhe cancelamentos e reagendamentos."
    />
  ),
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: requireAuth,
  component: () => (
    <ModulePage
      title="Dashboard"
      description="Acompanhe os atendimentos do dia, a produtividade e as estimativas financeiras."
    />
  ),
})

const servicosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servicos',
  beforeLoad: requireAuth,
  component: () => (
    <ModulePage
      title="Serviços"
      description="Gerencie os serviços oferecidos, seus valores e a duração dos atendimentos."
    />
  ),
})

const escalaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/escala',
  beforeLoad: requireAuth,
  component: () => (
    <ModulePage
      title="Escala de profissionais"
      description="Organize os horários de trabalho e os bloqueios da agenda."
    />
  ),
})

const clientesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clientes',
  beforeLoad: requireAuth,
  component: () => (
    <ModulePage
      title="Clientes"
      description="Consulte o histórico de atendimentos dos clientes."
    />
  ),
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  agendarRoute,
  agendamentosRoute,
  dashboardRoute,
  servicosRoute,
  escalaRoute,
  clientesRoute,
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})
