import { memo, useCallback, useState } from 'react';
import { NavId, NavItem } from '../../../types/navbar/navbar';
import LinkComponent from './link-component/link-component';

interface LinksContainerProps {
	items: NavItem[];
}

function LinksContainer({ items }: LinksContainerProps) {
	console.log('render');

	const [activeLink, setActiveLink] = useState<NavId>('home');

	const handleActiveLink = useCallback((id: NavId) => setActiveLink(id), []);

	return (
		<ul className='flex justify-between h-full items-center overflow-hidden'>
			{items.map(item => (
				<li key={item.id}>
					<LinkComponent
						onSelect={handleActiveLink}
						item={item}
						isActive={item.id === activeLink}
					/>
				</li>
			))}
		</ul>
	);
}

export default memo(LinksContainer);
