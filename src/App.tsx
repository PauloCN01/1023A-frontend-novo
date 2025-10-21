import { useEffect, useState } from 'react'
import './App.css'
import api from './api/api'
type ProdutoType = {
  _id: string,
  nome: string,
  preco: number,
  descricao: string,
  urlfoto: string
}
function App() {
  useEffect(() => {
    api.get("/produtos")
    .then((response)=>setProdutos(response.data))
    .catch((error) => {
      if(error.response){
      console.error("Servidor respondeu, mas com erro:"+(error.response.mensagem??error?.response.data))
      alert("Servidor respondeu, mas com erro:"+(error.response.data.mensagem
        ??" olhe o console do navegador para mais informações"))
      }
      else {//Não teve resposta do servidor, então mostramos o erro do axios
        console.error("Error Axios:"+error.message)
        alert("Servidor não respondeu, você ligou o backend? Erro do Axiios:"+(error.message??"Erro desconhecido: Chame o TERE"))
      }
    })
  }, [])
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
      const nome = formData.get("nome")
      const preco = formData.get("preco")
      const descricao = formData.get("descricao")
      const urlfoto = formData.get("urlfoto")
    const produto = {nome, preco, descricao, urlfoto}
    api.post("/produtos", produto)
    .then((response) => setProdutos([...produtos, response.data]))
    .catch((error) => {
      if(error.response){
      console.error("Servidor respondeu, mas com erro:"+(error.response.mensagem??error?.response.data))
      alert("Servidor respondeu, mas com erro:"+(error.response.data.mensagem
        ??" olhe o console do navegador para mais informações"))
      }
      else {//Não teve resposta do servidor, então mostramos o erro do axios
        console.error("Error Axios:"+error.message)
        alert("Servidor não respondeu, você ligou o backend? Erro do Axiios:"+(error.message??"Erro desconhecido: Chame o TERE"))
      }
    })
    }
 
  return (
    <>
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" name="nome"/>
        <input type="number" placeholder="Preço" name="preco"/>
        <input type="text" placeholder="Descrição" name="descricao"/>
        <input type="text" placeholder="URL Foto" name="urlfoto"/>

        <input type="submit" value="Cadastrar"/>
      </form>
      <h1>Lista de Produtos</h1>
      <div className="container-produtos">
        {
         produtos.map((produto) => {
           return (
             <div key={produto._id}>
              <h2>{produto.nome}</h2>
              <img src={produto.urlfoto} alt="Imagem do produto" />
              <p>Preço: {produto.preco}</p>
              <p>Descrição: {produto.descricao}</p>
            </div>
           )
         })
        }
      </div>
    </>
  )
}

export default App
