import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ActiviteItem from '../components/ActiviteItem';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour l'icône de switch

const SeanceListScreen = () => {
  const [activite, setActivite] = useState([]); // Données des activités
  const [seance, setSeance] = useState([]); // Données des séances
  const [FilteredActivite, setFilteredActivite] = useState([]); // Activités filtrées
  const [FilteredSeance, setFilteredSeance] = useState([]); // Séances filtrées
  const [searchText, setSearchText] = useState('');
  const [isActivitesView, setIsActivitesView] = useState(true); // état pour basculer entre les vues

  useEffect(() => {
    // Charger les activités
    axios
      .get(
        'https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Activite_sport&action=displayAll' // API des activités
      )
      .then((response) => {
        setActivite(response.data);
        setFilteredActivite(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des activités :', error);
      });

    // Charger les séances
    axios
      .get(
        'https://www.cefii-developpements.fr/mehdi1444/apiReactNative/public/index.php?controller=Seance_sport&action=displayAll' // API des séances
      )
      .then((response) => {
        setSeance(response.data);
        setFilteredSeance(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des séances :', error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (isActivitesView) {
      // Filtrer les activités
      const filtered = activite.filter((activites) =>
        activites.nom_activite.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredActivite(filtered);
    } else {
      // Filtrer les séances
      const filtered = seance.filter((seances) =>
        seances.activite.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSeance(filtered);
    }
  };

  const handleSwitchView = () => {
    setIsActivitesView(!isActivitesView); // Change la vue
  };

  return (
    <ImageBackground source={require('../assets/background.jpeg')} resizeMode='cover' style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Liste des {isActivitesView ? 'activités' : 'séances'}</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch}
        />

        <FlatList
          data={isActivitesView ? FilteredActivite : FilteredSeance} // Afficher les activités ou séances filtrées selon l'état
          keyExtractor={(item) => (isActivitesView ? item.id_activite : item.id_seance).toString()} // Utiliser l'ID de l'élément correspondant
          renderItem={({ item }) => <ActiviteItem item={item} isActivitesView={isActivitesView} />} // Afficher les éléments avec ActiviteItem
        />

        {/* Bouton de switch en bas */}
        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchView}>
          <Icon name="swap-horizontal" size={30} color="gold" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 70,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#333',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  switchButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 50,
  },
});

export default SeanceListScreen;
