/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Header as HeaderType } from '../../../payload/payload-types';
import { fetchHeader } from '../../_api/fetchGlobals';
import { Gutter } from '../Gutter';
import { HeaderNav } from './Nav';
import { useAuth } from '../../_providers/Auth';

import classes from './index.module.scss';

const Header: React.FC = () => {
  const [header, setHeader] = useState<HeaderType | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const getHeader = async () => {
      try {
        const fetchedHeader = await fetchHeader();
        setHeader(fetchedHeader);
      } catch (error) {
        console.error(error);
      }
    };

    getHeader();
  }, []);

  const imageUrl = header?.image?.url || '/images/rsp-logo.webp';
  const altText = header?.image?.alt || 'rsp_logo';
  const headerUrl = user ? "/" : "#";

  return (
    <header className={classes.header}>
      <Gutter className={classes.wrap}>
        <Link href={headerUrl} className={`${classes.header_logo_wrapper} flex justify-center items-center`}>
          <img className={classes.logo} alt={altText} src={imageUrl} />
        </Link>
        <HeaderNav header={header} />
      </Gutter>
    </header>
  );
};

export default Header;
