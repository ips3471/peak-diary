import { createContext, ReactNode, useContext, useState } from 'react';

interface BlurContextProps {
	children: ReactNode;
}

type BlurContextValue = {
	isBlured: boolean;
	handleBlur: (isBlur: boolean) => void;
};

const BlurContext = createContext<BlurContextValue>({
	handleBlur: () => {},
	isBlured: false,
});

export function BlurContextProvider({ children }: BlurContextProps) {
	const [isBlured, setIsBlured] = useState<boolean>(false);

	const handleBlur = (isBlur: boolean) => setIsBlured(isBlur);

	return (
		<BlurContext.Provider value={{ isBlured, handleBlur }}>
			{children}
		</BlurContext.Provider>
	);
}

export function useBlurContext() {
	return useContext(BlurContext);
}
