import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillHome, AiFillTag } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { NavItem, NavId } from '../../../../types/navbar/navbar';
import { memo, useState } from 'react';
import { regexMatcher } from '../../utils/regexMatcher';

interface LinkComponentProps {
	item: NavItem;
	tabColor?: string;
	isActive: boolean;
	onSelect: (id: NavId) => void;
}

function LinkComponent({
	item,
	isActive,
	tabColor = 'bg-navbar-disable/30',
	onSelect,
}: LinkComponentProps) {
	console.log('render', item.name, isActive);

	const { id, name, url } = item;
	const [isTouching, setIsTouching] = useState<boolean>(false);

	regexMatcher(tabColor, /^bg-navbar-.+/);

	const toggleTouchState = () => setIsTouching(prev => !prev);

	const handleTouchEnd = () => {
		onSelect(id);
		toggleTouchState();
	};

	function NavIcon(id: NavId) {
		switch (id) {
			case 'home':
				return <AiFillHome />;
			case 'benefit':
				return <AiFillTag />;
			case 'more':
				return <FiMoreHorizontal />;
			case 'personal':
				return <BsFillPersonFill />;
		}
	}

	return (
		<Link
			to={url}
			onTouchStart={toggleTouchState}
			onTouchEnd={handleTouchEnd}
			className={`w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1 transition-all ${
				isActive ? 'text-navbar-active' : 'text-navbar-disable'
			}
			${isTouching ? tabColor : ''}
			`}
		>
			<span className='text-2xl'>{NavIcon(id)}</span>
			<h3 className='text-xs'>{name}</h3>
		</Link>
	);
}

export default memo(LinkComponent);
