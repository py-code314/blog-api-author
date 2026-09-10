import styles from './LoginModal.module.css'
import { useContext, useState } from 'react'
import Modal from '../../../components/core/modal/Modal'
import LoginForm from '../../forms/auth/login-form/LoginForm'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import { LoginModalContext } from '../../../contexts/login-modal/LoginModalContext'

const LoginModal = () => {
  const { handleCloseModal } = useContext(AuthContext)

  // State
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

  // Changes isModalOpen & loginFormData
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
          {/* Subtitle */}
          <h2 className={styles.subtitle}>Log In</h2>
          <LoginForm />
        </div>
      </Modal>
    </LoginModalContext>
  )
}

export default LoginModal
