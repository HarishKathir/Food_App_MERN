import React,{useState} from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Categories from '../components/Categories'
import ProductDisplay from '../components/ProductDisplay'
import FindUs from '../components/FindUs'
import Chefs from '../components/Chefs'

const Home = () => {

  const [category,setCategory] = useState('All');

  return (
    <div>
      <Hero />
      <Steps />
      <Categories category={category} setCategory={setCategory}/>
      <ProductDisplay category={category} />
      <FindUs />
      <Chefs />
    </div>
  )
}

export default Home
