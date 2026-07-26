import bannerLogo from '/src/assets/bannerIcon/bannerLogo.png'
import styles from './Banner.module.scss'

export const Banner = () => {
  return <img className={styles.bannerImg} src={bannerLogo} alt='Упс...Картинка не загрузилась...' />
}
