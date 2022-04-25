import React from 'react'
import dynamic from 'next/dynamic'

const LayoutPage = dynamic(() => import("../components/LayoutPage"))

import {data} from '../utils/data'

const TextField = dynamic(() => import("@mui/material/TextField"))
import {Box, IconButton, Typography, Paper, CardMedia, Fade} from "@mui/material"

const BackspaceRoundedIcon = dynamic(() => import("@mui/icons-material/BackspaceRounded"))

const Search = () => {

  const [search, setSearch] = React.useState('')
  const HandlerChangeSearch = (e) => setSearch(e.target.value)
  const ClearSearch = () => setSearch('')

  return (
   <>

    <LayoutPage title="Search">
      
    <Fade in={true}>
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        <Box>
        <Box>
            <TextField 
                variant="outlined"
                placeholder="search"
                name="localhostsearch"
                value={search}
                onChange={HandlerChangeSearch}
                InputProps={{
                    endAdornment: <IconButton onClick={ClearSearch}><BackspaceRoundedIcon fontSize="small" /></IconButton>,
                }}
            />
        </Box>
        <Box sx={{ py: 2 }}>
            {
                data.filter( val => {
                    if(search === '') {
                        return
                    }
                    else if(val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                        return val
                    }
                }).map( prop => (
                    <Paper key={prop.id} sx={{ p: 1, mb: 0.2, display: 'flex', alignItems: 'center'}}>
                        <CardMedia
                            component="img"
                            sx={{ width: 50, height: 50, mr: 5 }}
                            image={prop.image}
                            alt={prop.name}
                        />
                        <Typography variant="h6">{prop.name}</Typography>
                    </Paper>
                ))
            }
        </Box>
        </Box>

    </Box>
    </Fade>

    </LayoutPage>
   </>
  )
}

export default Search

