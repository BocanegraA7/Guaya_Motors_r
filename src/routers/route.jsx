import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function Browser(){
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<Information />}></Route>
            <Route path="/services" element={<Servicios />}></Route>
            <Route path="/contact" element={<Contacto />}></Route>
        </Routes>    
    );
}