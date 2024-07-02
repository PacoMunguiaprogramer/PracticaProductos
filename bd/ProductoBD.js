const ConectarBD= require("./ConexionBD");

class ProductoBD extends ConectarBD{
constructor(){
    super();
}
async nuevoProducto(producto){
    const sql="INSERT INTO productos VALUES(null, '"+producto.nombre+"', '"+producto.cantidad+"', '"+producto.precio+"', '"+producto.codprod+"')";
try {
    await this.conectarMySql();
    await this.conexion.execute(sql);
    await this.cerrarConexion();
    console.log("Dato insertado a Mysql");
} catch (error) {
    console.error("Error al ingresar el dato"+ error);
    console.error(sql);

}
}
async mostrarProductos(){
    const sql="SELECT * FROM productos";
    var ProductoBD;

    try {
        await this.conectarMySql();
       [ProductoBD]= await this.conexion.execute(sql);
//console.log(usuarioBD);
       await this.cerrarConexion();
        return ProductoBD;
    } catch (error) {
        console.error("Error al recuperar los datos de productos" + error);
        console.error(sql);
    }
}
async buscarProductoPorId(idProducto){
    const sql="SELECT * FROM productos where idproducto="+idProducto;
    try {
        await this.conectarMySql();
const producto=await this.conexion.execute(sql);
        await this.cerrarConexion();
        console.log("Producto seleccionado correctamente");
return producto;
    } catch (error) {
        console.log("Error al recuperar el producto"+error);
        console.error(sql);
    }
}

async editarProducto(producto){
//const sql="UPDATE usuarios set nombre='"+usuario.nombre+"',celular='"+usuario.celular+"correo='"+usuario.correo+"';";
const sql2=`UPDATE productos SET nombre="${producto.nombre}",
cantidad=${producto.cantidad}, precio="${producto.precio}" where idproducto=${producto.idproducto} `

try {
    await this.conectarMySql();
    const producto=await this.conexion.execute(sql2);
            await this.cerrarConexion();
            console.log("Producto seleccionado correctamente");
    
} catch (error) {
    console.error("Error al editar producto"+error);
    console.error(sql2);
}
}
async borrarProducto(idproducto){
    const sql="DELETE FROM productos WHERE idproducto="+idproducto;
    try {
        await this.conectarMySql();
        await this.conexion.execute(sql);
        await this.cerrarConexion();
    } catch (error) {
        console.error("Error al borrar el producto"+ error);
        console.error(sql);
    }
}
}
module.exports=ProductoBD;

