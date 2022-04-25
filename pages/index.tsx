import React from 'react'
import dynamic from 'next/dynamic'

const LayoutPage = dynamic(() => import("../components/LayoutPage"))
const CatalogCard = dynamic(() => import("../components/catalog/card"))
const Loading = dynamic(() => import("../components/Loading"))

import {Box, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Fade} from '@mui/material'

import InfiniteScroll from 'react-infinite-scroll-component'

import {data} from '../utils/data'
import { useRouter } from 'next/router'


const Home = ({products}) => {

  const router = useRouter()

  const plus = 25
  const [arr, setArr] = React.useState([])
  const [sliceNum, setSliceNum] = React.useState({first: 0, last: 25})
  const [more, setMore] = React.useState(true)

  async function GetSlice() {
    await setSliceNum(state => ({first:state.first + plus, last: state.last + plus}))
  }
  async function GetData() {
    await setArr([...arr, ...products.slice(sliceNum.first, sliceNum.last)])

    if(sliceNum.last >= products.length) {
      setMore(false)
    }
  } 
  async function GetDataFromEffect() {
    await setArr(products)

    if(sliceNum.last >= products.length) {
      setMore(false)
    }
  } 


  React.useEffect(() => {
    GetSlice()
    GetDataFromEffect()
  }, [router.query])

  const fetchData = async () => {
    await GetSlice()
    await GetData()
  }

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterSearch((e.target as HTMLInputElement).value)
  }

  const filterSearch = (category) => {
    const path = router.pathname
    
    if(category != ''){
      router.query.category = category
    }
    else {
      router.query = category
    }

    router.push({ pathname: path, query: router.query })
  }

  return (
   <>

    <LayoutPage title="Home">
      <Fade in={true}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Paper sx={{ p: 3, }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={router.query.category || ''}
                  onChange={handleChangeCategory}
                >
                  <FormControlLabel value="" control={<Radio />} label="All" />
                  <FormControlLabel value="c1" control={<Radio />} label="C1" />
                  <FormControlLabel value="c2" control={<Radio />} label="C2" />
                  <FormControlLabel value="c3" control={<Radio />} label="C3" />
                  <FormControlLabel value="c4" control={<Radio />} label="C4" />
                </RadioGroup>
              </FormControl>
            </Paper>

            <Box sx={{ width: '100%', pl: 1 }}>
            <InfiniteScroll
              dataLength={arr.length}
              next={fetchData}
              hasMore={more}
              loader={<Loading />}
            >

              <Grid spacing={1} container> 
                {
                  arr.map(data => (
                    <Grid item xs={2} key={data.id}>
                      <CatalogCard data={data} />
                    </Grid>
                  ))
                }
                </Grid>
            </InfiniteScroll>
            </Box>
        </Box>
      </Fade>
    </LayoutPage>
   </>
  )
}

export default Home

export async function getServerSideProps({query}) {

  const result = data.filter(prop => prop.tag === query.category)

  if(result.length > 0) {
    return {
      props: {
        products: result
      }
    }
  }

  return {
    props: {
      products: data
    }
  }



}
