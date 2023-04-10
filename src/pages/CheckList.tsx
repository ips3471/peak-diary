import { useAuthContext } from '../context/AuthContext';
import InitTabsByUser from '../components/checklist/tab/init/init-by-user';
import { CheckListController } from '../controller/checklist';

export default function CheckListPage() {
	const { user } = useAuthContext();
	const controller = user && new CheckListController(user.uid);
	return <>{controller && <InitTabsByUser tabController={controller} />}</>;
}
