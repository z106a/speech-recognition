import type { NextPage } from 'next';
import React from 'react';
import MainRoot from './main';

if (process.browser) {
}

const Home: NextPage = () => {
  return <MainRoot />;
};

export default Home;
