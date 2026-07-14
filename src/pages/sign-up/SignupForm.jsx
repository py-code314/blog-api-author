import styles from './SignupForm.module.css'

const SignupForm = () => {
  return (
    <div className={styles.signUp}>
      {/* Subtitle */}
      {/* <h2 className="">Sign Up</h2> */}

      {/* Sign-up form */}
      <form
        className={styles.form}
        noValidate
        // onSubmit={handleFormValidation}
      >
        {/* Email input */}
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>
            Email (required)
          </label>
          <p className={styles.formHint} id="email-hint">
            Eg. hello.taylor@example.com
          </p>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="ericcartman@gmail.com"
            className={styles.formInput}
            autoComplete="email"
            inputMode="email"
            required
          />
        </div>

        {/* Password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="password">
            Password (required)
          </label>
          <p className={styles.passwordReq}>
            Requires at least 8 characters, one uppercase letter (A - Z), one
            number (0 - 9), and one special character (!@#$%^&amp;*)
          </p>
          <input
            className={styles.formInput}
            id="password"
            name="password"
            type="password"
            min={8}
            placeholder="South^Park97"
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
            required
          />
        </div>

        {/* Confirm password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="confirmPassword">
            Confirm Password (required)
          </label>
          <input
            className={styles.formInput}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            min={8}
            placeholder="South^Park97"
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
            required
          />
        </div>

        {/* Name input */}
        <div className={styles.formControl}>
          <label htmlFor="name" className={styles.formLabel}>
            Name (optional)
          </label>

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Eric Cartman"
            className={styles.formInput}
            autoComplete="name"
          />
        </div>

        {/* Sign up button */}
        <button className={styles.btn} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupForm
