

import { generateContent } from '../backend/geminiApi.js'
import * as motion from "motion/react-client"
import { useState, useEffect } from 'react'
import 'ldrs/mirage'
import { button, div } from 'motion/react-client'
import { AnimatePresence, useSpring } from "motion/react"
import { useNavigate } from 'react-router'
import { NavLink } from "react-router"

const Trivia = () => {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([
        { "id": 1, "question": "What is the next number in this sequence: 2, 4, 6, 8?", "options": ["10", "9", "12", "11"], "answer": "10", "explanation": "This is an arithmetic sequence where each number increases by 2." },
        { "id": 2, "question": "Solve: 10 + 5 x 2 = ?", "options": ["20", "30", "100", "25"], "answer": "20", "explanation": "Follow order of operations (PEMDAS/BODMAS): Multiplication before addition." },
        { "id": 3, "question": "Which planet is known as the 'Red Planet'?", "options": ["Jupiter", "Mars", "Venus", "Saturn"], "answer": "Mars", "explanation": "Mars' reddish appearance is due to iron oxide on its surface." },
        { "id": 4, "question": "What is the square root of 81?", "options": ["7", "8", "9", "10"], "answer": "9", "explanation": "9 multiplied by itself equals 81." },
        { "id": 5, "question": "How many sides does a hexagon have?", "options": ["5", "6", "7", "8"], "answer": "6", "explanation": "Hexa- means six." },
        { "id": 6, "question": "What is the chemical symbol for water?", "options": ["CO2", "H2O", "NaCl", "O2"], "answer": "H2O", "explanation": "Water is composed of two hydrogen atoms and one oxygen atom." },
        { "id": 7, "question": "Solve: 25 - 12 + 3 = ?", "options": ["26", "14", "16", "10"], "answer": "16", "explanation": "Perform addition and subtraction from left to right." },
        { "id": 8, "question": "Who painted the Mona Lisa?", "options": ["Michelangelo", "Raphael", "Donatello", "Leonardo da Vinci"], "answer": "Leonardo da Vinci", "explanation": "Leonardo da Vinci is the renowned artist behind the Mona Lisa." },
        { "id": 9, "question": "What is the capital of France?", "options": ["Berlin", "Madrid", "Rome", "Paris"], "answer": "Paris", "explanation": "Paris is the capital and most populous city of France." },
        { "id": 10, "question": "Solve: 3/4 + 1/4 = ?", "options": ["1", "1/2", "3/8", "4/8"], "answer": "1", "explanation": "Add the numerators since the denominators are the same." }
    ])
    const [isAnswered, SetIsAnswered] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [isCorrect, SetIsCorrect] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState("")
    let [currentIndex, SetCurrentIndex] = useState(0)
    const [finalResult, setFinalResult] = useState(0)
    const [finished, setFinished] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {

        const generateResult = async () => {
            try {
                setLoading(true)
                const response = await generateContent()
                setResult(response)
            }
            catch (err) {
                console.error(err)
                return (
                    <>
                        Error
                    </>
                )
            }
            finally {
                setLoading(false)
            }
        }

        generateResult()

    }, [])

    const handleUserAnswer = (option) => {
        SetIsAnswered(true)
        setSelectedAnswer(result[currentIndex].options[option])
        setCorrectAnswer(result[currentIndex].answer)
        if (selectedAnswer == correctAnswer) {
            SetIsCorrect(true)
            setFinalResult(finalResult + 1)

        }





    }

    const handleNextQuestion = () => {

        if (currentIndex < result.length - 1) {
            SetCurrentIndex(currentIndex + 1)
        }
        if (currentIndex >= result.length - 1) {
            setFinished(true)
        }
        setProgress(((currentIndex + 1) / result.length) * 100)
        SetIsAnswered(false)

    }




    return (


        <div style={{
            backgroundImage: `url(/backGround2.png)`
        }} className=" flex lg:h-screen md:h-screen h-[60rem] justify-center items-center flex-col bg-cover">
            {finished && (
                <div className='  font-lora text-center text-[#403456]'>
                    <h1 className='text-[5rem]'>Your Score:</h1>
                    <h1 className='text-[5rem]'>{finalResult}/{result.length}</h1>
                    <button className='bg-[#eaddcf] rounded-[1.2rem] p-4 w-[10rem] shadow-md hover:scale-95 transition-all border-2 border-[#b9af9f] font-serif mt-6'><NavLink to="/">Play Again</NavLink></button>
                </div>
            )}

            {loading ? (<l-mirage
                size="60"
                speed="2.5"
                color="black"
            ></l-mirage>) : !finished && (
                <div className=" lg:w-[60%] lg:h-[70%] w-[75%] h-[80%]  lg:p-5 flex flex-col justify-between transition-all">
                    <div className={`absolute h-2 transition-all ease-linear bg-pink-500 top-0 left-0`} style={{ width: progress + '%' }}></div>
                    <div className=' flex flex-col justify-between gap-8'>
                        <div className=" w-[100%] bg-white p-6 text-xl rounded-xl shadow-sm border-2  font-lora tracking-wide" >
                            {result[currentIndex].question}
                        </div>





                        <div className={` p-4 rounded-lg  font-lora h-[8rem] flex flex-col gap-2 justify-center ${isAnswered ? 'bg-white' : 'bg-transparent'}`}>
                            {isAnswered && (
                                <>
                                    <b>Explanation: </b>
                                    {result[currentIndex].explanation}
                                </>
                            )}
                        </div>




                        <div className=" grid lg:grid-cols-2 h-[60%] gap-[2rem] gap-x-28">

                            {result[currentIndex].options.map((option, index) =>
                                <button className={`shadow-md  rounded-lg hover:scale-95 transition-all flex justify-center items-center text-[1.2rem] border-1 font-lora lg:text-xl p-2 h-[4.2rem] ${isAnswered ? option == correctAnswer ? 'bg-green-400' : option == selectedAnswer ? 'bg-red-300' : "bg-white" : "bg-white"}`} onClick={handleUserAnswer.bind(option, index)}
                                    disabled={isAnswered} key={index}>
                                    {option}
                                </button>
                            )}



                        </div>
                    </div>
                    <div className=' flex flex-col justify-end items-end w-auto h-auto'>
                        <AnimatePresence>
                            {isAnswered && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                >
                                    <button className=' p-4 w-[6.2rem] lg:mt-1 bg-black text-white rounded-lg mt-4' onClick={handleNextQuestion}>
                                        Next
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>)
            }
        </div>

    )
}
export default Trivia