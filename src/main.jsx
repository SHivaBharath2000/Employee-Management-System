import { StrictMode, Suspense } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { store } from './Redux and States/Store';
import { Provider } from 'react-redux'; 
import './index.css'
import Spinner from './Employees list/Spinner.jsx';


const App=React.lazy(()=>import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner/>}>
        <App />
        </Suspense>
     </Provider>
  </StrictMode>,
)
