import styles from './Button.module.css'

const Button = ({type = "button", children}) => {
  return (
    <button
      className={styles.btnSignup}
      type={type}
      aria-label="Sign up"
      title="Sign up"
    >
      {children}
    </button>
  )
}
 
export default Button;