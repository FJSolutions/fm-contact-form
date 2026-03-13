import { Toaster } from 'sonner';
import { Footer } from "./components/footer.tsx";
import { ContactForm } from "./pages/contact-form.tsx";

export function App() {

   return (
      <>
         <main>
            <ContactForm/>
            <Toaster position="top-center" toastOptions={{
               classNames: {
                  toast: "toast",
                  title: "toast-title",
                  description: "toast-description",
                  icon: "toast-icon",
               }
            }}/>
         </main>
         <Footer/>
      </>
   )
}
