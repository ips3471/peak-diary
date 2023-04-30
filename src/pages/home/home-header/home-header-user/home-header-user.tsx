import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';

interface HomeHeaderUserProps {
	username: string;
}

export default function HomeHeaderUser({ username }: HomeHeaderUserProps) {
	return (
		<Link to='/mypage'>
			<span className='text-xl flex items-center'>
				<b>{username}</b>님 <GrFormNext />
			</span>
		</Link>
	);
}
