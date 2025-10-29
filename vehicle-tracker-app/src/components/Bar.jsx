import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";

export default function Bottomcontainer({ routeByDay, setRouteByDay, carSpeed, setCarSpeed, isPlaying, handleReset, handleToggle}){
    
    const lineIcon = []
    for (let i = 1; i< 6; i++){
         lineIcon.push(
         <TfiLayoutLineSolid key={i} onClick={() => {setCarSpeed(i)}}
          className={`${i <= carSpeed ? 'text-blue-900' : 'text-gray-400' } w-4 h-8 font-bold cursor-pointer`} />)
    }
     
     return(
        <div style={{zIndex: 1000}} className="fixed bottom-10 flex flex-col justify-center left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl py-3 px-6 min-h-[100px] bg-white rounded-lg shadow-lg">
             <div className="flex flex-col md:flex-row gap-5 justify-around items-center">
                <div className="flex items-center flex-wrap gap-4 mx-auto">
                 <select className="px-4 py-1 border-2 text-gray-600 font-medium border-gray-500 rounded">
                    <option className="text-gray-600 font-medium">Wireless</option>
                 </select>
                 <select value={routeByDay} onChange={(e) => {setRouteByDay(e.target.value)}} className="px-4 py-1 border-2 text-gray-600 font-medium border-gray-500 rounded">
                    <option value="today" className="text-gray-600 font-medium">Today</option>
                    <option value="yesterday" className="text-gray-600 font-medium">Yesterday</option>
                    <option value="week" className="text-gray-600 font-medium">This Week</option>
                 </select>
                 </div>
                 <div className="flex items-center gap-1">
                    {lineIcon}
                    </div>
                 <div className="flex flex-wrap gap-4">
                    {!isPlaying ?
                    <button onClick={handleToggle} className="min-w-[100px] cursor-pointer flex justify-center items-center shadow-md bg-violet-500 p-2 text-white font-medium rounded gap-3">
                        <FaPlay className="w-4 h-4" /> Start
                    </button> : <button onClick={handleToggle} className="min-w-[100px] cursor-pointer flex justify-center shadow-md items-center rounded bg-violet-500 p-2 text-white font-medium gap-3">
                        <FaPause className="w-4 h-4" /> Pause
                    </button> }
                    <button onClick={handleReset} className="min-w-[100px] shadow-md cursor-pointer bg-neutral-100 p-2 rounded text-black font-medium flex justify-center items-center gap-2">
                        Reset
                    </button>
                 </div>
             </div>
        </div>
     )
}