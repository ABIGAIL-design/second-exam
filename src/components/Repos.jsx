import React from 'react'
import './Repos.css'
import ListRepo from './List'
import { ChakraProvider } from '@chakra-ui/react'

const Repo = () => {
    return (
        <div className='repos'>
            <div className='content'>
          <ChakraProvider>
          <ListRepo />
        </ChakraProvider>
            </div>
        </div>
    )
}

export default Repo
