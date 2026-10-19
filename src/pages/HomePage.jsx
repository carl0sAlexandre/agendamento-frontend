import { Link } from '@tanstack/react-router'

export default function HomePage() {
  return (
    <section>
      <h1>Plataforma de agendamento</h1>
      <p>Organize seus atendimentos e encontre o melhor horário para seu próximo serviço.</p>
      <Link to="/agendar" className="primary-link">Agendar um serviço</Link>
    </section>
  )
}
