import styles from './SignupModal.module.css'
import { useContext, useState } from 'react'
// import Modal from '../../components/layouts/modal/Modal'
import Modal from '../../components/core/modal/Modal'
import SignupForm from '../signup-form/SignupForm'
import { AuthContext } from '../../contexts/auth/AuthContext'
import { SignupModalContext } from '../../contexts/signup-modal/SignupModalContext'

const SignupModal = () => {
  const { handleCloseModal } = useContext(AuthContext)

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
