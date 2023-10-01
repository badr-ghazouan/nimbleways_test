import Image from 'next/image'
import { Inter } from 'next/font/google'
import Moment from 'react-moment'
import moment from 'moment';
import DatePicker from 'react-datepicker'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { start } from 'repl';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [startDate, setStartDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())

  useEffect( () => {

    const fetchData =async () => {
      
      try {
        const {result: response } = await axios.get('/')
        console.log('data: ', result)
        setStartDate(data)
      } catch (error) {
        console.error(error.message)
      }finally{
        setStartDate(new Date())
      }
    }

    fetchData();
  }, []);



  let handleEndDate = (endDate) => {
    console.log("&handle end date", endDate)

    console.log("&handle start date", startDate)

    if(moment().from(startDate)  < moment().from(endDate) ){
      alert("end date should be post start date")

    }
    setFinalDate(endDate)
  }

  let getDifference = () => {


    const diff =  moment.duration(moment(finalDate).diff(moment(startDate))).asDays()

    if(diff < 0) return 0

    else return diff
  }


  return (
    <main
      className={`flex flex-col items-center justify-between p-24 `}
    >
      <div className=" w-full items-center justify-between font-mono text-sm lg:flex">
        <p >
          Done by: &nbsp;
          Badr Ghazouan
        </p>
        
        <DatePicker 
        className='startDate'
        selected={startDate} 
        onChange={ (date) => setStartDate(date)} />


        <DatePicker 
        className='endDate' 
        selected={finalDate}
        onChange={ (date) => handleEndDate(date)} 
        
        />

       <button style={{backgroundColor: 'lightblue'}}> calculate diffs</button> 


      

      </div>
      <p style={{backgroundColor: 'grey', marginTop: '50px'}}>{ getDifference() }</p>
        
      
    </main>
  )
}
