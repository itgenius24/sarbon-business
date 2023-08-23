import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href='/about'>About</Link>
      <div>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          By{' '}
          <Image
            src='/vercel.svg'
            alt='Vercel Logo'
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
    </header>
  )
}
