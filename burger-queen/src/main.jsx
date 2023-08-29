/* eslint-disable no-unused-vars */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Login from './routes/Login';
import Admin from './routes/Admin';
import App from './routes/App';
import AdminProducts from './routes/AdminProducts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/app',
        element: <App />,
        children: [
          {
            path: 'admin',
            element: <Admin />,
          },
          {
            path: 'admin-products',
            element: <AdminProducts />,
          },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);
