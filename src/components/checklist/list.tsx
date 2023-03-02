import React from 'react';
import { CheckListItem } from '../../types/interfaces/interfaces';
import StagedItem from './list-item-staged';
import UnstagedItem from './list-item-unstaged';

interface ListContainerProps {
	items: CheckListItem[];
	onUpdate: (list: CheckListItem) => void;
	onDelete: (list: CheckListItem) => void;
	title: string;
}
export default function ListContainer({
	items,
	onUpdate,
	onDelete,
	title,
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
		<div>
			<h1>{title}</h1>
			<h1>
				<b>staged✔</b>
			</h1>
			<ul>{ListItemsFilteredByStaged(true)}</ul>

			<h1>
				<b>unstaged</b>
			</h1>
			<ul>{ListItemsFilteredByStaged(false)}</ul>
		</div>
	);
}
