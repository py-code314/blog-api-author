import styles from './Button.module.css'

const Button = ({ type = 'button', children, onClick, ...rest }) => {
  const { id, className, title } = rest
  return (
    <button
      id={id}
      className={styles[className]}
      type={type}
      aria-label={title}
      title={title}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
