import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img  src={logo} alt="logo" />
        Meme Generator
      </div>
    </header>
  )
}