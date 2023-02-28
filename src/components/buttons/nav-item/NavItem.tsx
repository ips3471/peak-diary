import React from 'react';
import { Link } from 'react-router-dom';

export default function NavItem({ title, href }: NavItemProps) {
	return (
		<Link to={href}>
			<span className='whitespace-nowrap'>{title}</span>
		</Link>
	);
}

interface NavItemProps {
	title: string;
	href: string;
}
