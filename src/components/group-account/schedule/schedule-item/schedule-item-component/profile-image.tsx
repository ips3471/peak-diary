import { memo } from 'react';
import { useImage } from '../../../../../hooks/useImage';

interface ProfileImageProps {
	url?: string | null;
}

function ProfileImage({ url }: ProfileImageProps) {
	const profileImage = useImage(url || './img/profile-holder.svg');

	return <img src={profileImage} />;
}

export default memo(ProfileImage);
