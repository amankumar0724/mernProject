import React from 'react'
import HeroSection from './HeroSection.jsx'
import Category from './Category.jsx';
import { Grid } from '@mui/material';

function Home() {
  return (
    <>
        <HeroSection/>
        <Grid container>
            <Grid item lg={2} xs={12} sm={2}>
                <Category />
            </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                Posts
            </Grid>
        </Grid>
    </>
  )
}

export default Home; 