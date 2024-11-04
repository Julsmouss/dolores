document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    const filterForm = document.querySelector("#filterForm");
    const bankSelect = document.querySelector("#bank");
    const comparisonTable = document.querySelector(".comparison-table");
    const compareBtn = document.querySelector("#compareBtn");
    const fraudList = document.querySelector(".fraud-list"); // Nueva referencia para la lista de fraudes
    const fraudBankSelect = document.querySelector("#fraud-bank"); // Select para bancos de fraudes
    let products = [];
    let selectedProducts = []; // Array para almacenar los productos seleccionados para comparar
    let banks = {}; // Almacena los bancos para acceder más tarde

    // Cargar productos desde api.json
    fetch("assets/json/api.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudieron cargar los productos");
            }
            return response.json();
        })
        .then((data) => {
            products = data;
            displayProducts(products);
            populateBanks(products); // Llenar bancos para productos
        })
        .catch((error) => {
            console.error(error);
            productList.innerHTML = "<p>No se pudieron cargar los productos.</p>";
        });

    // Cargar información de fraudes desde fraudes.json
    fetch("assets/json/fraudes.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudieron cargar los fraudes");
            }
            return response.json();
        })
        .then((fraudes) => {
            displayFrauds(fraudes);
            populateFraudBanks(fraudes); // Llenar bancos para fraudes
        })
        .catch((error) => {
            console.error(error);
            fraudList.innerHTML = "<p>No se pudieron cargar los fraudes.</p>";
        });

        

    // Función para mostrar productos
    function displayProducts(productsToDisplay) {
        productList.innerHTML = "";
        productsToDisplay.forEach(product => {
            const productItem = document.createElement("div");
            productItem.className = "product-item";
    
            productItem.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
                <h3>${product.nombre}</h3>
                <p><strong>Banco:</strong> ${product.banco}</p>
                <p><strong>Categoría:</strong> ${product.categoria}</p>
                <p><strong>Tasa de Interés:</strong> ${product.tasaInteres}%</p>
                <p><strong>Beneficios:</strong> ${product.beneficios}</p>
                <p><strong>Requisitos:</strong> ${product.requisitos}</p>
                <p><strong>Cashback:</strong> ${product.cashback}</p>
                <button class="compare-btn" data-product='${JSON.stringify(product)}'>Comparar</button>
            `;
    
            productList.appendChild(productItem);
        });
    }
    
    // Función para llenar el select de bancos para productos
    function populateBanks(products) {
        const uniqueBanks = [...new Set(products.map(product => product.banco))];
        uniqueBanks.forEach(bank => {
            const option = document.createElement("option");
            option.value = bank;
            option.textContent = bank;
            bankSelect.appendChild(option);
            banks[bank] = true; // Almacenar en el objeto banks
        });
    }

    // Función para llenar el select de bancos para reportar fraudes
    function populateFraudBanks(fraudes) {
        Object.keys(fraudes[0]).forEach(bankKey => {
            const option = document.createElement("option");
            option.value = bankKey; // Debe ser el mismo que en el JSON
            option.textContent = fraudes[0][bankKey].nombre; // Muestra el nombre del banco
            fraudBankSelect.appendChild(option);
        });
    }

    // Manejar el evento de enviar el formulario de filtros
    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const category = document.getElementById("category").value;
        const bank = bankSelect.value;
        const interestRate = parseFloat(document.getElementById("interestRate").value) || 0;
    
        const filteredProducts = products.filter(product => {
            const categoryMatch = category === "todos" || product.categoria === category;
            const bankMatch = bank === "todos" || product.banco === bank;
            const interestRateMatch = product.tasaInteres >= interestRate;
    
            return categoryMatch && bankMatch && interestRateMatch;
        });
    
        displayProducts(filteredProducts);
    });

    // Manejar la selección de productos para comparar
    productList.addEventListener("click", (e) => {
        if (e.target.classList.contains("compare-btn")) {
            const product = JSON.parse(e.target.getAttribute("data-product"));
            if (!selectedProducts.includes(product)) {
                selectedProducts.push(product);
                e.target.textContent = "Remover de Comparación"; // Cambiar texto del botón
            } else {
                selectedProducts = selectedProducts.filter(p => p !== product);
                e.target.textContent = "Comparar"; // Restablecer texto
            }
        }
    });

    // Manejar la comparación de productos seleccionados
  // Manejar la comparación de productos seleccionados
compareBtn.addEventListener("click", () => {
    comparisonTable.innerHTML = ""; // Limpiar la tabla de comparación
    if (selectedProducts.length === 0) {
        comparisonTable.innerHTML = "<p>No hay productos seleccionados para comparar.</p>";
        return;
    }

    selectedProducts.forEach(product => {
        const row = document.createElement("div");
        row.className = "comparison-row";
        row.innerHTML = `
            <div class="comparison-image">
                <img src="${product.imagen}" alt="${product.nombre}" class="comparison-product-image">
            </div>
            <div class="comparison-details">
                <h3>${product.nombre}</h3>
                <p><strong>Banco:</strong> ${product.banco}</p>
                <p><strong>Categoría:</strong> ${product.categoria}</p>
                <p><strong>Tasa de Interés:</strong> ${product.tasaInteres}%</p>
                <p><strong>Beneficios:</strong> ${product.beneficios}</p>
                <p><strong>Requisitos:</strong> ${product.requisitos}</p>
                <p><strong>Cashback:</strong> ${product.cashback}</p>
            </div>
        `;
        comparisonTable.appendChild(row);
    });
});

    // Función para mostrar información del banco seleccionado para reportar fraude
    function showBankFraudInfo() {
        const selectedBank = fraudBankSelect.value;

        // Si no se ha seleccionado un banco, limpiar la sección de información
        if (!selectedBank) {
            document.getElementById("fraud-contact-number").textContent = "";
            document.getElementById("fraud-branches").textContent = "";
            document.getElementById("fraud-links").textContent = "";
            document.getElementById("fraud-emails").textContent = "";
            return;
        }

        // Buscar la información del banco en el archivo fraudes.json
        fetch("assets/json/fraudes.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar la información de fraudes");
                }
                return response.json();
            })
            .then((data) => {
                const fraudInfo = data[0][selectedBank]; // Acceder a la información del banco seleccionado

                if (fraudInfo) {
                    // Mostrar la información del banco seleccionado
                    document.getElementById("fraud-contact-number").textContent = `Número de contacto: ${fraudInfo.contact}`;
                    document.getElementById("fraud-branches").textContent = `Sucursales: ${fraudInfo.branches}`;
                    document.getElementById("fraud-links").textContent = `Links de autogestión: ${fraudInfo.links}`;
                    document.getElementById("fraud-emails").textContent = `Correos: ${fraudInfo.emails}`;
                } else {
                    document.getElementById("fraud-contact-number").textContent = "";
                    document.getElementById("fraud-branches").textContent = "";
                    document.getElementById("fraud-links").textContent = "";
                    document.getElementById("fraud-emails").textContent = "";
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Añadir evento para mostrar la información del banco al seleccionar
    fraudBankSelect.addEventListener("change", showBankFraudInfo);
});
// Espera a que el contenido del documento esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona los elementos necesarios del DOM
    const productList = document.querySelector(".product-list"); // Lista de productos
    const filterForm = document.getElementById("filterForm"); // Formulario de filtros
    const bankSelect = document.getElementById("bank"); // Selector de bancos
    const comparisonTable = document.querySelector(".comparison-table"); // Tabla de comparación
    const compareBtn = document.getElementById("compareBtn"); // Botón de comparación
    const fraudBankSelect = document.getElementById("fraud-bank"); // Selector de bancos para reportar fraudes

    // Arreglos para almacenar los datos de productos y seleccionados
    let products = []; // Almacena los productos cargados
    let selectedProducts = []; // Almacena los productos seleccionados para comparar
    let fraudData; // Almacena los datos de fraudes

    // Cargar productos desde api.json
    fetch("assets/json/api.json")
        .then((response) => {
            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error("No se pudieron cargar los productos");
            }
            return response.json(); // Devuelve la respuesta en formato JSON
        })
        .then((data) => {
            products = data; // Asigna los datos de productos a la variable
            displayProducts(products); // Muestra los productos en el DOM
            populateBanks(products); // Llena el selector de bancos con los productos
        })
        .catch((error) => {
            console.error(error); // Manejo de errores en la carga de productos
            productList.innerHTML = "<p>No se pudieron cargar los productos.</p>"; // Mensaje de error
        });

    // Cargar información de fraudes desde fraudes.json
    fetch("assets/json/fraudes.json")
        .then((response) => {
            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error("No se pudieron cargar los fraudes");
            }
            return response.json(); // Devuelve la respuesta en formato JSON
        })
        .then((data) => {
            fraudData = data; // Guarda los datos de fraudes
            populateFraudBanks(fraudData); // Llena el selector de bancos para reportar fraudes
        })
        .catch((error) => {
            console.error(error); // Manejo de errores en la carga de fraudes
        });

    /**
     * Llena el selector de bancos para reportar fraudes con los datos proporcionados.
     * @param {Array} fraudes - Datos de fraudes que contienen información de bancos.
     */
    function populateFraudBanks(fraudes) {
        // Limpia el contenido previo del selector
        fraudBankSelect.innerHTML = "<option value=''>Selecciona un banco</option>";
        // Itera sobre las claves de los datos de fraudes para crear opciones en el selector
        Object.keys(fraudes[0]).forEach(bankKey => {
            const option = document.createElement("option");
            option.value = bankKey; // Establece el valor del select como la clave del banco
            option.textContent = fraudes[0][bankKey].nombre; // Muestra el nombre del banco
            fraudBankSelect.appendChild(option); // Agrega la opción al selector
        });
    }

    /**
     * Muestra la información del banco seleccionado para reportar fraude.
     */
    function showBankFraudInfo() {
        const selectedBank = fraudBankSelect.value; // Obtiene el banco seleccionado

        // Si no se ha seleccionado un banco, limpiar la sección de información
        if (!selectedBank) {
            document.getElementById("fraud-contact-number").textContent = "";
            document.getElementById("fraud-branches").textContent = "";
            document.getElementById("fraud-links").textContent = "";
            document.getElementById("fraud-emails").textContent = "";
            return; // Salir de la función
        }

        // Busca la información del banco en los datos de fraudes cargados
        const fraudInfo = fraudData[0][selectedBank]; // Accede a la información del banco seleccionado

        // Si la información del banco existe, la muestra en el DOM
        if (fraudInfo) {
            document.getElementById("fraud-contact-number").textContent = `Número de contacto: ${fraudInfo.contact}`;
            document.getElementById("fraud-branches").textContent = `Sucursales: ${fraudInfo.branches}`;
            document.getElementById("fraud-links").textContent = `Links de autogestión: ${fraudInfo.links}`;
            document.getElementById("fraud-emails").textContent = `Correos: ${fraudInfo.emails}`;
        } else {
            // Limpia la sección de información si no hay datos
            document.getElementById("fraud-contact-number").textContent = "";
            document.getElementById("fraud-branches").textContent = "";
            document.getElementById("fraud-links").textContent = "";
            document.getElementById("fraud-emails").textContent = "";
        }
    }

    // Añadir evento para mostrar la información del banco al seleccionar
    fraudBankSelect.addEventListener("change", showBankFraudInfo);

    // Resto de funciones (displayProducts, populateBanks, etc.) se mantiene igual
});
function showBankFraudInfo() {
    const fraudInfo = document.getElementById('fraud-info');
    const fraudBank = document.getElementById('fraud-bank').value;
    fraudInfo.style.display = fraudBank ? 'block' : 'none';
}
