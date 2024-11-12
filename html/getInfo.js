const PUERTO = '3000';
const HOST = `http://localhost:${PUERTO}/`;
const URL_BANKS = 'banks';
const URL_PRODS = 'financial-products';
const URL_CATS = 'categories';

export const getBanks = async () => {
    try {
        const resp = await fetch(`${HOST}${URL_BANKS}`);
        return await resp.json();
    } catch (error) {
        console.error('Error at getBanks:', error);
        return error;
    }
}

export const getBankById = async (id) => {
    try {
        const resp = await fetch(`${HOST}${URL_BANKS}/${id}`);
        return await resp.json();
    } catch (error) {
        console.error('Error at getBankById:', error);
        return error;
    }
}

export const getFinancialProducts = async () => {
    try {
        const resp = await fetch(`${HOST}${URL_PRODS}`);
        return await resp.json();
    } catch (error) {
        console.error('Error at getProducts:', error);
        return error;
    }
}

export const getFinancialProductById = async (id) => {
    try {
        const resp = await fetch(`${HOST}${URL_PRODS}/${id}`);
        return await resp.json();
    } catch (error) {
        console.error('Error at getProductById:', error);
        return error;
    }
}

export const getCategoriesProducts = async () => {
    try {
        const resp = await fetch(`${HOST}${URL_CATS}`);
        return await resp.json();
    } catch (error) {
        console.error('Error at getCategoriesProducts:', error);
        return error;
    }
}