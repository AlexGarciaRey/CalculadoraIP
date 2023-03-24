function calcular() {
    // Obtener los valores de la dirección IP y la máscara de subred
    var ip = document.getElementById("ip").value;
    var mask = document.getElementById("mask").value;
  
    // Convertir las direcciones IP y máscaras de subred en arrays
    var ipArr = ip.split(".");
    var maskArr = mask.split(".");
  
    // Obtener los bits de la máscara de subred
    var maskBits = [];
    for (var i = 0; i < maskArr.length; i++) {
      var binary = parseInt(maskArr[i]).toString(2);
      while (binary.length < 8) {
        binary = "0" + binary;
      }
      maskBits.push(binary);
    }
  
    // Calcular la dirección de red
    var redArr = [];
    for (var i = 0; i < ipArr.length; i++) {
        var octeto = ipArr[i] & parseInt(maskArr[i]);
        redArr.push(octeto);
        }
        var red = redArr.join(".");
        
        // Calcular la dirección de broadcast
        var broadcastArr = [];
        for (var i = 0; i < ipArr.length; i++) {
        var octeto = ipArr[i] | (255 - parseInt(maskArr[i]));
        broadcastArr.push(octeto);
        }
        var broadcast = broadcastArr.join(".");
        
        // Calcular el primer y último host
        var primerHostArr = redArr.slice();
        primerHostArr[3] += 1;
        var primerHost = primerHostArr.join(".");
        var ultimoHostArr = broadcastArr.slice();
        ultimoHostArr[3] -= 1;
        var ultimoHost = ultimoHostArr.join(".");
        
        // Calcular el número de hosts por subred
        var hostsSubred = Math.pow(2, 32 - maskBits.join("").indexOf("0")) - 2;
        
        // Calcular el número de subredes disponibles
        var subredes = Math.pow(2, maskBits.join("").indexOf("0")) - 2;// Mostrar los resultados en la página
        document.getElementById("red").textContent = red;
        document.getElementById("broadcast").textContent = broadcast;
        document.getElementById("primerHost").textContent = primerHost;
        document.getElementById("ultimoHost").textContent = ultimoHost;
        document.getElementById("hostsSubred").textContent = hostsSubred;
        document.getElementById("subredes").textContent = subredes;
        }