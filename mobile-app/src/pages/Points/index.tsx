import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import useApi, { Item, Point, Query } from "../../services/api";

interface Params {
    uf: string;
    city: string;
}

const Points = () => {
    const route = useRoute();
    const routeParams = route.params as Params;

    const api = useApi();
    const navigation = useNavigation();
    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);

    function loadItems() {
        api.findAllItems().then((response) => setItems(response.data));
    }

    function findPoints(query: Query) {
        api.findPoints(query).then((response) => setPoints(response.data));
    }

    async function loadInitialPosition() {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Oooooooooops...", "Precisamos da sua localização");
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        setInitialPosition([
            location.coords.latitude,
            location.coords.longitude,
        ]);
    }

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigationToDetail(id: number) {
        navigation.navigate("Detail", { point_id: id });
    }

    function handleSelectedItem(id: number) {
        let newSelectedItems: number[] = [];
        const alreadySelected = selectedItems.findIndex((item) => item === id);
        if (alreadySelected >= 0) {
            newSelectedItems = selectedItems.filter((item) => item != id);
        } else {
            newSelectedItems = [...selectedItems, id];
        }
        setSelectedItems(newSelectedItems);
    }

    useEffect(() => {
        loadItems();
        loadInitialPosition();
    }, []);

    useEffect(() => {
        const itemsDefault = [1, 2, 3, 4, 5, 6];
        const query = {
            city: routeParams.city,
            uf: routeParams.uf,
            items: selectedItems.length === 0 ? itemsDefault : selectedItems,
        };
        findPoints(query);
    }, [selectedItems]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={20} color="#34cb79" />
            </TouchableOpacity>
            <Text style={styles.title}>Bem vindo.</Text>
            <Text style={styles.description}>
                Encontre no mapa um ponto de coleta.
            </Text>
            <View style={styles.mapContainer}>
                {initialPosition[0] !== 0 && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                    >
                        {/* <Marker
                            style={styles.mapMarker}
                            coordinate={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                            }}
                        >
                            <FontAwesome name="dot-circle-o" size={20} />
                        </Marker> */}

                        {points.map((point) => (
                            <Marker
                                key={String(point.id)}
                                onPress={() =>
                                    handleNavigationToDetail(point.id)
                                }
                                style={styles.mapMarker}
                                coordinate={{
                                    latitude: point.latitude,
                                    longitude: point.longitude,
                                }}
                            >
                                <View style={styles.mapMarkerContainer}>
                                    <Image
                                        style={styles.mapMarkerImage}
                                        source={{
                                            uri: point.image,
                                        }}
                                    />
                                    <Text style={styles.mapMarkerTitle}>
                                        {point.name}
                                    </Text>
                                </View>
                                <Icon
                                    name="map-pin"
                                    size={20}
                                    color="#34CB79"
                                />
                            </Marker>
                        ))}
                    </MapView>
                )}
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {items.map((item) => (
                        <TouchableOpacity
                            key={String(item.id)}
                            style={[
                                styles.item,
                                selectedItems.includes(item.id)
                                    ? styles.selectedItem
                                    : {},
                            ]}
                            onPress={() => handleSelectedItem(item.id)}
                        >
                            <SvgUri
                                width={42}
                                height={42}
                                uri={item.image_url}
                            />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Points;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        fontSize: 20,
        fontFamily: "Ubuntu_700Bold",
        marginTop: 24,
    },

    description: {
        color: "#6C6C80",
        fontSize: 16,
        marginTop: 4,
        fontFamily: "Roboto_400Regular",
    },

    mapContainer: {
        flex: 1,
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 16,
    },

    map: {
        width: "100%",
        height: "100%",
    },

    mapMarker: {
        width: 90,
        height: 90,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: "#34CB79",
        flexDirection: "column",
        borderRadius: 8,
        overflow: "hidden",
        alignItems: "center",
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: "cover",
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: "Roboto_400Regular",
        color: "#FFF",
        fontSize: 13,
        lineHeight: 23,
    },

    itemsContainer: {
        flexDirection: "row",
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#eee",
        height: 120,
        width: 120,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: "center",
        justifyContent: "space-between",

        textAlign: "center",
    },

    selectedItem: {
        borderColor: "#34CB79",
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: "Roboto_400Regular",
        textAlign: "center",
        fontSize: 13,
    },
});
