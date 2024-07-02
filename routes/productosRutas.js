const ruta= require("express").Router(); //Contiene las rutas
const ProductoClase= require("../clases/ProductoClase");
const ProductoBD= require("../bd/ProductoBD");
ruta.get("/" ,async(req, res)=>{
    const productobd=new ProductoBD();
    var producto=await productobd.mostrarProductos();
    var productosCorrectos=[];
    producto.forEach(producto =>{
        const producto1 = new ProductoClase(producto);
        if(producto1.nombre!=undefined && producto1.cantidad!=undefined && producto1.precio!=undefined && producto1.codprod!=undefined ){
            productosCorrectos.push(producto1.obtenerDatos);
        }
        
    })
    //console.log(usuarios.data);
res.render("mostrarProductos",{productosCorrectos});
});

ruta.get("/agregarProducto",(req,res)=>{
    res.render("formulario");
});

ruta.post("/agregarProducto",(req,res)=>{
console.log(req.body);
const producto1=new ProductoClase(req.body);
if(producto1.nombre!=undefined && producto1.cantidad!=undefined && producto1.precio!=undefined && producto1.codprod!=undefined){
    const productobd= new ProductoBD();
    productobd.nuevoProducto(producto1.obtenerDatos);
    res.render("mostrarDatos", producto1.obtenerDatos);
}
else{
    res.render("error");
}
});
ruta.get("/editarProducto/:id", async(req, res)=>{

    const productobd= new ProductoBD();
const [[producto]]=await productobd.buscarProductoPorId(req.params.id);
console.log(producto);
res.render("editarProducto",producto);
});

ruta.post("/editarProducto", async(req, res)=>{
const productobd= new ProductoBD();
const producto1= new ProductoClase(req.body);
if(producto1.nombre!=undefined && producto1.cantidad!=undefined && producto1.precio!=undefined){
await productobd.editarProducto(req.body);
res.redirect("/");
}
else{
res.render("error");
}
});
ruta.get("/borrarProducto/:idproducto", async(req,res)=>{
    const productobd= new ProductoBD();
    productobd.borrarProducto(req.params.idproducto);
})

module.exports=ruta;