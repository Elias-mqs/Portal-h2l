///////// DEBOUNCE (LIMITAR ENVIO DE FORMULARIO POR SEGUNDO) /////////
function debounce(fn, delay){
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay)
    };
}

export { debounce }