'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'


import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'
import '../../../styles/login.css'

type FormData = {
  email: string
  password: string
}

type LoginFormProps = {
  values: {
    heading: string;
    content: string;
  };
};

const LoginForm: React.FC<LoginFormProps> = (data) => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login, user } = useAuth() // Assuming `useAuth` provides `user` to check authentication status
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true)
      try {
        await login(data)
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
        setIsLoading(false)
      }
    },
    [login],
  )

  // Render nothing if user is already logged in
  if (user) {
    return null
  }



  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800">
      <div className="relative sm:flex sm:flex-row justify-center bg-transparent rounded-3xl sm:p-4 md:p-6 lg:p-10 p-2">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10 text-gray-300 p-6 lg:p-10">
          <div className="self-start hidden lg:flex flex-col">


            <div className="self-start hidden lg:flex flex-col">
              <h1 className="my-3 font-semibold text-4xl">{data.values.heading}</h1>
              <p className="pr-3 text-sm opacity-75">{data.values.content}</p>
            </div>


          </div>
        </div>
        <div className="flex justify-center self-center z-10 sm:p-4 md:p-6 lg:p-10 p-2">
          <form onSubmit={handleSubmit(onSubmit)} className={`${classes.rsp_login_form} p-12 bg-white mx-auto rounded-3xl w-96 shadow-xl`}>
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
            </div>
            <Message error={error} className={classes.message} />
            <div className="space-y-6">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className={`text-red-500 pt-2 ${classes.errorMessage}`}>{errors.email.message}</p>}
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className={`text-red-500 pt-2 ${classes.errorMessage}`}>{errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <Link href={`/recover-password${allParams}`} className="text-purple-700 hover:text-purple-600">Recover your password</Link>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  appearance="primary"
                  label={isLoading ? 'Processing' : 'Login'}
                  disabled={isLoading}
                  className="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full h-32 md:h-48 lg:h-64 xl:h-80" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#fff" fillOpacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L0,320Z"></path>
      </svg>
    </div>
  )
}

export default LoginForm
