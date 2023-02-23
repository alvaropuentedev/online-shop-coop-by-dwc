<?php
  header('Content-Type: application/json');
  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  
  $servidor = "localhost";   // Configuración BD
  $basedatos = "coop23";
  $usuario = "coop23";
  $password = "coop23";
  
  // --  Crear la conexión al servidor y ejecutar la consulta.
  $conexion=mysqli_connect($servidor, $usuario, $password) or die(mysqli_error($conexion));
  mysqli_query($conexion,"SET NAMES 'utf8'");
  mysqli_select_db($conexion,$basedatos) or die(mysqli_error($conexion));
 
 
  // --  párametro opción para determinar la select a realizar -------
  if (isset($_GET['opcion'])) $opc=$_GET['opcion'];
  else if (isset($_POST['opcion'])) $opc=$_POST['opcion'];

   // -- parámetros socio para consulta socio registrado (SR) y registrar socio (RS)      
   if (isset($_GET['email'])) $ema=$_GET['email'];
   else if (isset($_POST['email'])) $ema=$_POST['email'];
   if (isset($_GET['password'])) $pas=$_GET['password'];
   else if (isset($_POST['password'])) $pas=$_POST['password'];
   if (isset($_GET['nombre'])) $nom=$_GET['nombre'];
   else if (isset($_POST['nombre'])) $nom=$_POST['nombre'];
   if (isset($_GET['apellidos'])) $ape=$_GET['apellidos'];
   else if (isset($_POST['apellidos'])) $ape=$_POST['apellidos'];
   if (isset($_GET['foto'])) $img=$_GET['foto'];
   else if (isset($_POST['foto'])) $img=$_POST['foto'];
     
  //-- parametros articulo para registrar articulo en venta (RA) y modificar artículo (MA)
  if (isset($_GET['categoria'])) $cat=$_GET['categoria'];
  else if (isset($_POST['categoria'])) $cat=$_POST['categoria'];
  if (isset($_GET['nombre'])) $art=$_GET['nombre'];
  else if (isset($_POST['nombre'])) $art=$_POST['nombre'];
  if (isset($_GET['descripcion'])) $des=$_GET['descripcion'];
  else if (isset($_POST['descripcion'])) $des=$_POST['descripcion'];
  if (isset($_GET['precio'])) $pre=$_GET['precio'];
  else if (isset($_POST['precio'])) $pre=$_POST['precio'];
  if (isset($_GET['imagen'])) $img=$_GET['imagen'];
  else if (isset($_POST['imagen'])) $img=$_POST['imagen'];
  
  if (isset($_GET['vendedor'])) $ven=$_GET['vendedor'];
  else if (isset($_POST['vendedor'])) $ven=$_POST['vendedor'];

  // -- parámetro idarticulo (CA) y (AC)
  if (isset($_GET['idarticulo'])) $ida=$_GET['idarticulo'];
  else if (isset($_POST['idarticulo'])) $ida=$_POST['idarticulo'];

  // -- parámetro idsocio (SC)
  if (isset($_GET['idsocio'])) $ids=$_GET['idsocio'];
  else if (isset($_POST['idsocio'])) $ids=$_POST['idsocio'];


// (SR) = Socio Registrado; (AV) = Articulos en Venta; (TC) = Todas las categorías; 
// (SV) = articulos en Venta del Socio;  (SC) = un Socio Consulta;  (AC) = un Articulo consultao 
if ($opc == "SR" || $opc == "AV" || $opc == "TC" || $opc == "SV" || $opc == "SC" || $opc == "AC" ){
     switch ($opc) {
          case "SR": // Socio Registrado
               $sql="select * from socios where email = '".$ema."' and password = '".$pas."'";
               break;
          case "SC": // Socio Consulta 
               $sql="select * from socios where id = '".$ids."'";
               break;     
          case "AC": // Articulo Consulta
               $sql="select * from articulos where id = '".$ida."'";
               break;
          case "AV": // Articulos en Venta
               $sql="select * from articulos where estado = 'D'";
               break;
          case "TC": // Todas las Categorias
                $sql="select id, nombre from categorias";
                break;  
          case "SV": // Socio artículos en Venta
                     $sql="select * from articulos where vendedor = '".$ids."' order by estado";
                     break;
     }
     $datos=null;
     try{
          $resultados=mysqli_query($conexion, $sql);
          if (mysqli_num_rows($resultados) > 0) {
               while ($fila = mysqli_fetch_array($resultados)) {
                    $datos[] = $fila;
               }
               echo json_encode($datos);
          } else 
               echo "error";
     }catch(Exception $e){
          echo  false;
     }
} else {
     switch ($opc) {
          case "RS": // Registro nuevo Socio
               $archivoImagen = (isset($_FILES['foto'])) ? $_FILES['foto'] : null; // subir el archivo al servidor 
               if ($archivoImagen) {
                    $ruta_destino_archivo = "socios/";
                    $nombre_archivo = $archivoImagen['name'];
                    $nombre_archivo = str_replace(' ', '', $nombre_archivo);
                    if (is_file($ruta_destino_archivo . $nombre_archivo)) {
                         $idunico = time();
                         $nombre_archivo = $idunico . "_" . $nombre_archivo;
                    }
                    $archivo_ok = move_uploaded_file($archivoImagen['tmp_name'], $ruta_destino_archivo . $nombre_archivo);
               }
               else{$nombre_archivo="user.png";}
               $sql = "insert into socios (nombre, apellidos, email, foto, password) 
               values ('".$nom."','".$ape."','".$ema."','".$nombre_archivo."','".$pas."')";
               break;

          case "RA": // Registro Articulo
               $archivoImagen = (isset($_FILES['imagen'])) ? $_FILES['imagen'] : null; // subir el archivo al servidor 
               if ($archivoImagen) {
                    $ruta_destino_archivo = "archivos/";
                    $nombre_archivo = $archivoImagen['name'];
                    $nombre_archivo = str_replace(' ', '', $nombre_archivo);
                    if (is_file($ruta_destino_archivo . $nombre_archivo)) {
                         $idunico = time();
                         $nombre_archivo = $idunico . "_" . $nombre_archivo;
                    }
                    $archivo_ok = move_uploaded_file($archivoImagen['tmp_name'], $ruta_destino_archivo . $nombre_archivo);
               }
               $sql = "insert into articulos (categoria, nombre, descripcion, precio, imagen, vendedor) 
               values ('".$cat."','".$art."','".$des."','".$pre."','".$nombre_archivo."','".$ven."')";
               break;
         
          case "CA": // Compra Artículo (al comprar se cambia el estado de 'D' (disponible) a 'V' (vendido)     
               $sql = "update articulos set estado = 'V' where id = '".$ida."'";
               break;
         
          case "BA": // Borrar Articulo
               $sql = "delete from articulos where id = '".$ida."'";
               break;
         
          case "MA": // Modificar Artículo
               $archivoImagen = (isset($_FILES['imagen'])) ? $_FILES['imagen'] : null; // subir el archivo al servidor 
               if ($archivoImagen) {
                    $ruta_destino_archivo = "archivos/";
                    $nombre_archivo = $archivoImagen['name'];
                    $nombre_archivo = str_replace(' ', '', $nombre_archivo);
                    if (is_file($ruta_destino_archivo . $nombre_archivo)) {
                         $idunico = time();
                         $nombre_archivo = $idunico . "_" . $nombre_archivo;
                    }
                    $archivo_ok = move_uploaded_file($archivoImagen['tmp_name'], $ruta_destino_archivo . $nombre_archivo);
               }else{
                    $nombre_archivo=$img;
               }
               $sql = "update articulos SET categoria='".$cat."', nombre='".$art."', descripcion='".$des ."', imagen='".$nombre_archivo."', precio='".$pre."', estado='D' WHERE id='".$ida."'";
               break;
         
          case "MS": // Modificar Socio
               $archivoImagen = (isset($_FILES['foto'])) ? $_FILES['foto'] : null; // subir el archivo al servidor 
               if ($archivoImagen) {
                    $ruta_destino_archivo = "socios/";
                    $nombre_archivo = $archivoImagen['name'];
                    $nombre_archivo = str_replace(' ', '', $nombre_archivo);
                    if (is_file($ruta_destino_archivo . $nombre_archivo)) {
                         $idunico = time();
                         $nombre_archivo = $idunico . "_" . $nombre_archivo;
                    }
                    $archivo_ok = move_uploaded_file($archivoImagen['tmp_name'], $ruta_destino_archivo . $nombre_archivo);
               }else{
                    $nombre_archivo=$img;
               }
               $sql = "update socios SET nombre='".$nom."', apellidos='".$ape."', email='".$ema."', foto='".$nombre_archivo."', password='".$pas."' WHERE id='".$ids."'";
               break;
     }
     try {
          $resultados=mysqli_query($conexion, $sql);
          if ($resultados == 1) {
               echo "ok";
          } else {
               echo "error";
          };
     } catch (Exception $e) {
          echo false;
     }
}
mysqli_close($conexion); 
?>

