import logoImage1 from '../../assets/Logo.png'
import logoImage2 from '../../assets/Logo2.png'
import './style.css'

type LogoProps = {
  height: string,
  logo2?: boolean
}

export default function Logo({ height, logo2 }: LogoProps) {
  return (
    <div className="logo-container">
      <img src={logo2 ?  logoImage2 : logoImage1} alt="Logo" style={{ height: height }} />
    </div>
  )
}