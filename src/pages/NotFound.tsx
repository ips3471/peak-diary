export default function NotFound() {
	return (
		<div className="flex flex-col justify-center bg-cover items-center h-full bg-[url('/public/img/bg-error-page.svg')]">
			<div className="text-main-point flex items-center justify-center font-extrabold text-3xl w-full h-1/3 bg-cover bg-no-repeat bg-[url('/public/img/bg-blob.svg')]">
				<svg viewBox='0 0 500 500'>
					<path
						className='fill-transparent'
						id='curve'
						d='M73.2,208.6c4-6.1,65.5-96.8,158.6-95.6c111.3,1.2,170.8,90.3,175.1,97'
					/>
					<text width='500' className='fill-main-point'>
						<textPath xlinkHref='#curve'>SORRY... NOT FOUND 404 </textPath>
					</text>
				</svg>
			</div>
		</div>
	);
}
