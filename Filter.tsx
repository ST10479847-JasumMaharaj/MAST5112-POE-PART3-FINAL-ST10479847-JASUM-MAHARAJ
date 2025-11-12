import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem, CourseType } from './type';

type Props = {
  menuItems: MenuItem[];
};

export default function Filter({ menuItems }: Props) {
  const [selectedCourse, setSelectedCourse] = useState<CourseType>('Starter');
  const [results, setResults] = useState<MenuItem[]>([]);

  const handleFilter = () => {
    const filtered = menuItems.filter(item => item.course === selectedCourse);
    setResults(filtered);
  };

  return (
    <ImageBackground
      source={{uri:'https://i.pinimg.com/1200x/b0/ee/d0/b0eed0c4f247b1ca91c1551a56a3c5eb.jpg'}}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Filter by Course Type</Text>

        <Picker
          selectedValue={selectedCourse}
          onValueChange={(value) => setSelectedCourse(value as CourseType)}
          style={styles.picker}
        >
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main" value="Main" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>

        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
          <Text style={styles.filterButtonText}>Apply Filter</Text>
        </TouchableOpacity>

        <FlatList
          data={results}
          keyExtractor={item => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>
                {item.name} - R{item.price.toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    flex: 1,
    marginTop: 60,
    marginBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  picker: {
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: '#3620b4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    elevation: 2,
  },
  resultText: {
    fontSize: 15,
  },
});


//CODE ATTRIBUTION
//TITLE: <SaveButton>
//AUTHOR: Marmelab
//Date:22/10/2025
//AVALIABLE: https://marmelab.com/react-admin/SaveButton.html

//CODE ATTRIBUTION
//TITLE: Navigating Between Screens
//AUTHOR: React Native
//Date:22/10/2025
//AVALIABLE: https://reactnative.dev/docs/navigation

//CODE ATTRIBUTION
//TITLE:  Style
//AUTHOR: React Native
//Date:22/10/2025
//AVALIABLE: https://reactnative.dev/docs/style

//CODE ATTRIBUTION
//TITLE:  Catering food hd 8k wallpaper stock photographic image | Premium AI-generated image
//AUTHOR: FreePik
//Date:22/10/2025
//AVALIABLE: https://za.pinterest.com/pin/341007003059471977/

//CODE ATTRIBUTION
//TITLE:  The IIE Mobile App Scripting MAST5112/p/w MODULE MANUAL 2025
//AUTHOR: The Independant Institute of Education
//Date:22/10/2025
//AVALIABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true