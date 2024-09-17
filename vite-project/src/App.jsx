import { useState, useCallback , useEffect , useRef } from "react"



function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password,setPassword] = useState("");

  //ref hook

  const passwordRef = useRef(null)


// generte password with callBack hook
  const passwordGenerator = useCallback(() =>{
let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz"

if (numberAllow) str += "0123456789"
if (charAllow) str += "!@#$%^&*()"


for(let i = 1; i <= length; i++) //loop for arranging code
{
  let char = Math.floor(Math.random() * str.length + 1) ;

 pass += str.charAt(char)

}

setPassword(pass)

  },[length,numberAllow,charAllow,setPassword]) 

  const copyPasswordToClipboard = useCallback(
    () => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,100)
      window.navigator.clipboard.writeText(password)
    }, [password]
  )

  useEffect(() => { // calling function using useEffect 
    passwordGenerator()
  }, [length, numberAllow , charAllow , passwordGenerator])
  return (
    <>
    <div className="  w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-800">

      <h1 className="text-white text-center my-3">Password generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">

        <input 
        type="text" 
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}
        />

        <button 
        onClick={copyPasswordToClipboard}
        className="bg-blue-500 text-white text-center px-3 py-0.5 shrink-0">copy</button>

      </div>


 <div className=" flex  w-full max-w-md mx-auto gap-3">
      <div className="flex   text-sm gap-x-2">

        <div className="flex items-center gap-x-1"></div>
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label htmlFor=""> Length : {length}</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input type="checkBox"
        defaultChecked={numberAllow}
        id="numberInput"
        onChange={()=> {
          setNumberAllow((prev) => !prev);
        }} />
        <label htmlFor=""> Numbers </label>
      </div>

      <div className="flex items-center gap-x-1">
        <input type="checkBox"
        defaultChecked={charAllow}
        id="characterInput"
        onChange={()=> {
          setCharAllow((prev) => !prev);
        }} />
        <label htmlFor=""> Characters </label>
      </div>
 
      
    </div>

    </div>
    </>
  )
}

export default App
