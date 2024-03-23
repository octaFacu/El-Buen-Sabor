import { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import logoImage from "../../assets/logo.png";
import { ProyeccionDatosFactura } from "../../context/interfaces/Proyecciones/ProyeccionDatosFactura";
import { pedidoService } from "../../services/PedidoService";
import { format, parseISO } from "date-fns";
import { ProyeccionProductosPedido } from "../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario";
import { styles } from "../PDF/Estilos";
import { GlobalContext, useUnidadContext } from "../../context/GlobalContext";
interface Props {
  pedido_Id: number;
  esEnvio: boolean;
}

export default function PdfFactura({ pedido_Id, esEnvio }: Props) {
  const { rol } = useUnidadContext();
  const [datosFactura, setDatosFactura] = useState<ProyeccionDatosFactura>();
  const [datosProductosPedido, setDatosProductosPedido] =
    useState<ProyeccionProductosPedido[]>();

  const servicio = new pedidoService();
  const getDatos = async () => {
    const traerdatos = await servicio.getDatosFacturas(pedido_Id,rol);
    const traerDatosProductos = await servicio.getProductosPedido(
      pedido_Id,
      rol
    );
    setDatosFactura(traerdatos);
    setDatosProductosPedido(traerDatosProductos);
  };

  useEffect(() => {
    getDatos();
    console.log(pedido_Id);
  }, []);

  const formatearFecha = () => {
    if (datosFactura && datosFactura.fecha_pedido) {
      const fechaParseada = parseISO(datosFactura.fecha_pedido); // Parsear la cadena de fecha
      return format(fechaParseada, "dd/MM/yyyy HH:mm:ss");
    } else {
      return "";
    }
  };
  const precioTotal = datosProductosPedido?.reduce((total, producto) => {
    return total + producto.precio_total * producto.cantidad;
  }, 0) || 0; 
  
  const conDesc = precioTotal - (precioTotal * 0.1);

  const formateoNumeroFactura = () => {
    const numeroFormateado = datosFactura?.numero_factura
      .toString()
      .padStart(4, "0"); // agrego 0 al numero de la factura segun la cantidad de digitos que tiene
    return numeroFormateado;
  };

  const myDocumento = (
    <Document>
      <Page size="A4" style={styles.pagina}>
        <View>
          <Text>
            #{datosFactura?.tipo}-{formateoNumeroFactura()}
            {datosFactura?.id}-{datosFactura?.numero_pedido_dia}
          </Text>
        </View>
        <View style={styles.seccion}>
          <View style={styles.logoContainer}>
            <Image src={logoImage} style={styles.logo} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cliente:</Text>
            <Text style={styles.datos}>
              {datosFactura?.nombre + " " + datosFactura?.apellido}{" "}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.datos}>{formatearFecha()}</Text>
          </View>
        </View>
        <View style={styles.seccion}>
          <Text style={styles.cabecera}>Detalle</Text>
          <View style={styles.row}>
            <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
              <Text style={styles.label}>Descripción</Text>
              {datosProductosPedido?.map((productos) => (
                <Text style={styles.datos}>{productos.denominacion}</Text>
              ))}
            </View>
            <View style={{ flex: 1, alignItems: "center", marginRight: 5 }}>
              <Text style={styles.label}>Cantidad</Text>
              {datosProductosPedido?.map((productos) => (
                <Text style={styles.datos}>{productos.cantidad}</Text>
              ))}
            </View>
            <View style={{ flex: 1, alignItems: "center", marginLeft: 50 }}>
              <Text style={styles.label}>Precio</Text>
              {datosProductosPedido?.map((productos) => (
                <Text style={styles.datos}>
                  ${productos.precio_total * productos.cantidad}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.seccion}>
          <View style={styles.row}>
            <Text style={styles.label}>Total: ${precioTotal}</Text>
          </View>
          {!(esEnvio) && <Text>
                total con descuento por retiro en local: ${conDesc}
              </Text>}
        </View>
        <View>
          <Text>Gracias por su compra! disfrute su comida</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <PDFDownloadLink
        document={myDocumento}
        fileName="Factura-BuenSabor"
        className="btn modal-pedido"
      >
        Ver Factura
      </PDFDownloadLink>
    </div>
  );
}
