import React, { useState, MouseEvent, useRef, useEffect } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { CheckListTabItem } from '../../../types/interfaces/interfaces';

interface TabItemProps {
	onSelect: (tab: CheckListTabItem) => void;
	onTitleChange: (tab: CheckListTabItem) => void;
	item: CheckListTabItem;
	current?: CheckListTabItem;
}

export default function TabItem({
	onTitleChange,
	item,
	onSelect,
	current,
}: TabItemProps) {
	const [title, setTitle] = useState(item.name);
	const [freezed, setFreezed] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!freezed) {
			inputRef.current?.focus();
		}
	}, [freezed]);

	const handleUpdate = () => {
		setFreezed(true);
		console.log('attach a update handler');
		//(title) => //checklist db.updte({...item, title]})
	};

	return (
		<li className='inline-block my-2 mx-6'>
			<div className='flex items-center gap-2'>
				<button onClick={() => onSelect(item)}>
					<input
						ref={inputRef}
						type='text'
						placeholder='새로운 카테고리'
						onChange={e => setTitle(e.currentTarget.value)}
						disabled={freezed}
						value={title}
						onBlur={handleUpdate}
					/>
				</button>
				{item === current && (
					<button onClick={() => setFreezed(false)}>
						<span className='text-xs'>
							<BsFillPencilFill />
						</span>
					</button>
				)}
			</div>
		</li>
	);
}
