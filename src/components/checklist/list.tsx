import React from 'react';
import { CheckListItem } from '../../types/interfaces/interfaces';
import StagedItem from './list-item-staged';
import UnstagedItem from './list-item-unstaged';

interface ListContainerProps {
	items: CheckListItem[];
	onUpdate: (list: CheckListItem) => void;
	onDelete: (list: CheckListItem) => void;
}
export default function ListContainer({
	items,
	onUpdate,
	onDelete,
}: ListContainerProps) {
	function ListItemsFilteredByStaged(isStaged: boolean) {
		return items
			.filter(i => i.staged === isStaged)
			.map(filtered => {
				if (isStaged) {
					return (
						<StagedItem onUpdate={onUpdate} item={filtered} key={filtered.id} />
					);
				} else {
					return (
						<UnstagedItem
							onUpdate={onUpdate}
							onDelete={onDelete}
							item={filtered}
							key={filtered.id}
						/>
					);
				}
			});
	}
	return (
		<div className=' overflow-y-scroll scrollbar-hide'>
			<ul className='overflow-y-scroll scrollbar-hide'>
				{ListItemsFilteredByStaged(true)}
			</ul>
			<hr className='my-4' />
			<ul className='overflow-y-scroll scrollbar-hide'>
				{ListItemsFilteredByStaged(false)}
			</ul>
		</div>
	);
}
