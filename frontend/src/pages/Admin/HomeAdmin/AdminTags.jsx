import { useSelector } from 'react-redux';
import { useAdminGetStatus } from '../../../hooks/useAdminGetStatus';
import AdminHeader from './components/AdminHeader';

const AdminTags = () => {
    useAdminGetStatus(null);
    const admin = useSelector(state => state.adminReducer);

    return (
        <div>
            {admin.isSignedIn &&
                <>
                    <AdminHeader />
                    <h2>Tags</h2>
                </>
            }
        </div>
    )
}

export default AdminTags