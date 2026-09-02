/* -------------------- Styles -------------------- */
import styles from './Categories.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../components/core/Button/Button'
/* -------------------- Icons -------------------- */
import errorIcon from '../../assets/icons/icon-error-2.svg'

const Categories = () => {
  // Get all categories
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/categories/all',
  )
  // console.log('🚀 ~ Categories ~ data:', data)

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.categories}>
        <title>Scriblr | Categories</title>
        <h2 className={styles.subTitle}>Categories</h2>

        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={70} height={70} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving categories. Please try again later.</p>
          </div>
        </div>
        <Link className={styles.homeLink} to={'/'}>
          <span className={styles.backIcon}>←</span>Back to Home
        </Link>
      </div>
    )

  const handleDeleteCategory = () => {}

  return (
    <>
      <div className={styles.categories}>
        <title>Scriblr | Categories</title>
        <h2 className={styles.subTitle}>Categories</h2>

        <Link className={styles.addLink} to={'/new-category'}>
          <span className={styles.plusIcon}>+</span> Add Category
        </Link>

        <ul className={styles.categoryList}>
          {data.categories.length > 0 &&
            data.categories.map((category) => (
              <li className={styles.category} key={category.id}>
                <p className={styles.name}>{category.name}</p>
                <div className={styles.actionGroup}>
                  {/* Edit link */}
                  <Link
                    className={styles.editLink}
                    to={`/categories/${category.id}/edit`}>
                    Edit
                  </Link>
                  {/* Delete button */}
                  <Button
                    className="deleteBtn"
                    title="Delete category"
                    onClick={() => handleDeleteCategory(category.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Categories
