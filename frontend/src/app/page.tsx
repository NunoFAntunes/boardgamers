import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShadcnDemo from "@/components/ShadcnDemo";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
        <ShadcnDemo />
        <Navbar />
      </main>
      <Footer />
    </>
  );
}
