import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Login from './routes/Login/Login';
import App from './routes/App';
import Dashboard from './routes/Admin/Dashboard';
import Products from './routes/Admin/Products';
import Users from './routes/Admin/Users';
import AllOrders from './routes/Admin/AllOrders';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/main',
        element: <App />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'products',
            element: <Products />,
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'orders',
            element: <AllOrders />,
          },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);
