import React, { useState, useRef, useEffect } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { CheckListTabItem } from '../../../types/interfaces/interfaces';

interface TabItemProps {
	onSelect: (tab: CheckListTabItem) => void;
	item: CheckListTabItem;
	current?: CheckListTabItem;
	onFocus: (item: HTMLLIElement) => void;
}

export default function TabItem({
	item,
	onSelect,
	current,
	onFocus,
}: TabItemProps) {
	const [title, setTitle] = useState(item.name);
	const [freezed, setFreezed] = useState<boolean>(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (!freezed) {
			inputRef.current?.focus();
		}
	}, [freezed]);

	useEffect(() => {
		if (current?.id === item.id) {
			const element = listRef.current;

			element && onFocus(element);
		}
	}, [current]);

	const handleUpdate = () => {
		setFreezed(true);
		onSelect({ ...item, name: title });
		console.log('attach a update handler');
		//(title) => //checklist db.updte({...item, title]})
	};

	return (
		<li ref={listRef} className='inline-block my-2 mx-6'>
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
				<button onClick={() => setFreezed(false)}>
					<span
						className={`text-xs ${item === current ? 'visible' : 'invisible'}`}
					>
						<BsFillPencilFill />
					</span>
				</button>
			</div>
		</li>
	);
}
