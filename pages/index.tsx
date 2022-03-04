import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const LayoutPage = dynamic(() => import("../components/LayoutPage"))
const CatalogCard = dynamic(() => import("../components/catalog/card"))

import {Grid,Grow} from '@mui/material'

import {products} from '../utils/data'

const Home: NextPage = () => {
  return (
   <>
    <LayoutPage title="Home">

      <Grow in={true}>
        <Grid spacing={1} container>  
          {
            products.map( data => (
            <Grid item xs={2} key={data.id}>
              <CatalogCard data={data} />
            </Grid>
            ))
          }
        </Grid>
      </Grow>

    </LayoutPage>
   </>
  )
}

export default Home
