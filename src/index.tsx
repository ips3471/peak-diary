import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import ProtectedRoute from './pages/ProtectedRoute';
import Diary from './pages/Diary';
import Profile from './pages/Profile';
import CheckListPage from './pages/CheckList';
import GroupAccountPage from './pages/group-account/schedule';
import ScheduleDetail from './components/group-account/schedule-detail';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				path: '/',
				element: <Home />,
			},
			{
				path: '/checklist',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<CheckListPage />
					</ProtectedRoute>
				),
			},
			{
				path: '/mypage',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: '/admin',
				element: (
					<ProtectedRoute requireAdmin={true}>
						<Admin />
					</ProtectedRoute>
				),
			},
			{
				path: '/diary',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<Diary />
					</ProtectedRoute>
				),
			},
			{
				path: '/personal',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<div>personal page</div>
					</ProtectedRoute>
				),
			},
			{
				path: '/benefit',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<div>benefit page</div>
					</ProtectedRoute>
				),
			},
			{
				path: '/more',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<div>more page</div>
					</ProtectedRoute>
				),
			},
			{
				path: '/group-account',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<GroupAccountPage />
					</ProtectedRoute>
				),
			},
			{
				path: '/group-account/:id',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<ScheduleDetail />
					</ProtectedRoute>
				),
			},
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
