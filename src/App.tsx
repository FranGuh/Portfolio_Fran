import './styles/App.css'
import AppRouter from './routes/AppRouter'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {

  return (
    <main>
      <AppRouter />
      <Analytics />
      <SpeedInsights />
    </main>
  )
}

export default App
