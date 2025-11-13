import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem, CourseType } from './type';
import { TouchableOpacity, ImageBackground  } from 'react-native';


type Props = {
  menuItems: MenuItem[]; // current list of menu items
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;  // function to update the list
};

export default function AddItem({ menuItems, setMenuItems }: Props) {

  //State to store user input for each field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<CourseType>('Starter');
  const [price, setPrice] = useState('');

  // Function to handle adding a new item
  const handleAdd = () => {

    // This is to validate input: all fields must be filled, and price must be a number
    if (!name || !description || !price || isNaN(Number(price))) {
      Alert.alert('Please fill in all fields with valid data.');
      return;
    }

    // Create a new menu item object
    const newItem: MenuItem = {
      id: `item-${menuItems.length + 1}`, // generate a simple unique ID
      name,
      description,
      course,
      price: parseFloat(price),
    };

    // Add the new item to the list
    setMenuItems(prev => [...prev, newItem]);

    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  return (
    // Background image for the AddItem screen
    <ImageBackground
      source={{uri: 'https://i.pinimg.com/1200x/00/b9/68/00b96842342cbc847e8433b7f97343da.jpg'}}
      style={styles.background}
      resizeMode="cover"
    >

      {/* Overlay to make content readable over the image */}
     <View style={styles.overlay}>
      <Text style={styles.header}>Add New Menu Item</Text>

      {/* Input for dish name */}
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />

      {/* Input for dish description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Picker to select course type */}
      <Text style={styles.label}>Course Type</Text>
      <Picker
        selectedValue={course}
        onValueChange={(value) => setCourse(value as CourseType)}
        style={styles.picker}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      {/* Input for price */}
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric" // Ensures a numeric keyboard appears for user input
      />

      {/* Button to add the item */}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
       <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
     </View>
    </ImageBackground>
  );
}

// Styles for the layout and design of the entire AddItem Screen
const styles = StyleSheet.create({
 background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },

  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  label: { fontSize: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  addButton: {
  backgroundColor: '#2c3e50', // or any color you want
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 6,
  alignItems: 'center',
  marginVertical: 8,
},
addButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
});


//CODE ATTRIBUTION
//TITLE: <SaveButton>
//AUTHOR: Marmelab
//Date:11/11/2025
//AVALIABLE: https://marmelab.com/react-admin/SaveButton.html

//CODE ATTRIBUTION
//TITLE: Navigating Between Screens
//AUTHOR: React Native
//Date:10/11/2025
//AVALIABLE: https://reactnative.dev/docs/navigation

//CODE ATTRIBUTION
//TITLE:  Style
//AUTHOR: React Native
//Date:12/11/2025
//AVALIABLE: https://reactnative.dev/docs/style

//CODE ATTRIBUTION
//TITLE:  Catering food hd 8k wallpaper stock photographic image | Premium AI-generated image
//AUTHOR: FreePik
//Date:11/11/2025
//AVALIABLE: https://i.pinimg.com/1200x/00/b9/68/00b96842342cbc847e8433b7f97343da.jpg

//CODE ATTRIBUTION
//TITLE:  The IIE Mobile App Scripting MAST5112/p/w MODULE MANUAL 2025
//AUTHOR: The Independant Institute of Education
//Date:10/11/2025
//AVALIABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true