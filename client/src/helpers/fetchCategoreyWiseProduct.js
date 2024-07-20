import SummaryApi from "../common";

const fetchCategoreyWiseProduct = async (categorey) => {
    try {
        const response = await fetch(SummaryApi.categoreyWiseProduct.url, {
            method: SummaryApi.categoreyWiseProduct.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                categorey: categorey,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error("Error fetching category-wise product:", error);
        return { success: false, message: error.message };
    }
};

export default fetchCategoreyWiseProduct;
