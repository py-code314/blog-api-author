import styles from './Modal.module.css'
import { useRef, useEffect, useContext } from 'react'
import { ModalContext } from '../../../contexts/modal/modal'
import Button from '../../core/Button/Button'

const Modal = ({ children }) => {
  const modalRef = useRef(null)
  const { isModalOpen, onClose } = useContext(ModalContext)

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

  // Update 'isOpen' when modal closed
  const handleCloseModal = () => {
    onClose?.()
  }

  // Update 'isOpen' when Esc key pressed
  const handleEscKeyDown = (e) => {
    if (e.key === 'Escape') {
      // onClose()
      handleCloseModal()
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
        onClick={handleCloseModal}>
        &times;
      </Button>
      {children}
    </dialog>
  )
}

export default Modal
