import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
	return (
		<>
			<div className='h-full w-full flex flex-col '>
				<AuthProvider>
					<div className={` transition-[filter] flex-1 overflow-hidden`}>
						<Outlet />
					</div>
					<Navbar />
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
