import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CheckList from './pages/CheckList';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import ProtectedRoute from './pages/ProtectedRoute';
import Diary from './pages/Diary';
import Profile from './pages/Profile';
import GroupAccount from './pages/GroupAccount';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{ index: true, path: '/', element: <Home /> },
			{
				path: '/checklist',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<CheckList />
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
				path: '/group-account',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<GroupAccount />
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
