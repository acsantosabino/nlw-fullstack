import { LeafletMouseEvent } from "leaflet";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Dropzone from "../../components/Dropzone";
import api from "../../services/api";
import apiIBGE from "../../services/apiIBGE";
import "./styles.css";

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const CreatePoint = () => {
    const [itens, setItens] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
        0,
        0,
    ]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
    });
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selecedFile, setSelecedFile] = useState<File>();

    const { findAllUF, findAllCityByUF } = apiIBGE();
    const history = useHistory();
    const loadUF = () =>
        findAllUF().then((response) => {
            const initUFs = response.data.map((uf) => uf.sigla);
            setUfs(initUFs);
        });
    const loadCity = (uf: string) =>
        findAllCityByUF(uf).then((response) => {
            const initCities = response.data.map((city) => city.nome);
            setCities(initCities);
        });
    const loadInitiaPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectUF = (event: ChangeEvent<HTMLSelectElement>) => {
        const uf = event.target.value;
        setSelectedUf(uf);
    };

    const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        setSelectedCity(city);
    };

    const handleClickMap = (event: LeafletMouseEvent) => {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    };

    const handleSelectedItem = (id: number) => {
        let newSelectedItems: number[] = [];
        const alreadySelected = selectedItems.findIndex((item) => item === id);
        if (alreadySelected >= 0) {
            newSelectedItems = selectedItems.filter((item) => item != id);
        } else {
            newSelectedItems = [...selectedItems, id];
        }
        setSelectedItems(newSelectedItems);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("whatsapp", whatsapp);
        data.append("uf", uf);
        data.append("city", city);
        data.append("latitude", String(latitude));
        data.append("longitude", String(longitude));
        data.append("items", items.join(","));

        if (selecedFile) {
            data.append("image", selecedFile);
        }

        await api.post("/points", data);

        alert("Ponto de coleta criado");
        history.push("/");
    };

    useEffect(() => {
        api.get("items").then((response) => {
            setItens(response.data);
        });
        loadUF();
        loadInitiaPosition();
    }, []);

    useEffect(() => {
        loadCity(selectedUf);
    }, [selectedUf]);

    return (
        <div id="page-create-point">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para a home
                    </Link>
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <h1>
                            Cadastro do <br /> ponto de coleta
                        </h1>

                        <Dropzone onFileUploaded={setSelecedFile} />

                        <fieldset>
                            <legend>
                                <h2>Dados</h2>
                            </legend>
                            <div className="field">
                                <label htmlFor="name">Nome da entidade</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="whatsapp">Whatsapp</label>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        id="whatsapp"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>
                                <h2>Endereço</h2>
                                <span>Selecione o endereço no mapa</span>
                            </legend>
                            <Map
                                center={initialPosition}
                                zoom={15}
                                onClick={handleClickMap}
                            >
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={selectedPosition} />
                            </Map>
                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="uf">Estado</label>
                                    <select
                                        name="uf"
                                        id="uf"
                                        value={selectedUf}
                                        onChange={handleSelectUF}
                                    >
                                        <option value="0">
                                            Selecione uma UF
                                        </option>
                                        {ufs.map((uf) => (
                                            <option key={uf} value={uf}>
                                                {uf}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field">
                                    <label htmlFor="city">Cidade</label>
                                    <select
                                        name="city"
                                        id="city"
                                        value={selectedCity}
                                        onChange={handleSelectCity}
                                    >
                                        <option value="0">
                                            Selecione uma Cidade
                                        </option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>
                                <h2>Ítens de coleta</h2>
                                <span>Selecione um ou mais itens abaixo</span>
                            </legend>
                            <ul className="items-grid">
                                {itens.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() =>
                                            handleSelectedItem(item.id)
                                        }
                                        className={
                                            selectedItems.includes(item.id)
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                        />
                                        <span>{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </fieldset>

                        <button type="submit">Cadastar ponto de coleta</button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default CreatePoint;
