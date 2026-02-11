import './styles/App.css'
import AppRouter from './routes/AppRouter'
import { Analytics } from '@vercel/analytics/react'

function App() {

  return (
    <>
      <AppRouter />
      <Analytics />
    </>
  )
}

export default App
