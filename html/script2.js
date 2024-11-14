import { getBanks, getBankById, getFinancialProductById, getFinancialProducts, getCategoriesProducts } from "./getInfo.js";

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Referencias HTML
     */

    // Filtro productos
    const filterForm = document.querySelector('#filterForm');
    const bankProductsSelect = document.querySelector('#products-bank');
    const categorySelect = document.querySelector('#category');
    const intRateInput = document.querySelector('#interestRate');

    // Productos disponibles
    const productList = document.querySelector('.product-list');

    // Comparar productos
    const comparisonTable = document.querySelector('.comparison-table');
    const compareBtn = document.querySelector('#compareBtn');

    // Informacion Reportes
    const bankInfoRepSelect = document.querySelector('#report-info-bank');
    const reportInfoItem = document.querySelector('#report-info-item');


    /**
     * Estructuras de datos
     */
    const selectedProducts = []; // Array para guardar los productos a comparar
    const selectedProductsId = []; // Array para guardar los productos a comparar
    const decimalAmount = 2;
    let isComparatingCredit = false;
    /**
     * Funciones de Componentes
     */

    /**
     * Genera los elementos producto de la lista de productos.
     * @param {FinancialProduct[]} products 
     */
    const showProducts = (products) => {
        productList.innerHTML = "";
        if(!products) {
            console.log('products empty at showProducts');
            return;
        }
        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = 
                `<img src='${product.image_url}' alt='${product.name}' class='product-image'>
                <h3>${product.name}</h3>
                <p><strong>Banco:</strong> ${product.bank.name}</p>
                <p><strong>Categoría:</strong> ${product.category.name}</p>
                <p><strong>Tasa de Interés:</strong> ${parseFloat(product.interest_rate).toFixed(decimalAmount)}%</p>
                <p><strong>Beneficios:</strong> ${product.benefits}</p>
                <p><strong>Requisitos:</strong> ${product.requirements}</p>
                <p><strong>Seguros:</strong> ${product.insurances}</p>
                <p><strong>Cashback:</strong> ${parseFloat(product.cashback).toFixed(decimalAmount)}%</p>
                <button class='compare-btn' id-product='${product.id}'>Comparar</button>`;
            productList.appendChild(productItem);
        });
    }

    /**
     * Genera las opciones de bancos en el filtro de productos y en la seccion de informacion de reporte.
     * @param {Bank[]} banks 
     */
    const generateBankOptions = (banks) => {
        if(!banks) {
            console.log('banks empty at generateBankOptions');
            return;
        }
        banks.forEach((bank) => {
            const opt1 = document.createElement('option');
            const opt2 = document.createElement('option');
            opt1.value = bank.id;
            opt1.textContent = bank.name;
            opt2.value = bank.id;
            opt2.textContent = bank.name;
            bankProductsSelect.appendChild(opt1);
            bankInfoRepSelect.appendChild(opt2);
        });
    }

    /**
     * Genera las opciones de categorias en el filtro de productos.
     * @param {Category[]} cats 
     */
    const generateCategoryOptions = (cats) => {
        if(!cats) {
            console.log('cats empty at generateCategoryOptions');
            return;
        }
        cats.forEach((cat) => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.name;
            categorySelect.appendChild(opt);
        });
    }

    /**
     * Genera los campos de informacion de reporte del banco seleccionado.
     */
    const showBankInfoReport = async () => {
        reportInfoItem.innerHTML = ''
        reportInfoItem.style.display = 'none';
        if(bankInfoRepSelect.value && bankInfoRepSelect.value!= 'all'){
            const bankSelected = await getBankById(bankInfoRepSelect.value);
            reportInfoItem.innerHTML = 
            `<h3>Información de Contacto</h3>
            <img src='${bankSelected.image_url}' alt='${bankSelected.name}' class='product-image'>
            <p id="bankInfoRep-name">
                <strong>Banco:</strong>
                ${bankSelected.name}</p>
            <p id="bankInfoRep-contact-number">
                <strong>Numero de contacto:</strong>
                ${bankSelected.contact_number}</p>
            <p id="bankInfoRep-branches">
                <strong>Sucursales:</strong>
                ${bankSelected.branches}</p>
            <p id="bankInfoRep-link">
                <strong>Link:</strong>
                <a href="${bankSelected.link}" target="_blank">${bankSelected.link}</a>
                </p>
            <p id="bankInfoRep-email">
                <strong>Email:</strong>
                ${bankSelected.email}</p>`;
            reportInfoItem.style.display = 'block';
        }
    }

    /**
     * Eventos
     */

    /**
     * Submit del formulario de filtro de productos financieros. Filtra los productos 
     * financieros basado en las opciones seleccionadas.
     */
    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const category = categorySelect.value;
        const bank = bankProductsSelect.value;
        const interestRate = parseFloat(intRateInput.value) || 0;
    
        let filteredProducts = await getFinancialProducts();
        filteredProducts = filteredProducts.filter((product) => {
            const categoryMatch = (category == 'all' || product.category.id == category);
            const bankMatch = (bank == 'all' || product.bank.id == bank);
            const interestRateMatch = (product.interest_rate >= interestRate);
            return (categoryMatch && bankMatch && interestRateMatch);
        });
    
        showProducts(filteredProducts);
    });

    /**
     * Agregar/Remover producto a comparar
     */
    productList.addEventListener('click', async (e) => {
        if(e.target.classList.contains('compare-btn')){
            const id = e.target.getAttribute('id-product');
            if(!selectedProductsId.includes(id)){ // Agregar
                if(selectedProductsId.length==2) {
                    alert('Solo se pueden comparar dos productos.');
                    return;
                }
                const product = await getFinancialProductById(id);
                if(selectedProductsId.length == 0) {
                    isComparatingCredit = (product.category.id == 1) ? true : false;
                } else if((isComparatingCredit && product.category.id == 2) || (!isComparatingCredit && product.category.id == 1)){
                    alert('Solo puedes comparar productos de la misma categoria.');
                    return;
                }
                selectedProductsId.push(id);
                selectedProducts.push(product);
                e.target.textContent = 'Dejar de comparar';
            } else{ // Remover
                const idIndex = selectedProductsId.indexOf(id);
                selectedProductsId.splice(idIndex,1);
                selectedProducts.splice(idIndex,1);
                e.target.textContent = 'Comparar';
            }
        }
    });

    /**
     * Agregar detalles de producto a tabla de comparacion.
     */
    compareBtn.addEventListener('click', () => {
        comparisonTable.innerHTML = '';
        if(selectedProductsId.length < 2){
            comparisonTable.innerHTML = '<p>No hay 2 productos seleccionados para comparar.</p>';
            return;
        }
        const idLowerIntRate = (
            selectedProducts[0].interest_rate < selectedProducts[1].interest_rate
            ? selectedProducts[0].id
            : (
                selectedProducts[0].interest_rate > selectedProducts[1].interest_rate
                ? selectedProducts[1].id
                : -1
            )
        );
        const idHigherCashback = (
            selectedProducts[0].cashback > selectedProducts[1].cashback
            ? selectedProducts[0].id
            : (
                selectedProducts[0].cashback < selectedProducts[1].cashback
                ? selectedProducts[1].id
                : -1
            )
        );
        selectedProducts.forEach((product) => {
            const row = document.createElement('div');
            row.className = 'comparison-row';
            row.innerHTML = 
                `
                <img src='${product.image_url}' alt='${product.name}' class='product-image'>
                <h3>${product.name}</h3>
                <p><strong>Banco:</strong> ${product.bank.name}</p>
                <p><strong>Categoría:</strong> ${product.category.name}</p>
                <p><strong>Tasa de Interés:</strong> 
                    <span style="color: ${
                        idLowerIntRate === -1 
                        ? 'inherit'
                        : (product.id === idLowerIntRate ? 'green' : 'red')};
                        font-weight: bold;">
                    ${parseFloat(product.interest_rate).toFixed(decimalAmount)}%
                </p>
                <p><strong>Beneficios:</strong> ${product.benefits}</p>
                <p><strong>Requisitos:</strong> ${product.requirements}</p>
                <p><strong>Seguros:</strong> ${product.insurances}</p>
                <p><strong>Cashback:</strong> 
                    <span style="color: ${
                        idHigherCashback === -1 
                        ? 'inherit'
                        : (product.id === idHigherCashback ? 'green' : 'inherit')};
                        font-weight: bold;">
                    ${parseFloat(product.cashback).toFixed(decimalAmount)}%
                </p>`;
            comparisonTable.appendChild(row);
        });
    })

    /**
     * Cambia la informacion de reporte de banco cuando se cambia la opcion de banco.
     */
    bankInfoRepSelect.addEventListener('change', showBankInfoReport);

    /**
     * Invocacion inicial de funciones para generar contenido
     */
    const inicializacion = async () => {
        generateCategoryOptions(await getCategoriesProducts());
        generateBankOptions(await getBanks());
        showProducts(await getFinancialProducts());
    };

    inicializacion();
});