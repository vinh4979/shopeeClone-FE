import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { loginAccount } from '~/apis/auth.api'
import { ResponseApi } from '~/Types/util.type'
import { isUnprocessableEntityError } from '~/utils/utils'

// define TS data
interface FormData {
  email: string
  password: string
}

export default function Login() {
  const [hidden, setHidden] = useState(true)

  const isHidden = () => {
    setHidden(!hidden)
    console.log('hidden', hidden)
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>()

  // handle log

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = data
    loginAccountMutation.mutate(body, {
      onSuccess(data) {
        console.log('login data:', data)
      },
      onError(error) {
        console.log(error)

        if (isUnprocessableEntityError<ResponseApi<Omit<FormData, 'comfirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
        }
        if (isUnprocessableEntityError<ResponseApi<Omit<FormData, 'comfirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='container grid grid-cols-4 mt-10 mx-auto'>
      <div className='col-start-2 col-span-2 border-solid border-2 rounded-xl border-gray-300 h-auto py-10'>
        <svg className='mx-auto ' height={60} fill='red' viewBox='-3 -3 82 82' width={60} style={{ display: 'block' }}>
          <title>Pinterest logo</title>
          <circle cx={38} cy={38} fill='white' r={40} />
          <path
            d='M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8 3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8 3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0 11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2 1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z'
            fill='var(--color-red-pushpin-450)'
            fillRule='evenodd'
          />
        </svg>
        <h1 className='text-2xl font-bold text-center my-4'>Welcome to my app</h1>
        <form className='px-10' onSubmit={onSubmit}>
          <div className='flex flex-col '>
            <label htmlFor=''>Your Email</label>
            <div className='box-border mt-2'>
              <input
                type='enail'
                id='email'
                placeholder='Email'
                className='border-solid border-2 p-2 w-full rounded-xl mt-2 '
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is requried'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    message: 'Email invalidate'
                  },
                  maxLength: {
                    value: 150,
                    message: '5 - 160 characters'
                  },
                  minLength: {
                    value: 5,
                    message: '5 - 160 characters'
                  }
                })}
              />
            </div>
            <div className='min-h-4 text-rose-500 text-xs mt-1'>{errors.email?.message}</div>
          </div>
          <div className='flex flex-col mt-1 relative'>
            <label htmlFor=''>Your Password</label>
            <div className='relative box-border mt-2'>
              <input
                type={hidden ? 'password' : 'text'}
                placeholder='Password'
                className='border-solid border-2 w-full  rounded-xl p-2  '
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is requried'
                  },
                  maxLength: {
                    value: 160,
                    message: 'Characters length 5 - 160'
                  },
                  minLength: {
                    value: 5,
                    message: 'Characters length 5 - 160'
                  }
                })}
              />
              <div onClick={isHidden} className='absolute right-0 top-0 translate-y-1/2 -translate-x-2/4'>
                {hidden ? (
                  <svg
                    className=' text-gray-500 '
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width={20}
                    height={20}
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeWidth={2}
                      d='M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z'
                    />
                    <path stroke='currentColor' strokeWidth={2} d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                  </svg>
                ) : (
                  <svg
                    className=' text-gray-500 '
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width={20}
                    height={20}
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className='min-h-4 text-rose-500 text-xs mt-1'>{errors.password?.message}</div>
          </div>
          <button className='bg-red-600 text-white py-3 w-full mt-5 rounded-xl hover:bg-red-700' type='submit'>
            Login
          </button>
          <div className='flex flex-row-reverse text-sm text-gray-400 mt-2'>
            <Link to={'/register'} className=''>
              Create an account.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
