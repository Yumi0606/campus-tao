import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { Navbar } from '@/components/feature/Navbar'
import { Footer } from '@/components/feature/Footer'
import { ToastProvider } from '@/components/base/Toast'

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-background-50">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App