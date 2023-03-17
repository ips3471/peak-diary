import React, { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
	return (
		<div className='bg-body h-full flex flex-col p-container'>{children}</div>
	);
}
