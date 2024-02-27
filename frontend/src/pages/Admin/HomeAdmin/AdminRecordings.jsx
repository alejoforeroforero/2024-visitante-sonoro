import { useSelector } from 'react-redux';
import { useAdminGetStatus } from '../../../hooks/useAdminGetStatus';
import AdminHeader from './components/AdminHeader';

const AdminRecordings = () => {
    useAdminGetStatus(null);
    const admin = useSelector(state => state.adminReducer);

    return (
        <div>
            {admin.isSignedIn &&
                <>
                    <AdminHeader />
                    <h2>Recordings</h2>
                </>
            }
        </div>
    )
}

export default AdminRecordings