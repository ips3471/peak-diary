import NavButton from '../../nav-button';

interface NavButtonContainerProps {
	path: string;
	title: string;
	description: string;
	backgroundTailwindStyle: string;
}

export default function NavButtonContainer({
	path,
	title,
	description,
	backgroundTailwindStyle,
}: NavButtonContainerProps) {
	return (
		<section
			className={`col-span-2 h-1/3 rounded-xl border-2 shadow-sm ${backgroundTailwindStyle} bg-cover bg-no-repeat bg-center`}
		>
			<NavButton path={path} title={title} description={description} />
		</section>
	);
}
