import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight } from 'react-feather'

export default function Footer({ hymnno }) {
  const router = useRouter()
  const search = useRef('')
  function searchSong() {
    const s = search.current.value
    router.push(`/hymns/${s}`)
  }
  function nextSong() {
    if (hymnno >= 350) router.push('/hymns/1')
    else router.push(`/hymns/${hymnno + 1}`)
  }
  function previousSong() {
    if (hymnno <= 1) router.push('/hymns/350')
    else router.push(`/hymns/${hymnno - 1}`)
  }
  return (
    <div className='bottom-0 fixed p-1  bg-slate-300 w-full gap-4 flex justify-between items-center sm:justify-evenly'>
      <ChevronLeft size={40} onClick={previousSong} />
      <div className='form-control '>
        <div className='input-group'>
          <input
            type='text'
            placeholder='Search…'
            className='input input-bordered'
            ref={search}
          />
          <button className='btn btn-square' onClick={searchSong}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
      </div>
      <ChevronRight size={40} onClick={nextSong} />
    </div>
  )
}
