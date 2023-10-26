import styles from '@assets/css/LoadingSpinner.module.css' // Create a CSS module for styling

const LoadingSpinner = () => {
  return (
    <div className={`${styles.loadingContainer}`}>
      <div className={styles.loadingSpinner}></div>
    </div>
  )
}

export default LoadingSpinner
