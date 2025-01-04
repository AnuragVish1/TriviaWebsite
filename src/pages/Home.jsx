import Typewriter from 'typewriter-effect';
import { NavLink } from "react-router"


const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(/NewBackGround.png)`
    }} className=" h-screen bg-cover">
      <div className=' flex flex-col gap-[12rem] justify-end items-center'>
        <div className=' lg:text-[5.5rem] md:text-[5rem] text-[4rem] p-6 text-center text-wrap pt-24 font-serif text-[#4b4573] tracking-wide h-[20rem] lg:h-auto md:h-auto font-lora' >
          <Typewriter
            options={{
              strings: ['Keep your mind sharp.', 'Stay focused.', 'Be creative.'],
              autoStart: true,
              loop: true,
            }}
          />

        </div>
        <button className='bg-[#eaddcf] rounded-[1.2rem] p-4 w-[10rem] shadow-md hover:scale-95 transition-all border-2 border-[#b9af9f] font-serif'><NavLink to="/trivia">Get Started</NavLink></button>
      </div>
    </div>

  )
}
export default Home