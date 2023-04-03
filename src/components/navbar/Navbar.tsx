import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Login from '../buttons/login/Login';
import NavItem from '../buttons/nav-item/NavItem';
import User from '../buttons/user/User';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import controls from '../../controls/controls';
import { NavMenuItem } from '../../types/interfaces/interfaces';

interface NavbarProps {
	toggleMenuOpen: () => void;
	menuOpen: boolean;
}

const Navbar = ({ toggleMenuOpen, menuOpen }: NavbarProps) => {
	const { user } = useAuthContext();
	const menuItems = controls.menu.items;

	function displayMenu(
		menuItem: NavMenuItem<'login' | 'profile' | 'route'>,
		delay: number,
	) {
		switch (menuItem.type) {
			case 'login':
				return <Login delay={delay * 100} />;
				break;
			case 'profile':
				return <User href={menuItem.path} delay={delay * 100} />;
				break;
			case 'route':
				return (
					<NavItem
						href={menuItem.path}
						title={menuItem.title}
						key={menuItem.id}
						delay={delay * 100}
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
					<h1 className='flex items-center'>
						<img alt='logo' src='/img/logo.png' width='32px' />
						<span className=' font-serif md:inline'>Diary</span>{' '}
					</h1>
				</Link>
				{/*
				 */}
				<div className={` flex justify-end flex-1`}>
					<button
						onClick={() => toggleMenuOpen()}
						className='text-brand text-2xl z-50'
					>
						{menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
					</button>
				</div>
				<nav
					className={`transition-[height] absolute w-full opacity-95 z-10 text-right top-0 left-0  bg-pureWhite ${
						menuOpen ? 'h-full pt-20 p-4' : 'h-0'
					} scrollbar-hide sm:flex sm:overflow-x-scroll items-center gap-4 font-semibold`}
				>
					<ul className={`${menuOpen ? 'block' : 'hidden'}`}>
						{menuItems.map(item => {
							const delay = menuItems.indexOf(item) + 1;
							return (
								<li
									onClick={() => toggleMenuOpen()}
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
									{displayMenu(item, delay)}
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
