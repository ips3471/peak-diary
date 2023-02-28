import React, { ChangeEvent } from 'react';
import { CheckListItem } from '../../types/interfaces/interfaces';
import { MdDeleteOutline } from 'react-icons/md';
import { BsArrowUpCircle } from 'react-icons/bs';

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
		<li>
			<button onClick={() => onUpdate({ ...item, staged: true })}>
				<BsArrowUpCircle />
			</button>
			<input
				type='text'
				value={item.name}
				onChange={e => onUpdate({ ...item, name: e.currentTarget.value })}
			/>
			<button onClick={() => onDelete(item)}>
				<MdDeleteOutline />
			</button>
		</li>
	);
}
