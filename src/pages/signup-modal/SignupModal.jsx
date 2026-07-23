import styles from './SignupModal.module.css'
import { useContext, useState } from 'react'
import Modal from '../../components/layouts/modal/Modal'
import SignupForm from '../signup-form/SignupForm'
import { SignupFormContext } from '../../contexts/signup-form/SignupFormContext'
import { ModalContext } from '../../contexts/modal/ModalContext'
import { SignupModalContext } from '../../contexts/signup-modal/SignupModalContext'

const SignupModal = () => {
  const { handleCloseModal } = useContext(ModalContext)

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

  // Changes isModalOpen & signupFormData
  const handleClose = () => {
    setSignupFormData(defaultSignupFormData)
    setValidFormData(defaultValidFormData)
    setSignupErrorMsg('')
    handleCloseModal()
  }
  return (
    <SignupModalContext value={{ handleClose }}>
      <Modal>
        <div className={styles.modalWrapper}>
          {/* Subtitle */}
          <h2 className={styles.subtitle}>Sign Up</h2>
          <SignupFormContext
            value={{
              defaultSignupFormData,
              signupFormData,
              setSignupFormData,
              defaultValidFormData,
              validFormData,
              setValidFormData,
              signupErrorMsg,
              setSignupErrorMsg,
            }}>
            <SignupForm />
          </SignupFormContext>
        </div>
      </Modal>
    </SignupModalContext>
  )
}

export default SignupModal
