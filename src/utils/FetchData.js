export const fetchData = async (resource) => {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${resource}`)


    return await respuesta.json();

}


export const fetchDataAuth = async (resource, queryParams = {}) => {
    // Convertir queryParams a string de URL
    const queryString = new URLSearchParams(queryParams).toString();
    
    // Construir URL completa
    const url = `${import.meta.env.VITE_API_URL}/${resource}${queryString ? `?${queryString}` : ''}`;

    const respuesta = await fetch(url, {
        headers: {
            token: localStorage.getItem('token') ?? ''
        }
    });

    return await respuesta.json();
}
