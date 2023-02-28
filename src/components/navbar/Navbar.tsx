import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Login from '../buttons/login/Login';
import NavItem from '../buttons/nav-item/NavItem';
import User from '../buttons/user/User';

interface NavbarProps {
	page: 'home' | 'checklist' | 'diary' | 'admin';
}

/*
Unit test
	구현사항:
		1. 로고
		2. nav아이템들
		3. 로그인

		dynamic test:
		1. 
		2.

	Dependencies:
		- MemoryRouter
*/

const Navbar = ({ page }: NavbarProps) => {
	const { user } = useAuthContext();

	return (
		<header className=' border-b border-gray-300'>
			<div className='flex justify-between px-side py-4'>
				<Link to={'/'} className={'text-3xl text-brand'}>
					<h1 className='whitespace-nowrap mr-16'>
						<span>〽Peak</span>
						<span className='hidden md:inline'>Diary</span>{' '}
					</h1>
				</Link>
				<nav className='hidden scrollbar-hide sm:flex sm:overflow-x-scroll items-center gap-4 font-semibold'>
					{user && <NavItem title='산행준비물' href='checklist' />}
					{/* <NavItem title='통제정보' href='/' /> */}
					{/* <NavItem title='날씨정보' href='/' /> */}
					{user && <NavItem title='산행일기' href='diary' />}
					{/* <NavItem title='공유앨범' href='/' /> */}
					{user && <User />}
					{user?.isAdmin && <NavItem title='관리자' href='admin' />}
					<Login />
				</nav>
				<button className='block sm:hidden'>toggle</button>
			</div>
		</header>
	);
};

export default Navbar;
