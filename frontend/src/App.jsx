import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './store/CartContext';

function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}

export default App;
