
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import AppLayout from "./layouts/appLayout.tsx";
import InventoryPage from "./pages/inventory/inventoryPage.tsx";
import CreateSitePage from "./pages/createSitePage/createSitePage.tsx";

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
            {
                path: '/create-site',
                element: <CreateSitePage />,
            },
            {
                path: '/site/:id/edit',
                element: <CreateSitePage />,
            },
            {
                path: '/site/:id/detail',
                element: <CreateSitePage />,
            },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}