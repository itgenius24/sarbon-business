import styles from './page.module.scss'

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return response.json()
}

export default async function About() {
  const posts = await getData()
  return (
    <main className={styles.main}>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </main>
  )
}
