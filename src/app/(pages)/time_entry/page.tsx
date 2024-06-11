"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loading from '../../_components/Loading';

export default function TimeEntryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>Time Entry components</h1>
          <Link href='/expense'>Go to the link</Link>
        </>
      )}
    </div>
  );
}

