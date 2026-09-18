import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'rsuite/dist/rsuite.min.css';
import './styles/app.scss';
import App from "./app.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);