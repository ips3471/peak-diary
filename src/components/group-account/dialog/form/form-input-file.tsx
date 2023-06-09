import { ChangeEvent, useRef, useState } from 'react';
import LoadingSpinner from '../../../forms/loading-spinner';
import { AiOutlineDownload } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { uploadImage } from '../../../../service/cloudinary/cloudinary';

interface FormFileProps {
	name: string;
	url?: string;
	updateUrl: (url: string) => void;
}

export default function FormFile({ name, url, updateUrl }: FormFileProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.currentTarget.files && e.currentTarget.files[0];
		if (file) {
			setIsUploading(true);
			uploadImage(file)
				.then(updateUrl)
				.then(() => setIsUploading(false));
		}
	};
	return (
		<>
			<button
				onClick={() => fileInputRef && fileInputRef.current?.click()}
				type='button'
				className={`rounded-lg flex w-28 justify-center shadow-sm items-center ${
					url ? 'bg-brand' : 'bg-bodyAccent/90'
				} py-1 px-2 text-pureWhite/95 text-sm`}
			>
				{isUploading ? (
					<LoadingSpinner />
				) : (
					<>
						{!url && <AiOutlineDownload />}
						{url ? <BsCheck /> : '영수증 첨부'}
					</>
				)}
				<input
					ref={fileInputRef}
					className='w-0 '
					type='file'
					name={name}
					accept='image/*'
					onChange={handleFileChange}
				/>
			</button>
		</>
	);
}
