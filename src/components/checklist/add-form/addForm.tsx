import { memo, useState } from 'react';
import Toggle from 'react-toggle';
import {
	CheckListItem,
	UpdateState,
} from '../../../types/components/checklist';
import { CheckListItemController } from '../../../controller/checklist-item';
import AddFormInput from './addForm-input';

interface AddFormProps {
	stagedState: UpdateState<CheckListItem>;
	unstagedState: UpdateState<CheckListItem>;
	controller: CheckListItemController;
}

function AddForm({ controller, stagedState, unstagedState }: AddFormProps) {
	console.log('render add-form');

	const [stageState, setStageState] = useState<boolean>(true);

	const handleToggle = () => setStageState(!stageState);

	const handleAdd = (text: string) => {
		controller.addItem(
			text,
			stageState,
			stageState ? stagedState : unstagedState,
		);
	};

	return (
		<div className='py-2'>
			<div className='flex items-center justify-end py-1'>
				<label
					htmlFor='toggle-status'
					className='text-xs text-grey mr-1 font-extralight'
				>
					체크시 챙겨야할 목록에 추가
				</label>
				<Toggle
					id='toggle-status'
					defaultChecked={stageState}
					onChange={handleToggle}
				/>
			</div>
			<AddFormInput onAdd={handleAdd} />
		</div>
	);
}

export default memo(AddForm);
