import React from 'react'
import Image from 'next/image'

function Card() {
    return (
        <div className='bg-[#FEFDF9] font-manrope relative  text-black shadow-dark-600 overflow-hidden shadow-md card-transition rounded-xl w-[240px] h-72  left-1/2 -translate-x-1/2 -top-8'>
            <Image src="/peacock.png" width={100} height={100} className='h-64 opacity-30 absolute -right-3 z-0 top-4 w-auto' alt='user' />
            <Image src="/pattern.png" width={100} height={100} className='h-32 absolute opacity-30 -left-6 -z-10 top-6 w-auto' alt='user' />

            <div className='p-4 gap-4 z-10 items-start justify-start flex flex-col '>
                <Image src="/aadhar-logo.png" width={100} height={100} className='h-6 z-10 w-auto' alt='user' />
                <div className='flex flex-col gap-2'>
                    <Image src="/bg.png" width={100} height={100} className='rounded-full overflow-hidden w-12 h-12' alt='user' />
                    <span className='w-full font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#5D5139] to-[#9f6d21]'>Prashant Prabhakar</span>
                </div>

                <div className='flex flex-col text-xs gap-1'>
                    <div className='text-[#5D5139] space-x-3'>
                        <span> DOB : 2004-02-12</span>
                        <span> Gender : MALE</span>
                    </div>
                    <div className='text-[#5D5139]'>
                        S/O John Doe
                        Village Greenfield
                        Riverside-Oakwood Road
                        Springfield, Stateville 000000
                    </div>
                </div>
                <div className='w-full h-4 bottom-10 left-0 absolute'>
                    <Image src="/hologram.png" width={1000} height={1000} alt="hologram" className=' object-cover w-full h-full' />
                </div>

                <div className='font-bold text-lg  text-[#171510] mt-3 flex items-center justify-center w-full'>
                    739482156203
                </div>
            </div>

        </div>
    )
}

export default Card