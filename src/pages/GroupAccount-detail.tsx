import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BodyContainer from '../components/body/container';
import ReceiptsByCategory from '../components/group-account/receipt/category-component';
import controls from '../controls/controls';
import {
	GroupAccountItem,
	ReceiptCategory,
} from '../types/components/group-account';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

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
					<div
						className={`p-1 font-bold mb-2 flex items-center ${
							dialogTarget ? 'blur-sm select-none' : ''
						}`}
					>
						<Link className='p-2' to={'/group-account'}>
							<BiArrowBack />
						</Link>
						<h1 className={` `}>{title}</h1>
					</div>
					<ul>
						{categories.map((category, index) => {
							return (
								<ReceiptsByCategory
									key={category.id}
									onSetDialog={handleDisplayDialog}
									category={category}
									onTargetReset={() => handleDisplayDialog(null)}
									isDialogOpen={!!dialogTarget}
									isSelected={dialogTarget === category}
								/>
							);
						})}
					</ul>
				</div>
			</BodyContainer>
		</>
	);
}
