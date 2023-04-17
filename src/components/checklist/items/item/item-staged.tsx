import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { CheckListItem } from '../../../../types/checklist/checklist';

interface StagedItemProps {
	item: CheckListItem;
	onMove: (list: CheckListItem) => void;
	onChangeChecked: (list: CheckListItem) => void;
}

export default function StagedItem({
	item,
	onMove,
	onChangeChecked,
}: StagedItemProps) {
	console.log('***render staged-item');
	const { checked, name, id } = item;

	return (
		<li className='flex px-checkList '>
			<div className='checkbox-wrapper-11 flex-1  flex '>
				<input
					id={id}
					type='checkbox'
					checked={checked}
					name='r'
					value='2'
					onChange={() => onChangeChecked(item)}
				/>
				<label className='w-full' htmlFor={id}>
					{name}
				</label>
			</div>
			<button className='p-1' onClick={() => onMove(item)}>
				<MdOutlineArrowDropDownCircle />
			</button>
		</li>
	);
}
