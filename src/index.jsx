import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import './global.css';

import App from './App';
import { ResultContextProvider } from './contexts/ResultContextProvider';

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
    <ResultContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ResultContextProvider>
);