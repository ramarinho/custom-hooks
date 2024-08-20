import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    const { data, isLoading, hasError, error } = state;

    useEffect(() => {
        getFetch();
    }, [url])

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }

    const getFetch = async () => {

        if (localCache[url]) {

            console.log('Usando caché');

            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });

            return;
        }

        setLoadingState();

        const resp = await fetch(url);

        // sleep
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            })
        }

        const data = await resp.json();

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })

        localCache[url] = data;
    }

    return {
        data,
        isLoading,
        hasError,
    }
}
