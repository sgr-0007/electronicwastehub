import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'
//theme
import 'primereact/resources/themes/saga-green/theme.css';
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import 'primeflex/primeflex.min.css'
import 'primeflex/primeflex.css'
import { PrimeReactProvider } from 'primereact/api';

ReactDOM.createRoot(document.getElementById('root')).render(
        <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
)
