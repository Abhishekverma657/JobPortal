 import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
  const cotegory=[
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
   
    "Cloud Engineer",
  ]
 const CategoryCrousal = () => {
   const dispatch=useDispatch()
   const navigate=useNavigate()
  const searchJobHandler=(query)=>{
    dispatch(setSearchedQuery(query));
    navigate('/browse')


   }
   return (
     <div>
        <Carousel className='w-full max-w-xl mx-auto my-20'>

            <CarouselContent>
                {
                    cotegory.map((category, index) => (
                        <CarouselItem  className=' md:basis-1/2 lg:basis-1/3'   >
                            <button  onClick={()=>searchJobHandler(category)}
                             className='border shadow-sm  p-2  rounded-full'>
                                {category}

                            </button>

                        </CarouselItem>
                        

                    ))
                        
                }
                
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>

     </div>
   )
 }
 
 export default CategoryCrousal