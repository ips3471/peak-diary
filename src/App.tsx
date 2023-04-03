import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { BlurContextProvider } from './context/BlurContext';

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	function toggleMenuOpen() {
		setMenuOpen(!menuOpen);
	}

	return (
		<>
			<div className='h-full w-full flex flex-col '>
				<AuthProvider>
					<Navbar menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
					<BlurContextProvider>
						<div
							className={`transition-[filter] ${
								menuOpen && 'blur-sm'
							} flex-1 overflow-hidden`}
						>
							<Outlet />
						</div>
					</BlurContextProvider>
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
