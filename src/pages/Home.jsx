import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import About from '../sections/About';
import Contact from '../sections/Contact';

export default function Home() {
    return (
        <main>
            <Hero />
            <Projects />
            <Skills />
            <About />
            <Contact />
        </main>
    );
}
