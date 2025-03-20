import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const SeanceActivite = () => {
  const route = useRoute();
  const { seance } = route.params;
  const navigation = useNavigation();
  const [seances, setSeances] = useState([]);
  const [loadingSeances, setLoadingSeances] = useState(true);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const response = await fetch(`https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Seance_sport&action=displayActivitiesBySeance&id_activite=${seance.id_activite}`);
        const data = await response.json();
        if (data && data.activites) {
          setSeances(data.activites);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des séances:', error);
      } finally {
        setLoadingSeances(false);
      }
    };

    if (seance && seance.id_activite) {
      fetchSeances();
    }
    navigation.setOptions({ headerTitle: seance.nom_activite });
  }, [seance, navigation]);

  // Fonction pour la suppression de la séance (à personnaliser avec ton API)
  const handleDelete = async () => {
    try {
      const requestBody = {
        id_activite: seance.id_activite, // Envoyer l'id de l'activité dans le corps de la requête
      };
  
      const response = await fetch(
        `https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Activite_sport&action=delete&id_activite=${seance.id_activite}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', // On précise que le corps de la requête est en JSON
          },
          body: JSON.stringify(requestBody), // On envoie l'objet avec l'id_activite en JSON
        }
      );
  
      const responseData = await response.json(); // On récupère la réponse en JSON
  
      if (response.ok && responseData.message) {
        Alert.alert("Succès", responseData.message); // Affichage du message de succès retourné par l'API
        navigation.goBack(); // Revenir à la page précédente
      } else {
        Alert.alert("Erreur", responseData.error || "La suppression a échoué");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la suppression.");
    }
  };
  
  // Fonction pour la modification de la séance
  const handleEdit = () => {
    // Naviguer vers la page de modification (par exemple, EditSeance) avec l'ID de la séance
    navigation.navigate('EditActivite', { seance });
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
            <Text style={styles.seanceDate}>{seanceItem.date_seance} - {seanceItem.duree} min</Text>
            <Text style={styles.seanceCommentaire}>{seanceItem.commentaire}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noSeanceText}>Aucune séance disponible</Text>
      )}

      {/* Bloc avec les boutons Supprimer et Modifier */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Supprimer la séance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Modifier la séance</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#f5f5f5',
  },
  seanceCard: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  seanceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  seanceDate: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  seanceCommentaire: {
    fontSize: 14,
    color: '#555',
  },
  noSeanceText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    width: '80%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeanceActivite;
