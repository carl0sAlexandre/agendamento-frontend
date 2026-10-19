export default function ModulePage({ title, description }) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="module-notice">Esta funcionalidade está em desenvolvimento.</p>
    </section>
  )
}
