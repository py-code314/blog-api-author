/* -------------------- Styles -------------------- */
import styles from './ErrorMessage.module.css'
/* -------------------- Images -------------------- */
import errorIcon from '../../../assets/icons/icon-error-2.svg'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
import Button from '../../core/Button/Button'
/* -------------------- Context -------------------- */
import { ErrorContext } from '../../../contexts/error/ErrorContext'

/* Component to display error message when deleting a post or category
or tag fails */
const ErrorMessage = () => {
  const { deleteError, handleDismiss } = useContext(ErrorContext)
  const { code, title, msg } = deleteError
  
  return (
    <>
      <div className={styles.errorWrapper}>
        <div className={styles.header}>
          <img src={errorIcon} alt="" width={40} height={40} />
          <div className={styles.titleWrapper}>
            <p>{code}</p>
            <p>{title}</p>
          </div>
        </div>

        <div className={styles.errorContent}>
          <p>{msg}</p>
        </div>

        {/* Dismiss button */}
        <Button
          className="dismissBtn"
          title="Dismiss message"
          onClick={handleDismiss}>
          Dismiss
        </Button>
      </div>
    </>
  )
}

export default ErrorMessage
