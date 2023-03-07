import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';

type Page = 'home' | 'checklist' | 'diary' | 'admin';

function App() {
	const [page, setPage] = useState<Page>('home');

	return (
		<div className='border-2 border-red-500 h-full w-full flex flex-col'>
			<AuthProvider>
				<Navbar page={page} />
				<div className='flex-1'>
					<Outlet />
				</div>
			</AuthProvider>
		</div>
	);
}

export default App;
