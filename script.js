// Cambia esta IP por la del ESP32 en tu red local
const ESP32_IP = "http://38.25.26.109/update"; // <-- EDITA ESTA LÍNEA CUANDO SEPAS LA IP

async function sendData() {
    const shelf = document.getElementById("shelf").value;
    const productCode = document.getElementById("productCode").value.trim();
    const price = document.getElementById("price").value.trim();
    const status = document.getElementById("status");

    if (!productCode || !price) {
        status.textContent = "Completa todos los campos.";
        status.style.color = "red";
        return;
    }

    const data = {
        shelf: shelf,
        productCode: productCode,
        price: parseFloat(price)
    };

    try {
        status.textContent = "Enviando...";
        status.style.color = "black";

        const response = await fetch(ESP32_IP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            status.textContent = "Actualización enviada correctamente.";
            status.style.color = "green";
        } else {
            status.textContent = "Error enviando al ESP32.";
            status.style.color = "red";
        }

    } catch (e) {
        status.textContent = "No se pudo conectar al ESP32.";
        status.style.color = "red";
    }
}

document.getElementById("updateBtn").addEventListener("click", sendData);
