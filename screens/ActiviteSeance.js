import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ActiviteSeance = () => {
    const route = useRoute();
    const { seance } = route.params;
    const navigation = useNavigation();
    const [seances, setSeances] = useState([]);
    const [loadingSeances, setLoadingSeances] = useState(true);

    useEffect(() => {
        const fetchSeances = async () => {
            try {
                const response = await fetch(
                    `https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Seance_sport&action=displayOne&id_seance=${seance.id_seance}`
                );
                const data = await response.json();
                console.log("Données de la séance :", data); // Vérifiez la structure de l'API ici

                // Vérifiez si la réponse contient bien les informations de la séance
                if (data && data.seance) {
                    setSeances([data.seance]); // Mettez les données sous forme de tableau
                } else {
                    console.warn("Aucune donnée de séance trouvée.");
                }
            } catch (error) {
                console.error('Erreur lors du chargement des séances:', error);
            } finally {
                setLoadingSeances(false);
            }
        };

        if (seance && seance.id_seance) {
            fetchSeances();
        }

        navigation.setOptions({ headerTitle: seance.activite });
    }, [seance, navigation]);


    const handleDelete = async () => {
        try {
            const response = await fetch(
                `https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Seance_sport&action=delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_seance: seance.id_seance }),
                }
            );
    
            const result = await response.json();
            if (response.ok) {
                Alert.alert("Succès", result.message);
                navigation.goBack();
            } else {
                Alert.alert("Erreur", result.error || "Impossible de supprimer la séance.");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la suppression.");
        }
    };
    

    const handleEdit = () => {
        navigation.navigate('EditSeance', { seance });
    };

    if (loadingSeances) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {seances.length > 0 ? (
                seances.map((seanceItem) => (
                    <View key={seanceItem.id_seance} style={styles.seanceCard}>
                        <Text style={styles.seanceTitle}>{seanceItem.activite}</Text>
                        <Text style={styles.seanceText}>Durée: {seanceItem.duree} minutes</Text>
                        <Text style={styles.seanceText}>Date: {seanceItem.date_seance}</Text>
                        <Text style={styles.seanceText}>Commentaire: {seanceItem.commentaire}</Text>
                        <Text style={styles.seanceText}>ID Activité: {seanceItem.id_activite}</Text>

                        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                            <Text style={styles.buttonText}>Modifier</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={styles.noSeanceText}>Aucune séance disponible</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8E8E8E',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c2c2c',
    },
    seanceCard: {
        backgroundColor: '#333333',
        padding: 24,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    seanceTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    infoBlock: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 8,
        minWidth: '28%',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    seanceText: {
        fontSize: 18,
        color: '#ccc',
        marginBottom: 12,
        textAlign: 'center',
    },
    noSeanceText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginTop: 30,
        backgroundColor: '#444',
        borderRadius: 12,
        padding: 20,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    editButton: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginLeft: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ActiviteSeance;
