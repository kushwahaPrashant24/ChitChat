
import { Route, Routes } from "react-router-dom";
import Signinform from "./_Auth/Form/Signinform";
import Signupform from "./_Auth/Form/Signupform";
import AuthLayout from "./_Auth/AuthLayout";
import RootLayout from "./Root/RootLayout";
import './index.css'
import { Home } from "./Root/Pages";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Signinform />} />
          <Route path="/sign-up" element={<Signupform />} />
        </Route>
 
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
