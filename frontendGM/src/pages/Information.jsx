import Navbar from '../components/Navbar/Navbar'
import '../styles/information.css'

function Datos(props){
    return (
        <section className="info-card">
            <h2>{props.title}</h2> <br />
            <p>{props.description}</p> <br />
        </section>
    )
}

function Targets(props){
    return (<section className="info-card">
        <h2>{props.title}</h2>
        <ul className="lista-objetivos">
            <ListItems item="Brindar asesoría personalizada en cada proyecto de modificaciones."/>
            <ListItems item="Garantizar el uso de repuestos y accesorios de marcas líderes."/>
            <ListItems item="Reducir los tiempos de entrega sin comprometer la seguridad mecánica."/>
            <ListItems item="Fomentar la comunidad 'custom' mediante eventos y talleres."/>
        </ul>
    </section>)
}

function ListItems(props){
    return (
        <li>{props.item}</li>
    )
}

function Header(props){
    return (
        <header>
            <div className="logo-container">
                <img src={props.path} alt="Logo Guaya Motors" class="logo" />
                <h1>GUAYA MOTORS</h1>
            </div>
        </header>
    )
}

function Footer(){
    return (
        <footer>
                <p>&copy; 2024 Guaya Motors. Todos los derechos reservados.</p>
        </footer>
    )
}

function Information(){
    return (
        <>
        <Navbar />
        <Header path="./media/Img. GuayaMotors.png"/>    
        <main className="container">
            <Datos title="Nuestra Misión" description=" Transformar la pasión por las dos ruedas en piezas únicas de diseño y
                estética, brindando modificaciones de alta calidad que reflejen la
                identidad propia de cada cliente en su moto."/>

            <Datos title="Nuestra Visión" description="Ser el taller de referencia y preferencia en personalización de motos
                para el 2030, liderando la cultura 'custom' con innovacion tecnica y
                un estilo inigualable."/>

            < Targets/>

        </main>
        <Footer/>        
        </>
        
    )
}

export default Information