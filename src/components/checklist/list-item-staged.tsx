import { CheckListItem } from '../../types/interfaces/interfaces';
import { BsArrowDownCircle } from 'react-icons/bs';

interface ListItemProps {
	item: CheckListItem;
	onUpdate: (list: CheckListItem) => void;
}

export default function StagedItem({ item, onUpdate }: ListItemProps) {
	return (
		<li className='flex'>
			<div className='checkbox-wrapper-11'>
				<input
					id={item.id}
					type='checkbox'
					name='r'
					value='2'
					onChange={() => onUpdate({ ...item, checked: !item.checked })}
				/>
				<label htmlFor={item.id}>{item.name}</label>
			</div>
			<button
				onClick={() => onUpdate({ ...item, staged: false, checked: false })}
			>
				<BsArrowDownCircle />
			</button>
		</li>
	);
}
