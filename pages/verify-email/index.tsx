import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { verifyEmail } from '../../api/auth'

const VerifyEmail = () => {
  const router = useRouter()
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  
  useEffect(() => {
    const verify = async () => {
      const data = {
        code: router.query?.code,
        email: router.query?.email,
      }

      const verifyResult = await verifyEmail(data)

      if (!verifyResult?.data?.error && verifyResult?.data?.data) {
        setStatus('success')
        setMessage(`Your email ${router.query?.email} was verified successfully! Please login with your email`)
      } else {
        setStatus('failed')
        setMessage(verifyResult?.data?.error || 'Unexpected error occurred')
      }
    }

    if (router.query?.code && router.query?.email) {
      verify()
    }
  }, [router])

  return (
    <section className='flex flex-row justify-center mt-[140px]'>
      {message && <div className='w-1/2 pb-[calc(100vh-440px)]'>
        <h4 className={`text-center font-poppins-600 text-3xl ${status === 'success'? 'text-green-500' : 'text-black'} leading-10`}>
          {message}
        </h4>        
      </div>}
    </section>
  )
}

export default VerifyEmail
