$(() => {


  var dataPoints = [];
  var options = {
    title: {
      text: 'Poderes del superheroe'
    },
    data: [
      {
        type: "pie",
        startAngle: 45,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y})",
        yValueFormatString: "#,##0.#" % "",
        dataPoints: dataPoints,
      },
    ],
  };

  let buscar = $("#botonbuscar");


  buscar.on("click", () => {
    let personaje = $("#numeroPersonaje").val();
    //Validar si el valor ingresado es un número
    if (isNaN(personaje)) {
      alert("Por favor, escriba un número válido")
    } else {

    $.ajax({
      type: "GET",
      url: `https://www.superheroapi.com/api.php/4905856019427443/${personaje}`,
      dataType: "JSON",
      success: (dataApi) => {
        console.log("salida de dataApi", dataApi);

        let tarjeta = $("#cardContainer");
        tarjeta.html(`
        <section class="card" style="width: 30rem;">
            
        <img src="${dataApi.image.url}" alt="imagensuperheros">
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Nombre: ${dataApi.name}</br>
        Conexiones: ${dataApi.connections[`group-affiliation`]}</li>
        <li class="list-group-item">Publicado por: ${dataApi.biography.publisher
          }</li>
        <li class="list-group-item">Ocupación: ${dataApi.work.occupation}</li>
        <li class="list-group-item">Primera aparición: ${dataApi.biography[`first-appearance`]
          }</li>
        <li class="list-group-item">Altura: ${dataApi.appearance.height}</li>
        <li class="list-group-item">Peso: ${dataApi.appearance.weight}</li>
        <li class="list-group-item">Alianzas: ${dataApi.biography.aliases}</li>
      </ul></section>`);

 // Bucle for in para rellenar información del gráfico
        for (prop in dataApi.powerstats) {

          dataPoints.push({
            label: prop,
            y: dataApi.powerstats[prop],
          });

        } console.log(dataPoints)
        
        $("#chartContainer").CanvasJSChart(options);
        // vaciar el array para volver a llenarlo con la info nueva
        dataPoints.length = 0

      },

      error: () => {
        alert(`Hubo un error. Por favor, inténtelo más tarde`);
      },
    });
  }});
});
