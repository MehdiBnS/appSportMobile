import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditSeance = () => {
    const route = useRoute();
    const { seance } = route.params;
    const navigation = useNavigation();

    const [activite, setActivite] = useState(seance.activite);
    const [duree, setDuree] = useState(String(seance.duree));
    const [dateSeance, setDateSeance] = useState(seance.date_seance);
    const [commentaire, setCommentaire] = useState(seance.commentaire);
    const [idActivite, setIdActivite] = useState(seance.id_activite);

    const [activites, setActivites] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Récupération des activités
    useEffect(() => {
        const fetchActivites = async () => {
            try {
                const response = await fetch(
                    `https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Activite_sport&action=displayAll`
                );
                const data = await response.json();
                if (response.ok) {
                    setActivites(data);
                } else {
                    console.warn("Erreur lors du chargement des activités.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des activités:", error);
            }
        };

        fetchActivites();
    }, []);

    // Mise à jour de la séance
    const handleUpdate = async () => {
        try {
            const response = await fetch(
                `https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Seance_sport&action=update&id_seance=${seance.id_seance}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_seance: seance.id_seance,
                        activite,
                        duree: parseInt(duree, 10),
                        date_seance: dateSeance,
                        commentaire,
                        id_activite: idActivite,
                    }),
                }
            );

            const result = await response.json();
            if (response.ok) {
                Alert.alert("Succès", "Séance mise à jour avec succès !");
                navigation.goBack();
            } else {
                Alert.alert("Erreur", result.error || "La mise à jour a échoué.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour.");
        }
    };

    // Sélectionner une activité
    const selectActivite = (activiteItem) => {
        setIdActivite(activiteItem.id_activite);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier la Séance</Text>

            {/* Champ pour la saisie manuelle de l'activité */}
            <TextInput
                style={styles.input}
                placeholder="Nom de l'activité"
                value={activite}
                onChangeText={setActivite}
            />

            {/* Champ cliquable pour ouvrir la modal de sélection d'ID d'activité */}
            <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
                <Text style={styles.inputText}>
                    {idActivite ? `ID Activité : ${idActivite}` : 'Sélectionner un ID d\'activité'}
                </Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Durée (en minutes)"
                value={duree}
                onChangeText={setDuree}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Date (AAAA-MM-JJ)"
                value={dateSeance}
                onChangeText={setDateSeance}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Commentaire"
                value={commentaire}
                onChangeText={setCommentaire}
                multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Enregistrer les modifications</Text>
            </TouchableOpacity>

            {/* Modal pour la sélection de l'ID d'activité */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sélectionner un ID d'activité</Text>
                        <FlatList
                            data={activites}
                            keyExtractor={(item) => item.id_activite.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.activiteItem} onPress={() => selectActivite(item)}>
                                    <Text style={styles.activiteText}>{`ID: ${item.id_activite} - ${item.nom_activite}`}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c2c2c',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#444',
        color: '#fff',
        fontSize: 18,
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    inputText: {
        color: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#2c2c2c',
        padding: 20,
        borderRadius: 12,
        width: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    activiteItem: {
        padding: 12,
        backgroundColor: '#444',
        borderRadius: 8,
        marginBottom: 8,
    },
    activiteText: {
        color: '#fff',
        fontSize: 18,
    },
    closeButton: {
        backgroundColor: '#e74c3c',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EditSeance;
