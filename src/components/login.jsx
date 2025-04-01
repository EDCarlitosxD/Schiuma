import '../App.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();
      
      if (!response.ok) {
        setMensaje(data.message || "Error en el servidor");
        return;
      }
      
      if (response.ok) {
        const token = response.headers.get('X-Token')
        console.log(token);

        if(token){
          localStorage.setItem("token", token);
          
          navigate("/dashboard"); // Redirige al usuario a la página de verificación de token
        }else{
          setMensaje(data.message || "Error desconocido en el inicio de sesión.");
        }
      } else {
        setMensaje(data.message || "Error desconocido en el inicio de sesión.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
      console.error("Error de login:", error);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center bg-[url(/src/assets/login/Login.webp)] justify-between h-screen w-screen bg-cover bg-center bg-no-repeat pt-[152px] pb-4">
        <section className="flex flex-col py-6 px-10 items-center gap-6 border-y-[16px] bg-white border-y-[#1E8A71]">
          <div className="flex flex-col w-[600px] h-[752px] py-6 items-center gap-8">
            <header className="flex flex-col justify-center items-center gap-4">
              <img src="/src/assets/login/Logo.webp" alt="schiuma" className="w-[280px] h-[248px]" />
              <h1 className="text-[#1E8A71]">Inicio de sesión</h1>
            </header>

            <form className="flex flex-col gap-2 items-center w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-10 justify-center px-10 items-center w-full">
                {/* Campo de Usuario */}
                <div className="flex w-full items-center border-b-[3px] px-4 transition-all bg-[#CAE0BC] border-b-[#1E8A71] focus-within:border-b-[3px] focus-within:border-b-[#FF9D23] focus-within:bg-[rgba(255,157,35,0.16)]">
                  <input
                    type="email"
                    id="email"
                    placeholder="Usuario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 w-full text-[26px] font-light leading-normal font-[Bricolage Grotesque] text-[var(--primario,#1E8A71)] focus:text-[#FF9D23] focus:outline-none outline-none border-none bg-transparent"
                    required
                  />
                </div>

                {/* Campo de Contraseña */}
                <div className="flex w-full items-center border-b-[3px] px-4 transition-all bg-[#CAE0BC] border-b-[#1E8A71] focus-within:border-b-[3px] focus-within:border-b-[#FF9D23] focus-within:bg-[rgba(255,157,35,0.16)]">
                  <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 w-full text-[26px] font-light leading-normal font-[Bricolage Grotesque] text-[var(--primario,#1E8A71)] focus:text-[#FF9D23] focus:outline-none outline-none border-none bg-transparent"
                    required
                  />
                </div>
              </div>

              {/* Mensaje de error */}
              {mensaje && <p className="text-red-500">{mensaje}</p>}

              <div className="flex flex-col justify-center gap-16 h-full self-stretch">
                <a href="#" className="mx-12 text-[#7D7E7C]">¿Olvidaste tu contraseña?</a>
                <button type="submit" className="h-14 self-center w-72 rounded-[5px] text-white bg-[#FF9D23] hover:bg-[#FFF] hover:border-[5px] hover:border-[#FF9D23] hover:text-[#FF9D23] cursor-pointer hover:ease-in-out">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </section>
        <a href="#">Términos y condiciones</a>
      </main>
    </>
  );
};

export default Login;
