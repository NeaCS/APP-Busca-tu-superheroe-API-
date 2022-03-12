$(() => {
  let buscar = $("#botonbuscar");

  buscar.on("click", () => {
    
    let personaje = $("#numeroPersonaje").val();
    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/4905856019427443/${personaje}`,
      dataType: "JSON",
      success: (dataApi) => {
        console.log("salida de dataApi", dataApi);
        let tarjeta = $(".card");
        tarjeta.html(`
        <img src="${dataApi.image.url}" alt="imagensuperheros">
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Nombre: ${dataApi.name}</br>
        Conexiones: ${dataApi.connections[`group-affiliation`]}</li>
        <li class="list-group-item">Publicado por: ${dataApi.biography.publisher}</li>
        <li class="list-group-item">Ocupación: ${dataApi.work.occupation}</li>
        <li class="list-group-item">Primera aparición: ${dataApi.biography[`first-appearance`]}</li>
        <li class="list-group-item">Altura: ${dataApi.appearance.height}</li>
        <li class="list-group-item">Peso: ${dataApi.appearance.weight}</li>
        <li class="list-group-item">Alianzas: ${dataApi.biography.aliases}</li>
      </ul>`);
      },

      error: () => {
        alert(`Hubo un error. Por favor, inténtelo más tarde`);
      },
    });
  });
});
