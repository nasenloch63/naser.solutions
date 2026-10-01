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
        <p className="ns-admin-welcome__description">Inhalte pflegen, Projekte präsentieren und Kundenzugänge verwalten.</p>
        <a className="ns-admin-welcome__link" href="/" target="_blank" rel="noopener noreferrer">
          Website öffnen <span aria-hidden="true">↗</span>
          <span className="ns-admin-sr-only"> (in einem neuen Tab)</span>
        </a>
      </div>
      <div className="ns-admin-welcome__logo" aria-hidden="true"><AdminIcon /></div>
    </section>
  )
}
