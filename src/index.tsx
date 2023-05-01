import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import ProtectedRoute from './pages/ProtectedRoute';
import Diary from './pages/Diary';
import Profile from './pages/Profile';
import CheckListPage from './pages/CheckList';
import GroupAccountPage from './pages/group-account/schedule';
import ScheduleDetail from './components/group-account/schedule-detail';
import WelcomeIntro from './pages/welcome/welcome-intro';
import SignInPage from './pages/welcome/welcome-auth-page/sign-in/sign-in-page';
import SignUpPage from './pages/welcome/welcome-auth-page/sign-up/sign-up-page';

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
				path: '/welcome',
				element: (
					<WelcomeIntro
						title='여행 전엔 준비, 여행 후엔 기록하기'
						description='여행 전 항상 준비하던 물건들을 꼼꼼하게 체크해보세요.'
					/>
				),
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
				path: '/login',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<SignInPage />
					</ProtectedRoute>
				),
			},
			{
				path: '/register',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<SignUpPage />
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
						<NotFound />
					</ProtectedRoute>
				),
			},
			{
				path: '/benefit',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<NotFound />
					</ProtectedRoute>
				),
			},
			{
				path: '/more',
				element: (
					<ProtectedRoute requireAdmin={false}>
						<NotFound />
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
