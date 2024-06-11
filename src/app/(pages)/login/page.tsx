import React from 'react'
import { Metadata } from 'next'


import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'
import { getProducts } from '../../_api/fetchLogin'

import classes from './index.module.scss'
import "../../styles/login.css"

export default async function Login() {
  const data = await getProducts();
  
  
  const loginData = {
    heading: data.heading,
    content: data.content,
  };

  // console.log("login data",loginData);


  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })
  

  

  return (
    <Gutter className={`${classes.login} p-[0!important]`}>
      <RenderParams className={`${classes.params} mt-[0!important]`} />
      <LoginForm values={loginData} />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
