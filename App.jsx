import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { users } from './name';
import { FaJetFighterUp } from "react-icons/fa6";
import NewUSer from './NweUser';



function App() {






  return (
    <div className='h-full '>
      <motion.div
        className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
        animate={{
          backgroundColor: [
            "#ff6b6b", // red
            "#feca57", // yellow
            "#1dd1a1", // green
            "#5f27cd", // purple
            "#ff6b6b"  // back to red
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className='h-screen p-5'>
          <div className='border h-full w-150 items-center justify-center 
        backdrop-blur-md bg-gray-700/50 p-5 rounded-2xl
        '>
            <h1 className='flex items-center justify-center'>Leaderboard </h1>
            <div className=''>
              <NewUSer></NewUSer>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}


export default App
