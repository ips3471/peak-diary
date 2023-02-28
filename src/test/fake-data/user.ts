import { User } from 'firebase/auth';

export const fakeAdmin: User = {
	uid: 'W98yFENuuEcSWhCWftRYQAeGxhs1',
	emailVerified: false,
	displayName: '나는도깨비',
	isAnonymous: false,
	photoURL:
		'https://lh3.googleusercontent.com/a/AEdFTp6FOBx0g35cs8T24PdlbOQa8aYluU6m40ejsn1DuQ=s96-c',
	providerData: [
		{
			providerId: 'google.com',
			uid: '102608138366985014707',
			displayName: '나는도깨비',
			email: null,
			phoneNumber: null,
			photoURL:
				'https://lh3.googleusercontent.com/a/AEdFTp6FOBx0g35cs8T24PdlbOQa8aYluU6m40ejsn1DuQ=s96-c',
		},
	],
	refreshToken:
		'APJWN8coqh8Td2uMp_TXkvWVZPeBzqvjzZUONiF2Mtb0CfppGGS3sxqBw_vr3AFiIoTVpTN6a_8CRQpIzAkdCZ2zWju-PDzt1AvlrxcBJUD7A3HW628_BbTvC9p2JjvKt6PZPlAfRQK7tX-cEOJLcAzg9qD_b4VOAulFEjaHyA8OF5gZuq2nkIkkLr9JrF3Dzd4THjOjnPSRogoULjphMG4anXY7riL-ynhjg0YcSCtOn-5ITeobxqDQbQqOnhAh-43V7U6K6CVb7xCzoBpwYjWviLzgdUaiYwsfb5rjNMaFLfE5gzFF6lVveGtdTtGW-Ky7MpHfSuh_dQCY7of2UpU15KaVbX-C34xcTcTxD-hO4ow02bbM9Gbx6-pxEqOYce6JpFerhV_j',
	metadata: {},
	tenantId: null,
	delete: async () => {},
	getIdToken: async () => '',
	getIdTokenResult: async () => ({
		authTime: '',
		expirationTime: '',
		issuedAtTime: '',
		signInProvider: null,
		signInSecondFactor: null,
		token: '',
		claims: {},
	}),
	reload: async () => {},
	toJSON: () => new Object(),
	email: null,
	phoneNumber: null,
	providerId: '',
};
