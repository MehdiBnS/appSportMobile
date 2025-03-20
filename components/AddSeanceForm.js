import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import axios from 'axios';

const AddSeanceForm = ({ onSubmit }) => {
    const [nomSeance, setNomSeance] = useState('');
    const [activites, setActivites] = useState([]);
    const [selectedActivite, setSelectedActivite] = useState(null);
    const [duree, setDuree] = useState('');
    const [dateSeance, setDateSeance] = useState('');
    const [commentaire, setCommentaire] = useState('');

    // Récupération des activités depuis l'API
    useEffect(() => {
        const fetchActivites = async () => {
            try {
                const response = await axios.get('https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Activite_sport&action=displayAll');
                

                if (response.data && Array.isArray(response.data)) {
                    const activitesData = response.data.map((activite, index) => ({
                        key: activite.id_activite || index,
                        label: activite.nom_activite || `Activité ${index + 1}`,
                    }));

                    setActivites(activitesData);
                } else {
                    console.error("Aucune activité trouvée ou structure incorrecte.");
                }
            } catch (error) {
                console.error("Erreur lors du chargement des activités", error);
            }
        };

        fetchActivites();
    }, []);

    const handleSubmit = async () => {
        if (!nomSeance || !selectedActivite || !duree || !dateSeance) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        const newSeance = {
            activite: nomSeance,         // Nom de la séance (varchar)
            duree: parseInt(duree),      // Durée (int)
            date_seance: dateSeance,     // Date (date)
            commentaire: commentaire,    // Commentaire (text)
            id_activite: parseInt(selectedActivite), // ID de l'activité (int)
        };

        try {
            const response = await axios.post(
                'https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Seance_sport&action=add',
                newSeance
            );

            if (response.data && response.data.success) {
                Alert.alert("Succès", "Séance créée !");
                
                // Appeler la fonction onSubmit pour rafraîchir ou traiter l'ajout de la séance
                onSubmit(newSeance);

                // Vider les champs du formulaire
                setNomSeance('');
                setSelectedActivite(null);
                setDuree('');
                setDateSeance('');
                setCommentaire('');
            } else {
                Alert.alert("Erreur", "Erreur lors de l'ajout de la séance.");
                console.error("Erreur API :", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la séance", error);
            Alert.alert("Erreur", "Impossible d'ajouter la séance.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nom de la séance :</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom de la séance"
                value={nomSeance}
                onChangeText={setNomSeance}
            />

            <Text style={styles.label}>Activité :</Text>
            <ModalSelector
                data={activites}
                initValue="Sélectionner une activité"
                onChange={(option) => setSelectedActivite(option.key)}
                style={styles.picker}
                selectStyle={styles.select}
                selectTextStyle={styles.selectText}
            >
                <Text style={styles.selectedText}>
                    {selectedActivite ? activites.find(a => a.key === selectedActivite)?.label : "Sélectionner une activité"}
                </Text>
            </ModalSelector>

            <Text style={styles.label}>Durée (minutes) :</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Durée"
                value={duree}
                onChangeText={setDuree}
            />

            <Text style={styles.label}>Date de la séance :</Text>
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={dateSeance}
                onChangeText={setDateSeance}
            />

            <Text style={styles.label}>Commentaire :</Text>
            <TextInput
                style={styles.input}
                placeholder="Ajouter un commentaire"
                value={commentaire}
                onChangeText={setCommentaire}
            />

            <Button title="Ajouter la séance" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#333333', // Gris anthracite
        borderRadius: 8,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#aaa', // Gris clair pour la bordure
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#fff',
    },
    picker: {
        marginBottom: 15,
    },
    select: {
        borderColor: '#aaa', // Gris clair pour la bordure
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#444', // Fond du select
    },
    selectText: {
        fontSize: 16,
        color: '#fff', // Texte blanc dans le sélecteur
    },
    selectedText: {
        fontSize: 16,
        color: '#fff', // Texte sélectionné en blanc
    },
});

export default AddSeanceForm;
