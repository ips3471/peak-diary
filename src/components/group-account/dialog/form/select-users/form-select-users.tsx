import { UserProfile } from '../../../../../types/components/profile';
import Rounded from '../../../../forms/rounded';
import FormSelectUserItem from './form-select-user-item';

interface FormSelectUsersProps {
	users: UserProfile[];
	usersToPay: UserProfile[];
}

export default function FormSelectUsers({
	users,
	usersToPay,
}: FormSelectUsersProps) {
	return (
		<Rounded isStretched={true} color='light'>
			<span className='text-softBlack text-sm w-20 self-center'>정산대상</span>
			<ul className='w-full scrollbar-hide flex justify-end overflow-x-scroll gap-2'>
				{users.map(user => (
					<FormSelectUserItem
						user={user}
						defaultValue={!!usersToPay.find(u => u.uid === user.uid)}
						key={user.uid}
					/>
				))}
			</ul>
		</Rounded>
	);
}
