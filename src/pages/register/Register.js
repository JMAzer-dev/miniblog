import styles from './Register.module.css'

import{ useState, useEffect } from 'react'
import { useAuthenticantion } from '../../hooks/useAuthenticantion'

const Register = () => {
    const [ displayName, setDisplaName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ error, setError ] = useState("")

    //renomeando o error que vai chegar do backend, junto com as outras funções do servidor
    const {createUser, error: authError, loading} = useAuthenticantion();

    const handleSubmit = async(e) => {
        e.preventDefault();

        setError("")

        const user = {
            displayName,
            email,
            password
        }

        if(password !== confirmPassword) {
            setError("As senhas precisam ser iguais.")
            return
        }

        const res = await createUser(user)

        console.log(res)
    };

    useEffect(() => {
      if( authError ) {
        setError(authError)
      }     
    }, [authError])
    


  return (
    <div className={styles.register}>
    <h1>Cadastre-se para postar</h1>
    <p>Crie seu usuário e compartilhe suas histórias</p>
    <form onSubmit={handleSubmit}>
        <label>
            <span>Nome: </span>
            <input 
            type="text" 
            name='displayName' 
            required 
            placeholder='Nome do Usuário' 
            value={displayName}
            onChange={(e) => setDisplaName(e.target.value)}
            />
        </label>
        <label>
            <span>E-mail: </span>
            <input 
            type="email" 
            name='email' 
            required 
            placeholder='E-mail do Usuário' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>
        <label>
            <span>Senha: </span>
            <input 
            type="password" 
            name='password' 
            required 
            placeholder='Insira sua senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        <label>
            <span>Confirme sua senha: </span>
            <input type="password" 
            name='confirmPassword' 
            required 
            placeholder='Confirme a sua senha' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </label>
        {!loading && <button className='btn' type='submit'>Cadastrar</button>}
        {loading && <button className='btn' type='submit' disabled>Aguarde...</button>}

        {error && <p className='error'>{error}</p> }
    </form>
    </div>
    
  )
}

export default Register