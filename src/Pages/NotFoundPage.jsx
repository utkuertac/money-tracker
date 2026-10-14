import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 fw-bold">404</h1>
      <p className="text-secondary">Aradığınız sayfa bulunamadı.</p>
      <Link className="btn btn-primary" to="/">
        Ana sayfaya dön
      </Link>
    </div>
  )
}

export default NotFoundPage
