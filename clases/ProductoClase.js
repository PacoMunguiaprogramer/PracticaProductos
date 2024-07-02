class Producto{
 constructor(producto){
    this.id=producto.idproducto;
    this.nombre=producto.nombre,
    this.cantidad=producto.cantidad,
    this.precio=producto.precio,
    this.codprod=producto.codprod;
 }   
 set id(id){
    this._id=id;
 }
 set nombre(nombre){
    var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
if(regexNombre.test(nombre)){
    this._nombre=nombre;
}
    
 }
 set cantidad(cantidad){

    this._cantidad=cantidad;

   
 }
 set precio(precio){
    this._precio=precio;
 }
 set codprod(codprod){
    this._codprod=codprod;
 }


get id(){
    return this._id
}
get nombre(){
    return this._nombre;
}
get cantidad(){
    return this._cantidad;
}
get precio(){
    return this._precio;
}
get codprod(){
    return this._codprod;
}

get obtenerDatos(){
    
    return{
    idproducto:this.id,
    nombre:this.nombre,
    cantidad:this.cantidad,
    precio:this.precio,
    codprod:this.codprod,

}

}
}
module.exports=Producto;
