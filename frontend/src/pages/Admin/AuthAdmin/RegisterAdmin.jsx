import Card from '../../../components/card/Card';
import styles from './AuthAdmin.module.scss';

const RegisterAdmin = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <p>El registro para administradores es privado. Por favor contactar a un miembro de Visitante Sonoro</p>
        </div>
      </Card>
    </div>
  )
}

export default RegisterAdmin