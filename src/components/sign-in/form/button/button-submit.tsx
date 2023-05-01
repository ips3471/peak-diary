interface ButtonSubmitProps {
	name: string;
}

export default function ButtonSubmit({ name }: ButtonSubmitProps) {
	return (
		<button
			type='submit'
			className='w-full rounded-md p-2 bg-main-brand text-pureWhite'
		>
			{name}
		</button>
	);
}
