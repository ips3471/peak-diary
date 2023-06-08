export type SignUpUser = {
	username: string;
	email: string;
	password: string;
	password2: string;
};

export type SignInForm = {
	email: string;
	password: string;
};

export type LoginState = SuccessState | FailState;

type SuccessState = {
	state: 'success';
	uid: string;
};

type FailState = {
	state: 'fail';
	error: {
		code: string | number;
		message: string;
	};
};

export type SignUpForm = {
	[k in keyof SignUpUser]: string;
};
