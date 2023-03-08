import React from 'react';
import { CheckListItem, CheckListTab } from '../../types/interfaces/interfaces';
import StagedItem from './list-item-staged';
import UnstagedItem from './list-item-unstaged';

interface ListContainerProps {
	onUpdate: (list: CheckListItem) => void;
	onDelete: (list: CheckListItem) => void;
	current: string;
	tabs: CheckListTab[];
}
export default function ListContainer({
	onUpdate,
	onDelete,
	current,
	tabs,
}: ListContainerProps) {
	function ListItemsFilteredByStaged(isStaged: boolean) {
		const currentTab = tabs.find(t => t.id === current);
		const items = currentTab?.items;
		return (
			items &&
			items
				.filter(i => i.staged === isStaged)
				.sort((x, y) => (x.checked === y.checked ? 0 : x.checked ? 1 : -1))
				.map(filtered => {
					if (isStaged) {
						return (
							<StagedItem
								onUpdate={onUpdate}
								item={filtered}
								key={filtered.id}
							/>
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
				})
		);
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
