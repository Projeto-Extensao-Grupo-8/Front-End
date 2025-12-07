import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import { Button, Input, LinkText } from './presentation/atomic/atom'
import { PrivateHeader, PublicHeader } from './presentation/atomic/molecule'
import viteLogo from '/vite.svg'

//Arquivo que eu vou só tacando os componentes sem formatação para ver como está ficando

function App() {
  const [count, setCount] = useState(0)
  const [valorInputLogin, setValorInputLogin] = useState('');

  return (
    <>

      <PublicHeader/>
      <PrivateHeader/>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      
        <Button text="teste" onClick={()=>{}} variant="login"/>
      
        <LinkText text={"Teste link"} isActive="true"/>
        <LinkText text={"Teste link"}/>
        
        <Input
          value={valorInputLogin}
          onChange={e => setValorInputLogin(e.target.value)}
          placeholder="seu@gmail.com"
          label={"Email"}
        />    

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
