import { HomeGridItem } from '../../../types/models/model';
import NavButtonContainer from './home-content-item/nav-button-container';

interface HomeContentProps {
	items: HomeGridItem[];
}

export default function HomeContent({ items }: HomeContentProps) {
	return (
		<div className='grid grid-cols-4 grid-rows-2 gap-2 h-full '>
			{items.map((i, index) => (
				<NavButtonContainer
					key={index}
					description={i.description}
					path={i.path}
					title={i.title}
					backgroundTailwindStyle={i.backgroundTailwindStyle}
				/>
			))}
		</div>
	);
}
