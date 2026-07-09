import styles from './Hero.module.css'

/* Display Hero section */
const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.contentWrapper}>
        {/* Subtitle */}
        <h2 className={styles.subtitle}>Move minds. Share your stories.</h2>

        <p className={styles.description}>
          Join a community of modern thinkers, writers, and storytellers. Share
          your unique perspective with readers who care, and start building your
          audience today.
        </p>
      </div>
    </section>
  )
}

export default Hero
