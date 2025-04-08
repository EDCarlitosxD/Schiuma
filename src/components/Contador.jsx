import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
function Contador() {
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();  // Hook para navegación programática

  useEffect(() => {
    let timer;
    
    if (isActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }else{
      localStorage.removeItem('token')
      navigate('/'); 
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, isActive]);

  const handleReset = () => {
    navigate('/'); 
  };

  return (
    <>
      <div data-layer="Delete product alert" className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[584px] h-[360px] border-2 border-neutral-900 p-2 bg-white rounded-2xl inline-flex flex-col justify-between items-center overflow-hidden">
        <div data-layer="Frame 91" className="self-stretch flex-1 flex flex-col justify-start items-start">
          <div data-layer="Type" className="self-stretch flex flex-col justify-start items-center">
            <img data-layer="Animation - 1740434375890 (1) 1" className="w-[200px] h-[200px]" src="/src/assets/advertencia.gif" />
            <div data-layer="Advertencia" className="text-center justify-start text-neutral-900 text-[26px] font-light font-['Bricolage_Grotesque']">Advertencia</div>
          </div>
          <div data-layer="Information" className="self-stretch flex-1 p-2.5 inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <div data-layer="Usted esta por eliminar un producto, ¿desea continuar?" className="text-center justify-start text-black text-base font-normal font-['Century_Gothic']">
              Su a expirado, redireccionando al login en {countdown} {countdown === 1 ? 'segundo' : 'segundos'}
            </div>
          </div>
        </div>
        <div data-layer="Buttons" className="self-stretch h-12 inline-flex justify-center items-end gap-2 overflow-hidden">

        <button 
  data-layer="Close Gray" 
  data-property-1="Default" 
  className="flex-1 h-12 relative bg-amber-400 cursor-pointer hover:bg-neutral-500 hover:text-white rounded-br-lg overflow-hidden text-neutral-900 text-base font-normal font-['Century_Gothic'] transition-all duration-300 ease-in-out"
  onClick={handleReset}
>
  Restaurar sesión
</button>
        </div>
      </div>
    </>
  );
}

export default Contador;