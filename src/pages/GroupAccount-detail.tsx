import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BodyContainer from '../components/body/container';
import { GroupAccountItem } from '../types/components/group-account';

export default function GroupAccountDetail() {
	const param = useParams();
	const location = useLocation();

	const { code, date, host, id, isDone, title, userLength, users } =
		location.state as GroupAccountItem;

	return (
		<BodyContainer>
			<div>
				{param && (
					<>
						<span>{title}</span> <span>{date}</span>
					</>
				)}
			</div>
		</BodyContainer>
	);
}
