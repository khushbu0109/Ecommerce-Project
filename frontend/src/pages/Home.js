import React from 'react'
import { Banner } from '../component/Banner'
import {Header} from '../component/Header'
import {Homee} from '../component/Home'
import {Main} from '../component/Main'
import { Footer } from '../component/Footer'
import { CatBan } from '../component/Category/CatBan'
export const Home = () => {
  return (
    <>
    <Header/>
    <Homee/>
    <Banner/>
    <CatBan/>
    <Main/>
    <Footer/>



    </>
  )
}

export default Home