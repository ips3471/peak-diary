import { memo } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface DetailHeaderProps {
	title: string;
	isDone: boolean;
}

function DetailHeader({ title, isDone }: DetailHeaderProps) {
	return (
		<>
			<Link
				className={`p-2 flex items-center gap-1 ${
					isDone ? 'text-button_disabled' : ''
				}`}
				to={'/group-account'}
			>
				<BiArrowBack />
				<h1>
					{title} {isDone ? '(정산완료)' : ''}
				</h1>
			</Link>
		</>
	);
}

export default memo(DetailHeader);
