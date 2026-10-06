import Image from 'next/image'

export function AdminIcon() {
  return (
    <span className="ns-admin-mark" aria-hidden="true">
      <Image src="/images/logo-invertable.png" alt="" width={64} height={64} />
    </span>
  )
}

export function AdminLogo() {
  return (
    <div className="ns-admin-brand ns-admin-brand--login">
      <AdminIcon />
      <div>
        <span className="ns-admin-brand__name">Naser Solutions</span>
        <span className="ns-admin-brand__label">Content Management</span>
      </div>
    </div>
  )
}

export function AdminNavBrand() {
  return (
    <a className="ns-admin-brand ns-admin-brand--nav" href="/admin" aria-label="Naser Solutions Dashboard">
      <AdminIcon />
      <div>
        <span className="ns-admin-brand__name">Naser Solutions</span>
        <span className="ns-admin-brand__label">CMS</span>
      </div>
    </a>
  )
}

export function DashboardWelcome() {
  return (
    <section className="ns-admin-welcome" aria-labelledby="ns-admin-welcome-title">
      <div className="ns-admin-welcome__content">
        <p className="ns-admin-welcome__eyebrow">Naser Solutions · CMS</p>
        <h1 id="ns-admin-welcome-title">Deine Website im Überblick.</h1>
        <p className="ns-admin-welcome__description">Projekte bearbeiten, Bilder auswählen und die Reihenfolge festlegen. Erst als Entwurf speichern und in der Vorschau prüfen; „Veröffentlichen“ übernimmt die Änderungen auf die Website.</p>
        <nav aria-label="Website bearbeiten" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <a className="ns-admin-welcome__link" href="/admin/collections/projects">Projekte bearbeiten →</a>
          <a className="ns-admin-welcome__link" href="/admin/collections/media">Medienbibliothek →</a>
          <a className="ns-admin-welcome__link" href="/admin/collections/pages">Sektionen anordnen →</a>
        </nav>
        <a className="ns-admin-welcome__link" href="/" target="_blank" rel="noopener noreferrer">
          Website öffnen <span aria-hidden="true">↗</span>
          <span className="ns-admin-sr-only"> (in einem neuen Tab)</span>
        </a>
      </div>
      <div className="ns-admin-welcome__logo" aria-hidden="true"><AdminIcon /></div>
    </section>
  )
}
