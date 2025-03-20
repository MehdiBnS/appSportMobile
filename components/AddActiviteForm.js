import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AddActiviteForm = ({ onSubmit }) => {
    const [nomActivite, setNomActivite] = useState('');
    const [descriptionActivite, setDescriptionActivite] = useState('');

    // Fonction pour soumettre le formulaire
    const handleSubmit = async () => {
        if (!nomActivite || !descriptionActivite) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        const newActivite = {          
            nom_activite: nomActivite,          // Nom de l'activité
            description_activite: descriptionActivite, // Description de l'activité
        };

        try {
            const response = await axios.post(
                'https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Activite_sport&action=add', 
                newActivite
            );

            if (response.data && response.data.success) {
                Alert.alert("Succès", "Activité ajoutée !");
                
                // Appeler la fonction onSubmit pour rafraîchir ou traiter l'ajout de l'activité
                onSubmit(newActivite);

                // Vider les champs du formulaire après soumission
                setNomActivite('');
                setDescriptionActivite('');
            } else {
                Alert.alert("Erreur", "Erreur lors de l'ajout de l'activité.");
                console.error("Erreur API :", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'activité", error);
            Alert.alert("Erreur", "Impossible d'ajouter l'activité.");
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Nom de l'activité :</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom de l'activité"
                value={nomActivite}
                onChangeText={setNomActivite}
            />

            <Text style={styles.label}>Description de l'activité :</Text>
            <TextInput
                style={[styles.input, { height: 80 }]} // Augmenter la hauteur pour une description plus longue
                placeholder="Description de l'activité"
                value={descriptionActivite}
                onChangeText={setDescriptionActivite}
                multiline
            />

            <Button title="Ajouter l'activité" onPress={handleSubmit} />
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
});

export default AddActiviteForm;
