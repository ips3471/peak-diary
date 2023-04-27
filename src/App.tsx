import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	function toggleMenuOpen() {
		setMenuOpen(!menuOpen);
	}

	return (
		<>
			<div className='h-full w-full flex flex-col '>
				<AuthProvider>
					<div
						className={` transition-[filter] ${
							menuOpen && 'blur-sm'
						} flex-1 overflow-hidden`}
					>
						<Outlet />
					</div>
					<Navbar menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
