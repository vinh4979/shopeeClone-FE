/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Rule = {
  [key in 'email' | 'password' | 'comfirm_password']?: RegisterOptions
}

export const getRule = (getValue?: UseFormGetValues<any>): Rule => ({
  email: {
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
  },
  password: {
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
  },
  comfirm_password: {
    required: {
      value: true,
      message: 'Comfirm password is requried'
    },
    validate:
      typeof getValue === 'function'
        ? (value) => {
            if (value === getValue('password')) {
              return true
            }
            return 'Comfirm password is invalid'
          }
        : undefined
  }
})
