import { useAdminGetStatus } from '../../../hooks/useAdminGetStatus';
import './HomeAdmin.css';

const HomeAdmin = () => {
  useAdminGetStatus('/admin/musicians'); 
}

export default HomeAdmin;