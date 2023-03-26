import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BodyContainer from '../components/body/container';
import ReceiptsByCategory from '../components/group-account/receipt/category-component';
import controls from '../controls/controls';
import {
	GroupAccountItem,
	ReceiptCategory,
} from '../types/components/group-account';

export default function GroupAccountDetail() {
	const location = useLocation();
	const categories = controls.receiptCategory;
	const [dialogTarget, setDialogTarget] = useState<ReceiptCategory | null>(
		null,
	);
	const { code, date, host, id, isDone, title, userLength, users } =
		location.state as GroupAccountItem;

	const handleDisplayDialog = (target: ReceiptCategory | null) => {
		setDialogTarget(target);
	};
	return (
		<>
			<BodyContainer>
				<div className='h-full rounded-lg overflow-y-scroll scrollbar-hide'>
					<h1
						className={`${
							dialogTarget ? 'blur-sm select-none' : ''
						} p-1 font-bold mb-2`}
					>
						{title}
					</h1>
					<ul>
						{categories.map((category, index) => {
							return (
								<ReceiptsByCategory
									key={category.id}
									onSetDialog={handleDisplayDialog}
									category={category}
									onTargetReset={() => handleDisplayDialog(null)}
									isDialogOpen={dialogTarget === category}
								/>
							);
						})}
					</ul>
				</div>
			</BodyContainer>
		</>
	);
}
