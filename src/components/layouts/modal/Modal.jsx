import styles from './Modal.module.css'
import { useRef, useEffect, useContext } from 'react'
import { ModalContext } from '../../../contexts/modal/ModalContext'
import Button from '../../core/Button/Button'
import { SignupModalContext } from '../../../contexts/signup-modal/SignupModalContext'

const Modal = ({ children }) => {
  const modalRef = useRef(null)
  const { isModalOpen } = useContext(ModalContext)
  const { handleClose } = useContext(SignupModalContext)

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
      // handleCloseModal()
      handleClose()
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
        onClick={handleClose}>
        <span className={styles.btnClose}>&times;</span>
      </Button>
      {children}
    </dialog>
  )
}

export default Modal
