import { Link } from '@tanstack/react-router'

export default function NotFoundPage() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe.</p>
      <Link to="/" className="primary-link">Voltar ao início</Link>
    </section>
  )
}
