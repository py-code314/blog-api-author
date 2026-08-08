import styles from './Modal.module.css'
import { useRef, useEffect, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import { SignupModalContext } from '../../../contexts/signup-modal/SignupModalContext'
import { LoginModalContext } from '../../../contexts/login-modal/LoginModalContext'
import Button from '../../core/Button/Button'

const Modal = ({ children }) => {
  const modalRef = useRef(null)
  const { activeModal } = useContext(AuthContext)
  const { handleSignupClose } = useContext(SignupModalContext)
  const {handleLoginClose} = useContext(LoginModalContext)
  const isModalOpen = activeModal === 'signup' || activeModal === 'login'

  useEffect(() => {
    // Grab a reference to the modal
    const modal = modalRef.current
    if (!modal) return

    // Open modal when 'isOpen' changes to true
    if (isModalOpen) {
      modal.showModal()
    } else {
      modal.close()
    }
  }, [isModalOpen])

  // Update 'isOpen' when Esc key pressed
  const handleEscKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (activeModal === 'signup') {
        handleSignupClose()
      } else if (activeModal === 'login') {
        handleLoginClose()
      }
    }
  }

  const handleCloseBtn = () => {
    if (activeModal === 'signup') {
      handleSignupClose()
    } else if (activeModal === 'login') {
      handleLoginClose()
    }
  }

  return (
    <dialog
      className={styles.modal}
      ref={modalRef}
      onKeyDown={handleEscKeyDown}>
      <Button
        className="btnCloseModal"
        title="Close modal"
        onClick={handleCloseBtn}>
        <span className={styles.btnClose}>&times;</span>
      </Button>
      {children}
    </dialog>
  )
}

export default Modal
