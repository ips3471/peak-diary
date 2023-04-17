import { MdDeleteOutline } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';
import { CheckListItem } from '../../../../types/checklist/checklist';

interface ListItemProps {
	item: CheckListItem;
	onDelete: (list: CheckListItem) => void;
	onMove: (list: CheckListItem) => void;
}

export default function UnstagedItem({
	item,
	onDelete,
	onMove,
}: ListItemProps) {
	console.log('render unstaged-item');

	return (
		<li className='flex px-checkList p-1'>
			<button className='p-1' onClick={() => onMove(item)}>
				<GrAdd />
			</button>

			<span className='flex-1 mx-4'>{item.name}</span>

			<button className='p-1 text-red-600' onClick={() => onDelete(item)}>
				<MdDeleteOutline />
			</button>
		</li>
	);
}
