
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import AppLayout from "./layouts/appLayout.tsx";
import InventoryPage from "./pages/inventory/inventoryPage.tsx";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/inventory" replace />,
            },
            {
                path: '/inventory',
                element: <InventoryPage />,
            },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}