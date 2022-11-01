import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import Song from '../../components/Song'
import Footer from '../../components/Footer'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Hymn() {
  const router = useRouter()
  const { songno } = router.query
  const { data, error } = useSWR(`/api/getSongs?hymnno=${songno}`, fetcher)
  if (songno > 350)
    return (
      <>
        <div className='text-center'>Song not Exitsed</div>
        <Footer hymnno={350} />
      </>
    )
  if (error)
    return (
      <>
        <div className='text-center'>Failed to load. Please try again!</div>
        <Footer hymnno={songno} />
      </>
    )
  if (!data)
    return (
      <>
        <div className='text-center'>Loading...</div>
        <Footer hymnno={songno} />
      </>
    )

  return (
    <>
      <Song data={data} />
      <Footer hymnno={data.hymnno} />
    </>
  )
}
