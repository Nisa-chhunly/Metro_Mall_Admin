import AppRouter from "./router/AppRouter";
import { ContactProvider } from "./components/ContactContext";
function App() {
    return(
    <ContactProvider>
        <AppRouter />
    </ContactProvider>
    );
}

export default App;