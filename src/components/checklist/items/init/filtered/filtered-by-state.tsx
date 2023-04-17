import { useEffect, useState } from 'react';
import { CheckListItemController } from '../../../../../controller/checklist/checklist-item';
import { CheckListItem } from '../../../../../types/checklist/checklist';
import StagedContainer from '../../container/staged-container';
import UnstagedContainer from '../../container/unstaged-container';
import AddForm from '../../../add-form/addForm';

interface ItemContainerProps {
	controller: CheckListItemController;
	allItems: CheckListItem[];
}

type ItemsMap = {
	staged: CheckListItem[];
	unstaged: CheckListItem[];
};

export default function FilteredItems({
	controller,
	allItems,
}: ItemContainerProps) {
	const [stagedItems, setStagedItems] = useState<CheckListItem[]>([]);
	const [unstagedItems, setUnstagedItems] = useState<CheckListItem[]>([]);

	useEffect(() => {
		const container: ItemsMap = { staged: [], unstaged: [] };
		const mapped = allItems.reduce((acc, curr): ItemsMap => {
			const key = curr.staged ? 'staged' : 'unstaged';
			return { ...acc, [key]: [...acc[key], curr] };
		}, container);

		setStagedItems(mapped.staged);
		setUnstagedItems(mapped.unstaged);
	}, [allItems]);

	return (
		<div>
			{controller.currentTab && (
				<AddForm
					controller={controller}
					stagedState={setStagedItems}
					unstagedState={setUnstagedItems}
				/>
			)}
			<StagedContainer
				toUnstagedState={setUnstagedItems}
				controller={controller}
				onUpdate={setStagedItems}
				items={stagedItems}
			/>
			<hr className='my-4' />
			<UnstagedContainer
				toStagedState={setStagedItems}
				controller={controller}
				onUpdate={setUnstagedItems}
				items={unstagedItems}
			/>
		</div>
	);
}
