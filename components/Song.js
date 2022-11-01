import React from 'react'

export default function Song({ data }) {
  const { title, author, stanzas, hymnno } = data
  return (
    <center>
      <div className='mx-auto p-4 pb-20'>
        <main>
          <h1 className='text-lg font-extrabold'>{title}</h1>
          <h1 className='text-md font-bold'>{author}</h1>
          <div className='sm:w-80 mx-auto'>
            {stanzas.map((stanza, i) => {
              return (
                <p key={i} className='m-4 text-left text-md'>
                  {stanza}
                </p>
              )
            })}
          </div>
        </main>
      </div>
    </center>
  )
}
