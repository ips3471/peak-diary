import React from 'react';
import { Link } from 'react-router-dom';
import { selectedDelay } from '../../navbar/utils/utils';

export default function NavItem({ title, href, delay }: NavItemProps) {
	return (
		<div className={`opacity-0 animate-appear ${selectedDelay(delay)}`}>
			<div className={`animate-show-orderly ${selectedDelay(delay)}`}>
				<Link
					onClick={() => {
						console.log('click');
					}}
					to={href}
				>
					<span className={`whitespace-nowrap`}>{title}</span>
				</Link>
			</div>
		</div>
	);
}

interface NavItemProps {
	title: string;
	href: string;
	delay: number;
}
