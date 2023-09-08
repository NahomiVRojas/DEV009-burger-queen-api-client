import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Login from './routes/Login/Login';
import App from './routes/App';
import Dashboard from './routes/Dashboard';
import Products from './routes/Admin/Products';
import Users from './routes/Admin/Users';
import AllOrders from './routes/Admin/AllOrders';
import NewOrders from './routes/Waiter/NewOrders';
import OrdersList from './routes/Waiter/OrdersList';
import ActiveOrders from './routes/Chef/ActiveOrders';
import PastOrders from './routes/Chef/PastOrders';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
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
  {
    path: '/waiter',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'new',
        element: <NewOrders />,
      },
      {
        path: 'orders',
        element: <OrdersList />,
      },
    ]
  },
  {
    path: '/chef',
    element: <App />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'orders',
        element: <ActiveOrders />,
      },
      {
        path: 'past-orders',
        element: <PastOrders />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
