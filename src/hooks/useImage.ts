import { useEffect, useState } from 'react';

export function useImage(url: string) {
	const [receiptImage, setReceiptImage] = useState('');

	useEffect(() => {
		fetch(url)
			.then(res => res.blob())
			.then(image => {
				const localUrl = URL.createObjectURL(image);
				setReceiptImage(localUrl);
			});
	}, [url]);

	return receiptImage;
}
