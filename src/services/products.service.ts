import axios, { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { formatPrice } from "../utils";

const BASE_URL = `https://api.mercadolibre.com`

type ErrorAttr = AxiosError<{
    code: string;
    error: boolean;
    message: string;
}>;

type ProductsMap = {
    id: string,
    title: string,
    price: {
        currency: string,
        amount: string,
    },
    picture: string,
    condition: string,
    free_shipping: boolean
}

type Product = {
    id: string,
    title: string,
    currency_id: string,
    price: string,
    thumbnail: string
    condition: string
    shipping: {
        free_shipping: boolean
    },
}

type ProductsReponse = {
    results: Array<Product>,
    filters: [
        {
            values: [{
                path_from_root: [{ name: string; }]
            }]
        }
    ]
}

type ProductsMapReturn = {
    items: Array<ProductsMap>
    categories: Array<string>
}

export const useGetProducts = (query: string): UseQueryResult<ProductsMapReturn, ErrorAttr> => {
    return useQuery(
        ["products", query],
        async () => {
            const { data } = await axios.get<ProductsReponse>(
                `${BASE_URL}/sites/MCO/search?q=${query}&limit=4`
            )

            const parseReponse = data.results.map<ProductsMap>(product => ({
                id: product.id,
                title: product.title,
                price: {
                    amount: `$ ${formatPrice(product.price)}`,
                    currency: product.currency_id
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping,
            }))

            const categories = data.filters[0].values[0].path_from_root.map(category => category.name)

            return { items: parseReponse, categories }

        }, {
        enabled: !!query
    }
    )
}

type Picture = {
    url: string
}

type ProductReponse = {
    id: string,
    title: string,
    currency_id: string,
    price: string,
    thumbnail: string
    pictures: Array<Picture>
    condition: string
    permalink: string
    free_shipping: boolean
    description: Array<string>
}

type ProductMap = {
    id: string,
    title: string,
    price: {
        currency: string,
        amount: string,
    },
    picture: string,
    condition: string,
    free_shipping: boolean,
    description: string
    url: string
}

type ProductDescription = {
    plain_text: string
}

export const useGetProduct = (id: string): UseQueryResult<ProductMap, ErrorAttr> => {
    return useQuery(
        ["product", id],
        async () => {
            const { data } = await axios.get<ProductReponse>(
                `${BASE_URL}/items/${id}`
            )

            const { data: dataDescription } = await axios.get<ProductDescription>(
                `${BASE_URL}/items/${id}/description`
            )

            const parseReponse: ProductMap = {
                id: data.id,
                title: data.title,
                price: {
                    amount: `$ ${formatPrice(data.price)}`,
                    currency: data.currency_id
                },
                picture: data.pictures[0].url,
                condition: data.condition,
                free_shipping: data.free_shipping,
                description: dataDescription.plain_text,
                url: data.permalink
            }

            return parseReponse
        }, {
        enabled: !!id
    }
    )
}
