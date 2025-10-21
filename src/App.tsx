import { useEffect, useState } from 'react'
import './App.css'
type EstudanteType = {
  _id: string,
  nome: string,
  idade: number
}
function App() {
  const token = localStorage.getItem("token")
  useEffect(() => {
    fetch("/api/estudantes",{
      headers: {
      "Authorization": 'Bearer ${token}',
    }
    })
    .then((response) => response.json())
    .then((dados)=>setEstudantes(dados))
  }, [])
  const [estudantes, setEstudantes] = useState<EstudanteType[]>([])
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState(0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const estudante = {nome, idade}
    fetch("/api/estudantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estudante)
    })
    .then((response) => response.json())
    .then((dados) => {
      console.log(dados)
      setEstudantes([...estudantes, dados])
      setNome("")
      setIdade(0)
    })
  }
 
  return (
    <>
      <h1>Cadastro de Estudantes</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={nome}
         onChange={(e) => setNome(e.target.value)}/>

        <input type="number" placeholder="Idade" value={idade}
         onChange={(e) => setIdade(Number(e.target.value))}/>

        <input type="submit" value="Cadastrar"/>
      </form>
      <h1>Lista de Estudantes</h1>
      <div className="container-estudantes">
        {
         estudantes.map((estudante) => {
           return (
             <div key={estudante._id}>
              <h2>{estudante.nome}</h2>
              <p>Idade: {estudante.idade}</p>
            </div>
           )
         })
        }
      </div>
    </>
  )
}

export default App
