import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
        <Navbar />
      </main>
      <Footer />
    </>
  );
}
