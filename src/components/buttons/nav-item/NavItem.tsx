import React from 'react';
import { Link } from 'react-router-dom';

export default function NavItem({ title, href }: NavItemProps) {
	return (
		<div>
			<Link
				onClick={() => {
					console.log('click');
				}}
				to={href}
			>
				<span className='whitespace-nowrap'>{title}</span>
			</Link>
		</div>
	);
}

interface NavItemProps {
	title: string;
	href: string;
}
