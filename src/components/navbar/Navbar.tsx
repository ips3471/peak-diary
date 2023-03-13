import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Login from '../buttons/login/Login';
import NavItem from '../buttons/nav-item/NavItem';
import User from '../buttons/user/User';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import controls from '../../controls/controls';
import { NavMenuItem } from '../../types/interfaces/interfaces';

interface NavbarProps {
	page: 'home' | 'checklist' | 'diary' | 'admin';
}

const Navbar = ({ page }: NavbarProps) => {
	const { user } = useAuthContext();
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		console.log('menu open', menuOpen);
		if (!menuOpen) {
			return;
		}
	}, [menuOpen]);

	function displayMenu(menuItem: NavMenuItem<'login' | 'profile' | 'route'>) {
		switch (menuItem.type) {
			case 'login':
				return <Login />;
				break;
			case 'profile':
				return <User />;
				break;
			case 'route':
				return (
					<NavItem
						href={menuItem.path}
						title={menuItem.title}
						key={menuItem.id}
					/>
				);
			default:
				throw new Error(`Not valid menu item: ${menuItem}`);
		}
	}

	return (
		<header className=' border-b border-gray-300 z-50 opacity-90'>
			<div className='flex justify-between px-side py-4'>
				<Link to={'/'} className={'text-3xl text-brand'}>
					<h1 className='whitespace-nowrap mr-16'>
						<span>〽Peak</span>
						<span className='hidden md:inline'>Diary</span>{' '}
					</h1>
				</Link>
				{/*
				 */}
				<div className={` flex justify-end flex-1`}>
					<button
						onClick={() => {
							setMenuOpen(!menuOpen);
						}}
						className='text-brand text-2xl z-50'
					>
						{menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
					</button>
				</div>
				<nav
					className={`absolute w-full opacity-95 z-10 text-right top-0 left-0 p-4 bg-pureWhite ${
						menuOpen ? 'h-full pt-20' : 'h-0 hidden'
					} scrollbar-hide sm:flex sm:overflow-x-scroll items-center gap-4 font-semibold`}
				>
					<ul className=''>
						{controls.menu.items.map(item => {
							return (
								<li
									onClick={() => setMenuOpen(false)}
									className={`
									
									${
										(item.isPrivate && !user) ||
										(item.isRequireAdmin && (!user?.isAdmin || !user))
											? 'hidden'
											: 'block'
									}
									p-1`}
									key={item.id}
								>
									{displayMenu(item)}
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
