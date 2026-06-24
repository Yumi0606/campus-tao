import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { Navbar } from '@/components/feature/Navbar'
import { Footer } from '@/components/feature/Footer'
import { ToastProvider } from '@/components/base/Toast'
import { AuthProvider } from '@/components/base/Auth'

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-background-50">
            <Navbar />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App