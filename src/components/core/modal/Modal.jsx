/* -------------------- Styles -------------------- */
import styles from './Modal.module.css'
/* -------------------- Hooks -------------------- */
import { useRef, useEffect, useContext } from 'react'
/* -------------------- Context -------------------- */
import { AuthContext } from '../../../contexts/auth/AuthContext'
import { SignupModalContext } from '../../../contexts/signup-modal/SignupModalContext'
import { LoginModalContext } from '../../../contexts/login-modal/LoginModalContext'
/* -------------------- Components -------------------- */
import Button from '../button/Button'

/* Component to show dialog modal */
const Modal = ({ children }) => {
  const modalRef = useRef(null)
  const { activeModal } = useContext(AuthContext)
  const { handleSignupClose } = useContext(SignupModalContext)
  const { handleLoginClose } = useContext(LoginModalContext)

  // Computed variables
  const isModalOpen = activeModal === 'signup' || activeModal === 'login'

  // Show and close modal based on 'isModalOpen' value
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    if (isModalOpen) {
      modal.showModal()
    } else {
      modal.close()
    }
  }, [isModalOpen])

  // Close modal when Esc key is pressed
  const handleEscKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (activeModal === 'signup') {
        handleSignupClose()
      } else if (activeModal === 'login') {
        handleLoginClose()
      }
    }
  }

  // Close modal when Close button is clicked
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
      {/* Close button */}
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
