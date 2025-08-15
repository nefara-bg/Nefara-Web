import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Hero from "./components/Hero/Hero"
import Services from "./components/Services/Services"

const Home = () => {
    return (
        <>
            <Hero />
            <Services />
            <About />
            <Contact />
        </>
    )
}

export default Home