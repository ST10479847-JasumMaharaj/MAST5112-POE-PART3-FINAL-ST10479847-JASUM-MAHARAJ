// Define the allowed course types
export type CourseType = 'Starter' | 'Main' | 'Dessert';

// Define the structure of a menu item
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
}

// Define navigation routes for type-safe screen transitions
export type RootStackParamList = {
    MenuManager: undefined;
  AddItem: undefined;
  Filter: undefined;
};