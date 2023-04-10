import { useState } from 'react';
import FormContainer from '../../../forms/form-container';
import PromptInput from './input';
import { CheckListDialog } from '../../../../types/components/checklist';

interface PromptDialogProps {
	dialog: CheckListDialog<string>;
	title: string;
	onSubmit: (input: string) => void;
	onCancel: () => void;
	onDelete: () => void;
	type: '수정' | '생성';
}

export default function PromptDialog({
	title,
	onSubmit,
	onCancel,
	onDelete: onDeleteTab,
	type,
	dialog,
}: PromptDialogProps) {
	const [input, setInput] = useState(dialog.input || '');
	const handleChange = (text: string) => setInput(text);

	return (
		<FormContainer title={title} onCancel={onCancel}>
			<form
				onSubmit={e => {
					e.preventDefault();
					onSubmit(input);
				}}
				className=' flex flex-col items-center text-grey'
			>
				<div className='flex-1 flex items-start text-center'>
					<PromptInput
						dialog={dialog}
						input={input}
						onInputChange={handleChange}
					/>
					<button className='ml-4' type='submit'>
						{type}
					</button>
				</div>
				{type === '수정' && (
					<>
						<span>혹은</span>
						<button
							onClick={onDeleteTab}
							className='mt-6 text-red-500'
							type='button'
						>
							삭제
						</button>
					</>
				)}
			</form>
		</FormContainer>
	);
}
