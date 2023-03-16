export function selectedDelay(delay: number): string {
	switch (delay) {
		case 100:
			return 'animation-delay-100';
		case 200:
			return 'animation-delay-200';
		case 300:
			return 'animation-delay-300';
		case 400:
			return 'animation-delay-400';
		case 500:
			return 'animation-delay-500';
		case 600:
			return 'animation-delay-600';
		case 700:
			return 'animation-delay-700';
		default:
			return '';
	}
}
