import Image from 'next/image'
import styles from './styles.module.scss'
import Header from '@/components/header'
import Cards from '@/components/cards'

export default function Main() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </div>
      <Cards />
    </main>
  )
}
