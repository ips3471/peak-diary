import InitGroupAccounts from '../components/group-account/init/init-by-user';
import { useAuthContext } from '../context/AuthContext';

export default function CheckListPage() {
	const { user } = useAuthContext();
	return <>{user && <InitGroupAccounts user={user} />}</>;
}
