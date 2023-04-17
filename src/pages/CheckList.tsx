import { useAuthContext } from '../context/AuthContext';
import InitTabs from '../components/checklist/init/init-by-user';
import { CheckListTabController } from '../controller/checklist/checklist-tab';

export default function CheckListPage() {
	const { user } = useAuthContext();
	const controller = user && new CheckListTabController(user.uid);
	return <>{controller && <InitTabs tabController={controller} />}</>;
}
