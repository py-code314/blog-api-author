import styles from './SignupModal.module.css'
import Modal from '../../components/layouts/modal/Modal'
import SignupForm from '../sign-up/SignupForm'

const SignupModal = () => {
  return (
    <Modal>
      {/* Subtitle */}
      <h2 className={styles.subtitle}>Sign Up</h2>
      <SignupForm />
    </Modal>
  )
}

export default SignupModal
