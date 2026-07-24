import styles from './Banner.module.scss'

export const Banner = () => {
  return (
    <img
      className={styles.bannerImg}
      src='/src/assets/bannerIcon/bannerLogo.png'
      alt='Упс...Картинка не загрузилась...'
    />
  )
}
