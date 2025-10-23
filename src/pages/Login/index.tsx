import Input from '../../components/Input'
import Logo from './Logo'
import './style.css'

export default function Login() {
  return (
    <div className='login-container'>
      <Logo height='299px'/>
      <form className='login-form'>
        <Input type='text' label='Usuario' name='user' labelOnEnd={false} />
        <Input type='password' label='Senha' name='password' labelOnEnd={false} />
        <div className='login-options'>
          <div className='show_pass_container'>
            <input type="checkbox" id='show' />
            <label htmlFor="show">Exibir senha</label>
          </div>
          <a href="#">Esqueceu a senha?</a>
        </div>
        <button>Entrar</button>
        <p>Ainda não tem uma conta? <a href="">Cadastre-se</a></p>
      </form>
    </div>
  )
}