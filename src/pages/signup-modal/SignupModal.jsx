import styles from './SignupModal.module.css'
import { useContext, useState } from 'react'
import Modal from '../../components/layouts/modal/Modal'
import SignupForm from '../signup-form/SignupForm'
import { AuthUIContext } from '../../contexts/auth-ui/AuthUIContext'
import { SignupModalContext } from '../../contexts/signup-modal/SignupModalContext'

const SignupModal = () => {
  const { handleCloseModal } = useContext(AuthUIContext)

  // State
  const defaultSignupFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
  const [signupFormData, setSignupFormData] = useState(defaultSignupFormData)

  const defaultValidFormData = {
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)
  const [signupErrorMsg, setSignupErrorMsg] = useState('')

  const handleSignupClose = () => {
    setSignupFormData(defaultSignupFormData)
    setValidFormData(defaultValidFormData)
    setSignupErrorMsg('')
    handleCloseModal()
    // setActiveModal('login')
  }
  return (
    <SignupModalContext
      value={{
        handleSignupClose,
        defaultSignupFormData,
        signupFormData,
        setSignupFormData,
        defaultValidFormData,
        validFormData,
        setValidFormData,
        signupErrorMsg,
        setSignupErrorMsg,
      }}>
      <Modal>
        <div className={styles.modalWrapper}>
          {/* Subtitle */}
          <h2 className={styles.subtitle}>Sign Up</h2>
          <SignupForm />
        </div>
      </Modal>
    </SignupModalContext>
  )
}

export default SignupModal
