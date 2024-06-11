import React from 'react';
// import Head from 'next/head';
import MyCalendar from '../../_components/MyCalendar';
import './index.css'

const CalendarPage: React.FC = () => {
  return (
    <div>
      {/* <Head>
        <title>Calendar Page</title>
        <meta name="description" content="Calendar Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main>
        <MyCalendar />
      </main>
    </div>
  );
}

export default CalendarPage;
