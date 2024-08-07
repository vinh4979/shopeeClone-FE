import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { registerAccount } from '~/apis/auth.api'
import Input from '~/Components/Input'
import { ResponseApi } from '~/Types/util.type'
import { getRule } from '~/utils/rules'
import { isUnprocessableEntityError } from '~/utils/utils'

interface FormData {
  email: string
  password: string
  comfirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rule = getRule(getValues)

  const registerAccountMutation = useMutation({
    mutationFn: async (body: Omit<FormData, 'comfirm_password'>) => {
      return await registerAccount(body)
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['comfirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError(error) {
        // console.log('error', error)
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
      <form
        className='col-start-2 col-span-2 border-solid border-2 rounded-xl border-gray-300 h-auto p-10'
        onSubmit={onSubmit}
      >
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
        <Input
          label='Your email'
          type='text'
          placeholder=''
          name='email'
          register={register}
          rule={rule.email}
          errorMessage={errors.email?.message}
        />

        <Input
          label='Your password'
          type='password'
          placeholder=''
          name='password'
          register={register}
          rule={rule.password}
          errorMessage={errors.password?.message}
        />

        <Input
          label='Repeat password'
          type='password'
          placeholder=''
          name='comfirm_password'
          register={register}
          rule={rule.comfirm_password}
          errorMessage={errors.comfirm_password?.message}
        />

        <button type='submit' className='bg-red-600 text-white py-3 w-full mt-5 rounded-xl hover:bg-red-700'>
          Submit
        </button>
        <div className='flex flex-row-reverse text-sm text-gray-400 mt-2'>
          <Link to={'/login'} className=''>
            I have an account.
          </Link>
        </div>
      </form>
    </div>
  )
}
