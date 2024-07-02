const ruta= require("express").Router(); //Contiene las rutas
const UsuarioClase= require("../clases/UsuarioClase");
const UsuarioBD= require("../bd/UsuarioBD");
ruta.get("/" ,async(req, res)=>{
    const usuariobd=new UsuarioBD();
    var usuarios=await usuariobd.mostrarUsuarios();
    var usuariosCorrectos=[];
    usuarios.forEach(usuario =>{
        const usuario1 = new UsuarioClase(usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined ){
            usuariosCorrectos.push(usuario1.obtenerDatos);
        }
        
    })
    //console.log(usuarios.data);
res.render("mostrarUsuarios",{usuariosCorrectos});
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.post("/agregarUsuario",(req,res)=>{

console.log(req.body);
const usuario1=new UsuarioClase(req.body);
if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
    const usuariobd= new UsuarioBD();
    usuariobd.nuevoUsuario(usuario1.obtenerDatos);
    res.render("mostrarDatos", usuario1.obtenerDatos);
}
else{
    res.render("error");
}
});
ruta.get("/editarUsuario/:id", async(req, res)=>{

    const usuariobd= new UsuarioBD();
const [[usuario]]=await usuariobd.buscarUsuarioPorId(req.params.id);
console.log(usuario);
res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario", async(req, res)=>{
const usuariobd= new UsuarioBD();
const usuario1= new UsuarioClase(req.body);
if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
await usuariobd.editarUsuario(req.body);
res.redirect("/");
}
else{
res.render("error");
}
});
ruta.get("/borrarUsuario/:id", async(req,res)=>{
    const usuariobd= new UsuarioBD();
    usuariobd.borrarUsuario(req.params.id);
    res.redirect("/");
})

module.exports=ruta;