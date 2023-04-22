import { MdArrowRightAlt } from 'react-icons/md';
import { RiErrorWarningLine } from 'react-icons/ri';
import { UserProfile } from '../../../../../../../../types/components/profile';

interface ReceiptExceptedUsersProps {
	exceptedUsers: UserProfile[];
}

export default function ReceiptExceptedUsers({
	exceptedUsers,
}: ReceiptExceptedUsersProps) {
	return (
		<div className='text-orange-700 text-xs flex gap-1 ml-2 items-center'>
			<RiErrorWarningLine />
			{exceptedUsers.map(user => user.name).join(', ')} <MdArrowRightAlt />{' '}
			정산에서 제외
		</div>
	);
}
