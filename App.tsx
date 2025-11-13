import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity, ImageBackground  } from 'react-native';

import { MenuItem } from './type';
import AddItem from './AddItem';
import Filter from './Filter';

// Main App component
export default function App() {

  // Track which screen is currently active
  const [screen, setScreen] = useState<'welcome' | 'menu' | 'add' | 'filter'>('welcome');

   // Store the full list of menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Tomato Soup',
      description: 'Fresh tomato and basil starter',
      course: 'Starter',
      price: 45,
    },
    {
      id: '2',
      name: 'Grilled Salmon',
      description: 'Served with lemon butter sauce',
      course: 'Main',
      price: 120,
    },
    {
      id: '3',
      name: 'Chocolate Mousse',
      description: 'Rich and creamy dessert',
      course: 'Dessert',
      price: 60,
    },
  ]);

   // Function to remove an item by its ID
  const removeItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Function to calculate average price per course
const getAveragePrices = () => {
    const grouped: { [key: string]: number[] } = {};

    // Group prices by course type
    menuItems.forEach(item => {
      if (!grouped[item.course]) grouped[item.course] = [];
      grouped[item.course].push(item.price);
    });
    
    // Calculate average for each course
    const averages: { [key: string]: string } = {};
    Object.keys(grouped).forEach(course => {
      const prices = grouped[course];
      const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
      averages[course] = `R${avg.toFixed(2)}`;
    });

    return averages;
  };

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      // Background image for the welcome screen
      <ImageBackground
         source={{uri: 'https://i.pinimg.com/736x/7f/90/65/7f90654ba899eff1d0813c386037980d.jpg'}}
         style={styles.background}
         resizeMode="cover"
      >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Silver Spoon by Christoffel</Text>
        <Text style={styles.subtitle}>Your luxury 5-star restaurant experience — right on your screen.</Text>

        {/* Button to enter the main menu screen */}
        <TouchableOpacity style={styles.enterButton} onPress={() => setScreen('menu')}>
         <Text style={styles.enterButtonText}>Explore our menu</Text>
        </TouchableOpacity>

      </View>
      </ImageBackground>
    );
  }
    // AddItem Screen
  if (screen === 'add') {
    return (
      <View style={styles.container}>
        <AddItem menuItems={menuItems} setMenuItems={setMenuItems}/>

        <TouchableOpacity style={styles.backButton} onPress={() => setScreen('menu')}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

   //Filter Screen
  if (screen === 'filter') {
    return (
      <View style={styles.container}>
        <Filter menuItems={menuItems}/>
        
      <TouchableOpacity style={styles.backButton} onPress={() => setScreen('menu')}>
         <Text style={styles.backButtonText}>Back to Menu</Text>
      </TouchableOpacity>

      </View>
    );
  }

  return (
    //Default Screen: Menu Manager
    <View style={styles.container}>
      <Text style={styles.homeTitle}>Chef Christoffel's Menu</Text>
      <Text>Total Items: {menuItems.length}</Text>

      {/* List of all menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.course} - R{item.price.toFixed(2)}</Text>
            
            {/* Button to remove menu item */}
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>

          </View>
        )}
      />

      {/* Display average price per course */}
      <View style={styles.averageBox}>
        <Text style={styles.averageHeader}>Average Price per Course:</Text>
        {Object.entries(getAveragePrices()).map(([course, avg]) => (
          <Text key={course} style={styles.averageText}>{course}: {avg}</Text>
        ))}
      </View>

       {/* Button to go to Add Item screen */}
      <TouchableOpacity style={styles.addButton} onPress={() => setScreen('add')}>
       <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>

      {/* Button to go to Filter screen */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setScreen('filter')}>
        <Text style={styles.filterButtonText}>Filter Menu</Text>
      </TouchableOpacity>

    </View>
  );
}

// styles for welcome screen and menu manager
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: "#d2e6d0ff"},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: "#ffffff" },
  subtitle: { fontSize: 16, marginBottom: 20, color: "#ffffff" },
  homeTitle: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 10
  },
  card: {
    backgroundColor: '#e4fbfcff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: { fontWeight: 'bold', fontSize: 16 },

  background: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

overlay: {
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // optional dark overlay
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
},

 averageBox: {
    marginTop: 20,
  },
  averageHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  averageText: {
    fontSize: 14,
  },

enterButton: {
  backgroundColor: '#2555be',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 6,
  marginTop: 20,
},
enterButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},


  backButton: {
  backgroundColor: "#85abe4ff",
  paddingVertical: 14, 
  paddingHorizontal: 40, 
  borderRadius: 30,
  alignItems: 'center',
  marginVertical: 8,
},
backButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
  removeButton: {
  backgroundColor: '#c6282865', // your original color
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 6,
  alignItems: 'center',
  marginTop: 8,
},
removeButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},
  addButton: {
  backgroundColor: '#2555be65', // your original color
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
filterButton: {
  backgroundColor: '#3620b465', // your original color
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 6,
  alignItems: 'center',
  marginVertical: 8,
},
filterButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
});




//CODE ATTRIBUTION
//TITLE: Navigating Between Screens
//AUTHOR: React Native
//Date:11/11/2025
//AVALIABLE: https://reactnative.dev/docs/navigation

//CODE ATTRIBUTION
//TITLE:  Style
//AUTHOR: React Native
//Date:10/11/2025
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