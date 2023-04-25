interface PaymentComponentItemDescriptionProps {
	description: string;
}

export default function PaymentComponentItemDescription({
	description,
}: PaymentComponentItemDescriptionProps) {
	console.log('render');
	return <>{description}</>;
}
