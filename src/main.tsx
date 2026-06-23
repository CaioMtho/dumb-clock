import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { DepsProvider } from '@/presentation/deps-provider'
import { appDependencies } from '@/infra/app-dependencies'

document.documentElement.lang = 'pt-BR'
document.documentElement.setAttribute('data-theme', 'dracula')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DepsProvider container={appDependencies}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DepsProvider>
  </StrictMode>,
)
