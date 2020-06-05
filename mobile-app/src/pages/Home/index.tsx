import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import useApiIBGe from "../../services/apiIBGE";

const Home = () => {
    const navigation = useNavigation();
    const apiIBGE = useApiIBGe();
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    function handleNavigationToPoints() {
        navigation.navigate("Points", {
            uf: selectedUf,
            city: selectedCity,
        });
    }

    function loadUF() {
        apiIBGE.findAllUF().then((response) => {
            const initUFs = response.data.map((uf) => uf.sigla);
            setUfs(initUFs);
        });
    }
    function loadCity(uf: string) {
        apiIBGE.findAllCityByUF(uf).then((response) => {
            const initCities = response.data.map((city) => city.nome);
            setCities(initCities);
        });
    }

    const handleSelectUF = (uf: string) => {
        setSelectedUf(uf);
    };

    const handleSelectCity = (city: string) => {
        setSelectedCity(city);
    };

    useEffect(() => {
        loadUF();
    }, []);

    useEffect(() => {
        loadCity(selectedUf);
    }, [selectedUf]);

    return (
        <ImageBackground
            source={require("../../assets/home-background.png")}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require("../../assets/logo.png")} />
                <Text style={styles.title}>
                    Seu marketplace de coleta de resíduos.
                </Text>
                <Text style={styles.description}>
                    Ajudamos pessoas a encontrarem pontos de coleta de forma
                    eficiente.
                </Text>
            </View>

            <View style={styles.footer}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value: string) => handleSelectUF(value)}
                    placeholder={{ label: "Selecione um Estado", value: null }}
                    items={ufs.map((uf) => ({
                        label: uf,
                        value: uf,
                    }))}
                />
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value: string) => handleSelectCity(value)}
                    placeholder={{ label: "Selecione uma Cidade", value: null }}
                    items={cities.map((city) => ({
                        label: city,
                        value: city,
                    }))}
                />
                <RectButton
                    style={styles.button}
                    onPress={handleNavigationToPoints}
                >
                    <View style={styles.buttonIcon}>
                        <Icon name="arrow-right" color="#FFF" size={24} />
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        color: "#322153",
        fontSize: 32,
        fontFamily: "Ubuntu_700Bold",
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: "#6C6C80",
        fontSize: 16,
        marginTop: 16,
        fontFamily: "Roboto_400Regular",
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#34CB79",
        height: 60,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 20,
        right: 10,
    },
    placeholder: {
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default Home;
