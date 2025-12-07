import React from 'react'
import Card from './card'
import Image from 'next/image'


function AadharCard() {
  return (
    <div className='w-64 h-96 font-manrope relative'>
      <div className='w-64 h-96 relative rounded-3xl border  border-neutral-200 bg-orange-100'>
        <Card />
        <div className='absolute bg-orange-50 bottom-0 px-2 pb-2 left-0 w-64 h-80 mask-top rounded-b-3xl rounded-t-lg'>
          <div className='z-10 flex flex-col pt-4 pb-2 gap-2 w-full border-b border-x border-dashed rounded-b-2xl rounded-t-0 bg-gradient-to-b to-orange-100 via-white from-white border-amber-900/15 h-full items-center justify-between' >
            <div className='h-52 flex flex-col gap-2 bg-transparent w-48 z-10'>
              <Image width={100} height={100} src="/qr.png" alt='' className='w-full h-full border border-neutral-200 bg-white p-1' />
            </div>
            <div className='text-center w-full font-mono text-[10px] text-amber-800'>
              Tap to reveal your aadhar card
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AadharCard
