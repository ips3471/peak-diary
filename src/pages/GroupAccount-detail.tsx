import React from 'react';
import { useParams } from 'react-router-dom';

export default function GroupAccountDetail() {
	const param = useParams();

	console.log(param);
	return <div>{param && <span>{param.id}</span>}</div>;
}
