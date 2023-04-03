import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface NavButtonProps {
	path: string;
	title: string;
	description: string;
	requireSignIn: boolean;
}

export default function NavButton({
	path,
	title,
	description,
	requireSignIn,
}: NavButtonProps) {
	const { user } = useAuthContext();
	const isAllowed = !requireSignIn || (requireSignIn && !!user?.uid);

	return (
		<div className={`h-full`}>
			<Link to={isAllowed ? path : '/'}>
				<div className='w-full h-full p-3 '>
					<h2 className='font-semibold text-dark/90'>{title}</h2>
					<p className='text-grey text-sm'>{description}</p>
				</div>
			</Link>
		</div>
	);
}
