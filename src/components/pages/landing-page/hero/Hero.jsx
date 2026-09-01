/* -------------------- Styles -------------------- */
import styles from './Hero.module.css'
/* -------------------- Components -------------------- */
import Button from '../../../core/Button/Button'
import SignupModal from '../../../../pages/signup-modal/SignupModal'
/* -------------------- Context -------------------- */
import { AuthContext } from '../../../../contexts/auth/AuthContext'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'

/* Display Hero section */
const Hero = () => {
  const { activeModal, setActiveModal } = useContext(AuthContext)

  const handleSignup = () => {
    setActiveModal('signup')
  }

  return (
    <>
      <section className={styles.hero}>
        {/* Subtitle */}
        <h2 className={styles.subtitle}>Move minds. Share your stories.</h2>

        <p className={styles.description}>
          Join a community of modern thinkers, writers, and storytellers. Share
          your unique perspective with readers who care, and start building your
          audience today.
        </p>

        <Button
          id="startWritingBtn"
          className="startBtn"
          title="Sign up"
          onClick={handleSignup}>
          Start Writing{' '}
        </Button>
      </section>

      {activeModal === 'signup' && <SignupModal />}
    </>
  )
}

export default Hero
