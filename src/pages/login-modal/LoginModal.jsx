import styles from './LoginModal.module.css'
import { useContext, useState } from 'react'
import Modal from '../../components/layouts/modal/Modal'
import LoginForm from '../login-form/LoginForm'
import { LoginFormContext } from '../../contexts/login-form/LoginFormContext'
import { ModalContext } from '../../contexts/modal/ModalContext'
import { AuthModalContext } from '../../contexts/auth-modal/AuthModalContext'

const LoginModal = () => {
  const { handleCloseModal, setActiveModal } = useContext(ModalContext)

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
  const handleClose = () => {
    setLoginFormData(defaultLoginFormData)
    setValidFormData(defaultValidFormData)
    setLoginErrorMsg('')
    handleCloseModal()
    setActiveModal(null)
  }
  return (
    <AuthModalContext value={{ handleClose }}>
      <Modal>
        <div className={styles.modalWrapper}>
          {/* Subtitle */}
          <h2 className={styles.subtitle}>Log In</h2>
          <LoginFormContext
            value={{
              defaultLoginFormData,
              loginFormData,
              setLoginFormData,
              defaultValidFormData,
              validFormData,
              setValidFormData,
              loginErrorMsg,
              setLoginErrorMsg,
            }}>
            <LoginForm />
          </LoginFormContext>
        </div>
      </Modal>
    </AuthModalContext>
  )
}

export default LoginModal
