import api from "../../api/api";

function Login() {
    function handleForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const senha = formData.get("senha");
        api.post("/login", {email, senha})
        .then((response)=>{
            if(response.status === 200){
                localStorage.setItem("token", response?.data?.token);
            }
        })
    }
    return(
        <>
         <form onSubmit={handleForm}>
            <input type="text" name="email" placeholder="Email"/>
            <input type="password" name="senha" placeholder="Senha"/>
         </form>
        </>
    )
}