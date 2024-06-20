import NavHeader from './components/global/NavHeader'
import { useLocation } from 'react-router-dom'
import HomePage from './pages/Home'
type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  return (
    <div className="app-layout min-h-screen flex flex-col">
      {location.pathname === '/' && <HomePage />}{' '}
      <nav className="sticky top-0 z-50 bg-secondary">
        <NavHeader />
      </nav>
      <main className="flex-grow">{children}</main>
    </div>
  )
}

export default Layout
