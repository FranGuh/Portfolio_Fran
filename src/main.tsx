import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes/AppRouter'
import './styles/App.css'

export const createRoot = ViteReactSSG({ routes })
