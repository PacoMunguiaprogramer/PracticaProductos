const ConectarBD= require("./ConexionBD");

class UsuarioBD extends ConectarBD{
constructor(){
    super();
}
async nuevoUsuario(usuario){
    const sql="INSERT INTO usuarios VALUES(null, '"+usuario.nombre+"', '"+usuario.celular+"', '"+usuario.correo+"')";
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
async mostrarUsuarios(){
    const sql="SELECT * FROM usuarios";
    var usuarioBD;

    try {
        await this.conectarMySql();
       [usuarioBD]= await this.conexion.execute(sql);
//console.log(usuarioBD);
       await this.cerrarConexion();
        return usuarioBD;
    } catch (error) {
        console.error("Error al recuperar los datos de usuarios" + error);
        console.error(sql);
    }
}
async buscarUsuarioPorId(idUsuario){
    const sql="SELECT * FROM usuarios where idusuarios="+idUsuario+";";
    try {
        await this.conectarMySql();
const usuario=await this.conexion.execute(sql);
        await this.cerrarConexion();
        console.log("Usuario seleccionado correctamente");
return usuario;
    } catch (error) {
        console.log("Error al recuperar el usuario"+error);
        console.error(sql);
    }
}

async editarUsuario(usuario){
//const sql="UPDATE usuarios set nombre='"+usuario.nombre+"',celular='"+usuario.celular+"correo='"+usuario.correo+"';";
const sql2=`UPDATE usuarios SET nombre="${usuario.nombre}",
celular=${usuario.celular}, correo="${usuario.correo}" where idusuarios=${usuario.idusuario};`

try {
    await this.conectarMySql();
    const usuario=await this.conexion.execute(sql2);
            await this.cerrarConexion();
            console.log("Usuario seleccionado correctamente");
    
} catch (error) {
    console.error("Error al editar usuario"+error);
    console.error(sql2);
}
}
async borrarUsuario(idusuario){
    const sql="DELETE FROM usuarios WHERE idusuarios = "+idusuario+";";
    try {
        await this.conectarMySql();
        await this.conexion.execute(sql);
        await this.cerrarConexion();
    } catch (error) {
        console.error("Error al borrar el usuario"+ error);
        console.error(sql);
    }
}
}
module.exports=UsuarioBD;

