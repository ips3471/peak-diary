import { CheckListItem } from '../../types/interfaces/interfaces';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';

interface ListItemProps {
	item: CheckListItem;
	onUpdate: (list: CheckListItem) => void;
}

export default function StagedItem({ item, onUpdate }: ListItemProps) {
	return (
		<li className='flex px-checkList '>
			<div className='checkbox-wrapper-11 flex-1  flex '>
				<input
					id={item.id}
					type='checkbox'
					checked={item.checked}
					name='r'
					value='2'
					onChange={() => onUpdate({ ...item, checked: !item.checked })}
				/>
				<label className='w-full' htmlFor={item.id}>
					{item.name}
				</label>
			</div>
			<button
				className='p-1'
				onClick={() => onUpdate({ ...item, staged: false, checked: false })}
			>
				<MdOutlineArrowDropDownCircle />
			</button>
		</li>
	);
}
