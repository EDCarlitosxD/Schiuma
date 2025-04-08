import { useEffect, useRef, useState } from "react";
import { fetchData } from "../utils/FetchData";
import { Sidebar } from "./Sidebar";
import { ContentDashboard } from "./ContentDashboard";
import { Link } from "react-router-dom";


function EditarProducto() {
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);

    const [backgroundImage, setBackgroundImage] = useState(null);
    const fileInputRef = useRef(null);
    const formRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBackgroundImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          // 1. Crear FormData desde el formulario
          const formData = new FormData(formRef.current);
          
          // 2. Opcional: Verificar contenido del FormData (para depuración)
          for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }
          
          // 3. Hacer la petición fetch
          const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
            method: 'POST',
            headers: {
              'token': localStorage.getItem('token') ?? '',
              // No establezcas 'Content-Type': fetch lo hará automáticamente con el boundary correcto
            },
            body: formData // Enviamos el FormData directamente
          });
    
    
          const data = await respuesta.json();
          console.log('Producto creado:', data);
          alert('Producto creado exitosamente!');
          
        } catch (error) {
          console.error('Error:', error);
          alert(error.message || 'Error al enviar el formulario');
        }
      };
    


    useEffect(() => {
        const getData = async () => {
            const providers = await fetchData('provider');
            console.log(providers);


            const categories = await fetchData('category');


            setProviders(providers);
            setCategories(categories);
            


        };

        getData();
    }, []);

    return (
        <div className="container-app">
            <Sidebar></Sidebar>
            <ContentDashboard busqueda={false} nombre="Agregar Productos.ㅤㅤㅤㅤㅤㅤㅤ">


                <section className="main-section">
                    <Link className="back-link" to='/dashboard' >
                        {" "}
                        <p>{`< Volver a productos`}</p>
                    </Link>
                    <form ref={formRef} className="container"  onSubmit={handleSubmit} >
                        <div className="left-box">
                            <div className="upload-box relative">
                                <img
                                    alt="Subir imagen"
                                    id="preview-image"
                                    src={backgroundImage || "../images/img/Subir-Imagen.png"}
                                />
                                <input ref={fileInputRef} onChange={handleImageChange} name="image" className="w-[396px] h-[396px] absolute top-0 bottom-0 left-0 right-0 opacity-0" placeholder="" accept="image/*"  id="image-upload" type="file" />
                            </div>
                            <div className="input-container">
                                <div className="input-box">
                                    <p>Stock actual</p>
                                    <div className="custom-number">
                                        <input
                                            className="custom-input"
                                            defaultValue="0"
                                            min="0"
                                            name="stock"
                                            type="number"
                                        />
                                        <div className="buttons">
                                            <button className="btn-up" onclick="increment(this)">
                                                <img alt="Subir" src="../icons/FlechaArriba.svg" />
                                            </button>
                                            <button className="btn-down" onclick="decrement(this)">
                                                <img alt="Bajar" src="../icons/FlechaAbajo.svg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-box">
                                    <p>Minimo de Stock</p>
                                    <div className="custom-number">
                                        <input
                                            className="custom-input"
                                            defaultValue="0"
                                            name="min_stock"
                                            min="0"
                                            type="number"
                                        />
                                        <div className="buttons">
                                            <button className="btn-up" onclick="increment(this)">
                                                <img alt="Subir" src="../icons/FlechaArriba.svg" />
                                            </button>
                                            <button className="btn-down" onclick="decrement(this)">
                                                <img alt="Bajar" src="../icons/FlechaAbajo.svg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-box">
                                    <p>Costo</p>
                                    <div className="custom-number">
                                        <input
                                            className="custom-input"
                                            defaultValue="0"
                                            min="0"
                                            name="price"
                                            type="number"
                                        />
                                        <div className="buttons">
                                            <button className="btn-up" onclick="increment(this)">
                                                <img alt="Subir" src="../icons/FlechaArriba.svg" />
                                            </button>
                                            <button className="btn-down" onclick="decrement(this)">
                                                <img alt="Bajar" src="../icons/FlechaAbajo.svg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-box">
                                    <p>Precio Venta</p>
                                    <div className="custom-number">
                                        <input
                                            className="custom-input"
                                            defaultValue="0"
                                            min="0"
                                            name="sale_price"
                                            type="number"
                                        />
                                        <div className="buttons">
                                            <button className="btn-up" onclick="increment(this)">
                                                <img alt="Subir" src="../icons/FlechaArriba.svg" />
                                            </button>
                                            <button className="btn-down" onclick="decrement(this)">
                                                <img alt="Bajar" src="../icons/FlechaAbajo.svg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-box">
                            <div className="inner-box">
                                <select name="fk_category" className="custom-select">
                                    <option value="null">Selecciona una opción</option>
                                    {
                                        categories.map(category => (
                                            <option key={category.pk_category+category.name}  value={category.pk_category} >HOLA</option>
                                           
                                        ))
                                    }

                                </select>
                                <div className="select-group">
                                    <select className="custom-select">
                                        <option value="">Selecciona una opción</option>
                                        <option value="0">Activo</option>
                                        <option value="1">Inactivo</option>
                                    </select>
                                    <select name="fk_provider" className="custom-select">
                                        <option value="">Selecciona una opción</option>
                                        {
                                            providers.map(provider => (
                                            <option key={provider.pk_provier+provider.user.name}  value={provider.pk_provider} >{provider.user.name}</option>

                                            ))
                                        }
                                    </select>
                                </div>
                                <input
                                    className="input-personalizado"
                                    placeholder="Nombre del producto"
                                    type="text"
                                    name="name"
                                />
                                <input
                                    className="input-descripcion"
                                    placeholder="Descripción"
                                    type="text"
                                    name="description"
                                />
                                <input
                                    className="input-personalizado"
                                    placeholder="Lote"
                                    type="text"
                                    name="lote"
                                />
                                <input
                                    className="input-personalizado"
                                    placeholder="Fecha de lote"
                                    type="date"
                                    name="expiration"
                                />
                                <button className="custom-button">
                                    <input value='Guardar' type="submit" />
                                </button>
                            </div>
                        </div>
                        <div className="modal-container" id="modal">
                            <div className="modal">
                                <div className="wrapper">
                                    <svg
                                        className="checkmark"
                                        viewBox="0 0 52 52"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            className="checkmark__circle"
                                            cx="26"
                                            cy="26"
                                            fill="none"
                                            r="25"
                                        />
                                        <path
                                            className="checkmark__check"
                                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                            fill="none"
                                        />
                                    </svg>
                                </div>
                                <h4>Agregado con éxito</h4>
                                <button className="close-button" id="closeModal">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </form>
                </section>


            </ContentDashboard>
 

        </div>

    )
}

export default EditarProducto;


