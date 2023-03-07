import { CheckListItem } from '../../types/interfaces/interfaces';
import { MdDeleteOutline } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';

interface ListItemProps {
	item: CheckListItem;
	onDelete: (list: CheckListItem) => void;
	onUpdate: (list: CheckListItem) => void;
}

export default function UnstagedItem({
	item,
	onDelete,
	onUpdate,
}: ListItemProps) {
	return (
		<li className='flex px-checkList p-1'>
			<button
				className='p-1'
				onClick={() => onUpdate({ ...item, staged: true })}
			>
				<GrAdd />
			</button>

			<span className='flex-1 mx-4'>{item.name}</span>

			<button className='p-1 text-red-600' onClick={() => onDelete(item)}>
				<MdDeleteOutline />
			</button>
		</li>
	);
}
