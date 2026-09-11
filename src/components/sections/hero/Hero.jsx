/* -------------------- Styles -------------------- */
import styles from './Hero.module.css'
/* -------------------- Icons -------------------- */
import writeIcon from '../../../assets/icons/icon-write.svg'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
/* -------------------- Context -------------------- */
import { AuthContext } from '../../../contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button'
import SignupModal from '../../features/signup-modal/SignupModal'

/* Display Hero section */
const Hero = () => {
  const { activeModal, setActiveModal } = useContext(AuthContext)

  // Handler to show signup modal
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

        {/* Sign-up button  */}
        <Button
          id="startWritingBtn"
          className="startBtn"
          title="Sign up"
          onClick={handleSignup}>
          <img src={writeIcon} alt="" width={25} height={25} />
          Start Writing{' '}
        </Button>
      </section>

      {activeModal === 'signup' && <SignupModal />}
    </>
  )
}

export default Hero
