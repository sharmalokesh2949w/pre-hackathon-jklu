import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Global error handler to catch and display runtime errors
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding:20px;font-family:monospace;color:red;background:#fff5f5;border:2px solid red;margin:20px;border-radius:8px">
      <h2>Runtime Error</h2>
      <p><strong>${event.message}</strong></p>
      <p>File: ${event.filename}</p>
      <p>Line: ${event.lineno}:${event.colno}</p>
    </div>`;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
