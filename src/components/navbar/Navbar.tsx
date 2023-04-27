import controls from '../../controls/controls';
import LinksContainer from './links/links-container';

interface NavbarProps {
	toggleMenuOpen: () => void;
	menuOpen: boolean;
}

const Navbar = ({}: NavbarProps) => {
	console.log('render');

	return (
		<nav className='h-14  bg-navbar-wrapper'>
			<LinksContainer items={controls.navbar.links} />
		</nav>
	);
};

export default Navbar;
