import styles from './Hero.module.css'

/* Display Hero section */
const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Subtitle */}
      <h2 className={styles.subtitle}>Move minds. Share your stories.</h2>

      <p className={styles.description}>
        Join a community of modern thinkers, writers, and storytellers. Share
        your unique perspective with readers who care, and start building your
        audience today.
      </p>

      <button className={styles.signUpBtn}>Start Writing</button>
    </section>
  )
}

export default Hero
