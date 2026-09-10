/* -------------------- Styles -------------------- */
import styles from './LoginModal.module.css'
/* -------------------- Hooks -------------------- */
import { useContext, useState } from 'react'
/* -------------------- Hooks -------------------- */
import { AuthContext } from '../../../contexts/auth/AuthContext'
import { LoginModalContext } from '../../../contexts/login-modal/LoginModalContext'
/* -------------------- Hooks -------------------- */
import Modal from '../../../components/core/modal/Modal'
import LoginForm from '../../forms/auth/login-form/LoginForm'

/* Modal to show login form */
const LoginModal = () => {
  const { handleCloseModal } = useContext(AuthContext)

  // State variables
  const defaultLoginFormData = {
    email: '',
    password: '',
  }
  const [loginFormData, setLoginFormData] = useState(defaultLoginFormData)

  const defaultValidFormData = {
    email: null,
    password: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)
  const [loginErrorMsg, setLoginErrorMsg] = useState('')

  // Handler to close the modal
  const handleLoginClose = () => {
    setLoginFormData(defaultLoginFormData)
    setValidFormData(defaultValidFormData)
    setLoginErrorMsg('')
    handleCloseModal()
  }
  return (
    <LoginModalContext
      value={{
        handleLoginClose,
        defaultLoginFormData,
        loginFormData,
        setLoginFormData,
        defaultValidFormData,
        validFormData,
        setValidFormData,
        loginErrorMsg,
        setLoginErrorMsg,
      }}>
      <Modal>
        <div className={styles.modalWrapper}>
          <h2 className={styles.subtitle}>Log In</h2>
          <LoginForm />
        </div>
      </Modal>
    </LoginModalContext>
  )
}

export default LoginModal
