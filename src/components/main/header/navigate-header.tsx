import { GrFormPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';

interface NavigateHeaderProps {
	url?: string;
	title: string;
}

export default function NavigateHeader({
	title,
	url = '/',
}: NavigateHeaderProps) {
	return (
		<div className='text-center pb-2'>
			<Link
				to={url}
				className='text-main-brand  text-2xl absolute left-0 top-0 p-4'
			>
				<GrFormPrevious />
			</Link>
			<h2 className='text-xl'>{title}</h2>
		</div>
	);
}
