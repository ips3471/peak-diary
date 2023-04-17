import { useState } from 'react';
import FormContainer from '../../../forms/form-container';
import PromptInput from './prompt-input';
import { CheckListTab } from '../../../../types/checklist/checklist';

interface PromptDialogProps {
	onSubmit: (input: string) => void;
	onCancel: () => void;
	onDelete: () => void;
	selectedTab: CheckListTab | null;
}

export default function ChecklistTabForm({
	onSubmit,
	onCancel,
	onDelete,
	selectedTab,
}: PromptDialogProps) {
	const [input, setInput] = useState(selectedTab?.name || '');
	const handleChange = (text: string) => setInput(text);
	return (
		<FormContainer
			onSubmit={() => onSubmit(input)}
			title={selectedTab ? '탭 이름 수정' : '새로운 탭 생성'}
			onCancel={onCancel}
			submitName={selectedTab ? '수정' : '생성'}
			onDelete={onDelete}
			hasDelete={!!selectedTab}
		>
			<div className=' flex-1 flex items-start text-center'>
				<PromptInput input={input} onInputChange={handleChange} />
			</div>
		</FormContainer>
	);
}
