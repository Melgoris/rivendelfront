import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Box, Heading, ChakraProvider} from '@chakra-ui/react'

import services from './services.module.css'

import NotFound from './notFound/NotFound'
import CharsList from './charsList/CharsList'
import Table from '../table/Table'
import theme from '../table/theme'
import Registratios from '../registration/Registratios'
import Profile from '../profile/Profile'

const Services = () => {
  return (
    <div id='process' className={services.services_services}>
      <Profile />
      <Routes>
        {/* <Route path='/' element={<AltCard />} /> */}
        <Route path='/cards' element={<CharsList />} />

        <Route
          path='/table'
          element={
            <ChakraProvider theme={theme}>
              <Box maxW={800} mx='auto' px={6} pt={24} fontSize='small'>
                <Heading mb={10}>Таблица</Heading>
                <Table />
              </Box>
            </ChakraProvider>
          }
        />

        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default Services
