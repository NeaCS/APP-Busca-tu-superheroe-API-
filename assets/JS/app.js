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
        let tarjeta = $("#card");
        tarjeta.html(`
                <h2>${dataApi.name}</h2>
                <img class="card-img-top" src="${dataApi.image.url}" alt="Card image cap">`);
      },

      error: () => {
        alert(`Hubo un error. Por favor, inténtelo más tarde`);
      },
    });
  });
});
