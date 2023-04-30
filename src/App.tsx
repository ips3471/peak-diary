import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
	return (
		<>
			<div className='h-full w-full flex flex-col '>
				<AuthProvider>
					<div className={` transition-[filter] flex-1 overflow-hidden`}>
						<Outlet />
					</div>
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
