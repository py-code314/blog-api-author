/* -------------------- Styles -------------------- */
import styles from './Button.module.css'


const Button = ({ type = 'button', children, onClick, ...rest }) => {
  const { id, className, title, disabled } = rest

  return (
    <button
      id={id}
      className={styles[className]}
      type={type}
      aria-label={title}
      title={title}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
