'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
  
      if (response.ok) {
        setSuccess(true)
        setError('')
      } else {
        setError(
          'There was a problem while attempting to send you a password reset email. Please try again.',
        )
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <div className='flex justify-center pt-10'>
            <div className={classes.formWrapper}>
              <h1 className='font-semibold text-2xl text-gray-800'>Recover Password</h1>
              <p className='pt-5 pb-4'>
                {`Please enter your email below. You will receive an email message with instructions on
                how to reset your password. To manage your all users, `}
                <Link href="/admin/collections/users">login to the admin dashboard</Link>
                {'.'}
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Message error={error} className={classes.message} />
                <Input
                  name="email"
                  label="Email Address"
                  required
                  register={register}
                  error={errors.email}
                  type="email"
                  placeholder="Email"
                />
                <div className='pt-5 float-end'>
                  <Link href={`/login${allParams}`} className='text-purple-700 hover:text-purple-600'>Back to Login Page</Link>
                </div>
                <div className='pt-2'>
                  <Button
                    type="submit"
                    appearance="primary"
                    label={isLoading ? 'Processing' : 'Recover Password'}
                    disabled={isLoading}
                    className={classes.submit}
                  />
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <div className='flex justify-center pt-10'>
            <div>
              <h1 className='text-lg pb-4 font-medium'>Request submitted</h1>
              <p>Check your email for a link that will allow you to securely reset your password.</p>
              <div className='pt-3'>
                <Link href={`/login${allParams}`} className='text-purple-700 hover:text-purple-600'>Back to Login Page</Link>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Fragment>
  )
}
