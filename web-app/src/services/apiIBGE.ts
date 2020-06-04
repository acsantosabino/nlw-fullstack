import axios from "axios";

export interface IBGEUFResponse {
    sigla: string;
}
export interface IBGECityResponse {
    nome: string;
}

const api = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
});

export default () => {
    const findAllUF = () => api.get<IBGEUFResponse[]>("?orderBy=nome");
    const findAllCityByUF = (uf: string) =>
        api.get<IBGECityResponse[]>(`/${uf}/municipios?orderBy=nome`);

    return {
        findAllUF,
        findAllCityByUF,
    };
};
