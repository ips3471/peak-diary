import { SignUpForm } from '../../types/sign-in/signIn';

type Validate = Record<keyof SignUpForm, boolean>;

export function validator(form: SignUpForm) {
	const { email, password, password2, username } = form;
	let validate: Validate = {
		email: false,
		password: false,
		password2: false,
		username: false,
	};
	validatePassword(password, password2, validate);
	validateEmail(email, validate);
	validateUsername(username, validate);
	const isComplete = Object.values(validate).every(isValid => isValid === true);
	return isComplete;
}

function validateUsername(name: string, validate: Validate) {
	if (name.length > 4) {
		return alert('이름은 4자 이하여야 합니다');
	}
	validate.username = true;
}

function validateEmail(email: string, validate: Validate) {
	const regex =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	const isValid = regex.test(email);
	if (!isValid) {
		return alert('이메일 형식이 올바르지 않습니다');
	}
	validate.email = true;
}

function validatePassword(
	password1: string,
	password2: string,
	validate: Validate,
) {
	if (password1.length > 12) {
		return alert('패스워드는 12자 이하');
	}
	if (password1.length < 4) {
		return alert('패스워드는 4자 이상');
	}

	if (password1 !== password2) {
		return alert('패스워드 불일치');
	}

	validate.password = true;
	validate.password2 = true;
}
