import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux' // 1. Импортируем Provider
import { store } from '../store'       // 2. Импортируем твой созданный store
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* 3. Оборачиваем ВЕСЬ App в Provider */}
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)