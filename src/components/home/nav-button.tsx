import { Link } from 'react-router-dom';

interface NavButtonProps {
	path: string;
	title: string;
	description: string;
}

export default function NavButton({
	path,
	title,
	description,
}: NavButtonProps) {
	return (
		<Link to={path}>
			<div className='w-full h-full p-3 '>
				<h2 className='font-semibold text-dark/90'>{title}</h2>
				<p className='text-grey text-sm'>{description}</p>
			</div>
		</Link>
	);
}
