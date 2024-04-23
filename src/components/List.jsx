import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './List.css'
import { Card,CardBody,
      Stack,
   Button,
   Text,
   Box,
   Input,
   StackDivider,
   CardFooter,
  
   } from '@chakra-ui/react'


   const ListRepo = () => {

    const [data, setData] = useState({});
  
    const [repositories, setRepositories] = useState([]);
    
// 

    //
    const submitHandler = async (e) => {
      e.preventDefault();
//
const profile = await fetch('https://api.github.com/users/ABIGAIL-design');
const profiletoJson = await profile.json();
// console.log(profiletoJson)

const repositories = await fetch(profiletoJson.repos_url);
const repoJson    = await repositories.json();
// console.log(repoJson);
if(profiletoJson){
  setData(profiletoJson);
  setRepositories(repoJson)
}
    }
// set pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex   = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = repositories.slice(firstIndex, lastIndex);
    const npages = Math.ceil(repositories.length / recordsPerPage);
    const numbers = [...Array(npages + 1).keys()].slice(1);
    // console.log(numbers);
    //set search state.
    const [search, setSearch] = useState('');
    console.log(search);

  return (
  
        <div className='profile'>
        <Stack direction='row' spacing={4} pb='2'>
  
        <Button type='submit' onClick={submitHandler} variant='solid' colorScheme='blackAlpha' size='sm'>List repositories</Button>
        </Stack>
        <div className="container">
      
        
  <Card
  className="card"
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  
>

  <Stack Stack divider={<StackDivider />} spacing='1' >
    <CardBody>
  
  <Stack divider={<StackDivider />} spacing='4'>
        <Box>

        </Box>

      <Box>
      <Text pt='3' fontSize='sm' color='white'>
        Name: {data.name}
        </Text>
  
      </Box>
      <Box pt='0'>
    
        <Text pt='0' fontSize='sm' color='white'>
        Website: {data.blog}
        </Text>
      </Box>
      <Box>
       
        <Text pt='0' fontSize='sm' color='white'>
        Bio: {data.bio}
        </Text>
      </Box>
       <Box>
       
       <Button variant='solid' colorScheme='blackAlpha' size='sm'><a href={data.html_url} target="_black">View profile</a></Button>
      </Box>
      
    </Stack>

    </CardBody>

  </Stack>
  <CardFooter>
    
  </CardFooter>
</Card>
{/* colum 2 to list repos */}
<div className='col-2'>
<Stack direction='row' spacing={4} pb='2'>
        <Input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search repository' size='sm' htmlSize={18} width='auto' />
        </Stack>          
  <Card
  maxW='sm'
  className="card"
  >

  <CardBody>
  
    {records.filter((item) => {
      return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
    }).map((repo,i) => (
      <Stack divider={<StackDivider />} spacing='' key={i}>
        <Box>
        <Text pt='2' fontSize='sm' color='white'>
          <Link to={`/repo/${i}`}>{repo.name}</Link>
        </Text>
      </Box>
      </Stack>      
    
      
    ))}
    
    <div className="center">
   <div className="pagination">
   <a href="#" onClick={prepage}>&laquo;</a>
   
   
    {numbers.map((n, i) => (
     
      <span className={`link ${currentPage === n ? 'active' : '' }`} key={i}>
      <a href="#" onClick={()=> changeCPage(n)} >{n}</a>      
      </span>
   
    ))}
  
   <a href="#" onClick={nextPage}>&raquo;</a>

   </div>
   </div>
  </CardBody>


</Card>
                               
       </div>
      </div>
      </div>    
  );

  function prepage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }

  }

  function changeCPage(id){
    setCurrentPage(id)

  }
  function nextPage(){
    if(currentPage != npages){
      setCurrentPage(currentPage + 1)
    }

  }
  

};



export default ListRepo;