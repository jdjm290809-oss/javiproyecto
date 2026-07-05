const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Leer datos enviados desde formularios HTML
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/formulario")
.then(() => {
    console.log("✅ Conectado a MongoDB");
})
.catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
});

// Esquema de la colección
const contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Modelo
const Contacto = mongoose.model("Contacto", contactoSchema);

// Ruta principal (opcional)
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente.");
});

// Guardar formulario
app.post("/guardar", async (req, res) => {

    console.log("Datos recibidos:");
    console.log(req.body);

    try {

        const nuevoContacto = new Contacto({
            nombre: req.body.nombre,
            correo: req.body.correo,
            mensaje: req.body.mensaje
        });

        await nuevoContacto.save();

        console.log("✅ Opinión guardada en MongoDB");

        res.send(`
            <h2>¡Gracias por tu opinión! 🥖</h2>
            <p>Tu comentario fue guardado correctamente.</p>
            <a href="javascript:history.back()">Volver al formulario</a>
        `);

    } catch (error) {

        console.error(error);

        res.status(500).send("Ocurrió un error al guardar la información.");

    }

});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});