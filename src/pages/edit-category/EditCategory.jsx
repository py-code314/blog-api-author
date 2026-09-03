/* -------------------- Styles -------------------- */
import styles from './EditCategory.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData.js'
// import { useParams } from 'react-router'
/* -------------------- Components -------------------- */
// import { Link } from 'react-router'
// import EditCategoryForm from '../../components/forms/edit-category/EditCategoryForm.jsx'
/* -------------------- Images -------------------- */
// import errorIcon2 from '../../assets/icons/icon-error-2.svg'
/* -------------------- Context -------------------- */
// import { CategoryContext } from '../../contexts/category/CategoryContext.jsx'

const EditCategory = ({categoryId}) => {
  // const { id } = useParams()

  // Get a single category
  const {
    data: currentCategory,
    isLoading,
    error,
  } = useData(`http://localhost:8080/api/v1/categories/${categoryId}`)
    console.log("🚀 ~ EditCategory ~ currentCategory:", currentCategory)

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.editCategory}>
        <title>Scriblr | Edit Category</title>

        <div className={styles.loaderWrapper}>
          <div className={styles.loader}>Loading...</div>
        </div>
      </div>
    )

  // Show error message upon failure to fetch the data
  // if (error)
  //   return (
  //     <div className={styles.editCategory}>
  //       <title>Scriblr | Edit Category</title>

  //       <Link className={styles.categoryLink} to={`/categories/${id}`}>
  //         Back to Category
  //       </Link>

  //       <h2 className={styles.subTitle}>Edit Category</h2>
  //       <div className={styles.errorWrapper}>
  //         <div className={styles.errorImage}>
  //           <img src={errorIcon2} alt="" width={60} height={60} />
  //         </div>

  //         <div className={styles.errorContent}>
  //           <p>Error retrieving category. Please try again.</p>
  //         </div>
  //       </div>
  //     </div>
  //   )

  return (
    <>
      <div className={styles.editCategory}>
        <title>Scriblr | Edit Category</title>
        {/* Keep h2 outside the form for Accessibility */}
        <div className={styles.header}>
          <h2 className={styles.subTitle}>Edit Category</h2>
          {/* <Link className={styles.cancelLink} to={`/categories/${id}`}>
            Cancel Edit
          </Link> */}
        </div>

        {/* <CategoryContext
          value={{
            currentCategory,
          }}>
          <EditCategoryForm />
        </CategoryContext> */}
      </div>
    </>
  )
}

// const EditCategory = () => {
//   const { id } = useParams()

//   // Get a single category
//   const {
//     data: currentCategory,
//     isLoading,
//     error,
//   } = useData(`http://localhost:8080/api/v1/categories/${id}`)

//   // Show loading spinner while fetching the data
//   if (isLoading)
//     return (
//       <div className={styles.editCategory}>
//         <title>Scriblr | Edit Category</title>

//         <div className={styles.loaderWrapper}>
//           <div className={styles.loader}>Loading...</div>
//         </div>
//       </div>
//     )

//   // Show error message upon failure to fetch the data
//   if (error)
//     return (
//       <div className={styles.editCategory}>
//         <title>Scriblr | Edit Category</title>

//         <Link className={styles.categoryLink} to={`/categories/${id}`}>
//           Back to Category
//         </Link>

//         <h2 className={styles.subTitle}>Edit Category</h2>
//         <div className={styles.errorWrapper}>
//           <div className={styles.errorImage}>
//             <img src={errorIcon2} alt="" width={60} height={60} />
//           </div>

//           <div className={styles.errorContent}>
//             <p>Error retrieving category. Please try again.</p>
//           </div>
//         </div>
//       </div>
//     )

//   return (
//     <>
//       <div className={styles.editCategory}>
//         <title>Scriblr | Edit Category</title>
//         {/* Keep h2 outside the form for Accessibility */}
//         <div className={styles.header}>
//           <h2 className={styles.subTitle}>Edit Category</h2>
//           <Link className={styles.cancelLink} to={`/categories/${id}`}>
//             Cancel Edit
//           </Link>
//         </div>

//         {/* <CategoryContext
//           value={{
//             currentCategory,
//           }}>
//           <EditCategoryForm />
//         </CategoryContext> */}
//       </div>
//     </>
//   )
// }

export default EditCategory
