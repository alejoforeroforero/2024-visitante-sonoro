import { useSelector } from 'react-redux';
import { useAdminGetStatus } from '../../../hooks/useAdminGetStatus';
import AdminHeader from './components/AdminHeader';

const AdminCategories = () => {
  useAdminGetStatus(null);
  const admin = useSelector(state => state.adminReducer);

  return (
    <div>
      {admin.isSignedIn &&
        <>
          <AdminHeader />
          <h2>Categorias</h2>
        </>
      }
    </div>
  )
}

export default AdminCategories