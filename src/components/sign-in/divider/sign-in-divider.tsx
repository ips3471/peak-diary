interface SignInDividerProps {}

export default function SignInDivider({}: SignInDividerProps) {
	const Line = <div className='border-t translate-y-1/2 flex-1' />;
	return (
		<>
			{Line}
			<span className='p-2'>Or</span>
			{Line}
		</>
	);
}
