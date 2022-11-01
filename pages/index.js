import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/hymns/1')
  }, [router])
  return (
    <div className=''>
      <Footer hymnno={1} />
    </div>
  )
}
