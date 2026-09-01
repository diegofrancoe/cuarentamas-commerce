import { businessInfo } from "../config/businessInfo.js";

const identity = `${businessInfo.legalName}, NIT ${businessInfo.nit}, con domicilio en ${businessInfo.address}`;

export const legalPages = {
  "/terminos-y-condiciones": {
    eyebrow: "Información legal",
    title: "Términos y condiciones",
    intro:
      "Estas condiciones regulan el uso de cuarentamas.com y las solicitudes de compra realizadas a través del sitio.",
    sections: [
      {
        title: "1. Identificación del proveedor",
        paragraphs: [
          `${identity}. Puedes contactarnos en ${businessInfo.email} o ${businessInfo.phoneDisplay}.`,
        ],
      },
      {
        title: "2. Información del producto",
        paragraphs: [
          "Presentamos las características, contenido, forma de uso, precio y disponibilidad del producto de manera clara. Las imágenes buscan representar fielmente el empaque; pueden existir variaciones menores de color según la pantalla.",
          "La información de bienestar no sustituye una recomendación médica ni autoriza usos diferentes a los indicados en el empaque y la documentación sanitaria aplicable.",
        ],
      },
      {
        title: "3. Precios, pedidos y pago",
        paragraphs: [
          "Los precios se muestran en pesos colombianos e incluyen los impuestos indicados. Los costos de envío se presentan antes de finalizar la solicitud.",
          "Actualmente el sitio prepara el pedido y continúa la atención por WhatsApp. El pedido queda confirmado únicamente cuando 40+ valida disponibilidad, datos de entrega y forma de pago con el cliente.",
        ],
      },
      {
        title: "4. Disponibilidad y entrega",
        paragraphs: [
          "La disponibilidad puede cambiar antes de la confirmación del pedido. Si un producto no está disponible, informaremos al cliente y no se exigirá el pago correspondiente.",
          "El envío cuesta $6.000 en Bogotá y $16.000 para el resto de Colombia. Después del despacho enviaremos por WhatsApp la guía con la transportadora, el número de seguimiento y el tiempo estimado de llegada.",
          "Consulta la política de envíos, cambios y devoluciones para conocer el proceso completo.",
        ],
      },
      {
        title: "5. Retracto, garantía y reversión",
        paragraphs: [
          "Las solicitudes de retracto, garantía, devolución o reversión de pago se atenderán conforme al Estatuto del Consumidor colombiano y a las excepciones legalmente aplicables a productos de consumo.",
          "Para proteger la seguridad del producto, no se aceptan devoluciones de empaques abiertos o alterados, salvo que exista un defecto de calidad, error en el despacho u otra causa protegida por la ley.",
        ],
      },
      {
        title: "6. Uso del sitio y propiedad intelectual",
        paragraphs: [
          "Los textos, fotografías, ilustraciones, logotipos y demás contenidos pertenecen a 40+ o se utilizan con autorización. No pueden reproducirse con fines comerciales sin permiso previo.",
          "El usuario se compromete a suministrar información veraz y a no utilizar el sitio para actividades fraudulentas o que afecten su funcionamiento.",
        ],
      },
      {
        title: "7. Datos personales y contacto",
        paragraphs: [
          `El tratamiento de datos se rige por nuestra Política de tratamiento de datos personales. Para preguntas, quejas o reclamos escribe a ${businessInfo.email}.`,
        ],
      },
    ],
  },
  "/politica-de-datos": {
    eyebrow: "Privacidad",
    title: "Política de tratamiento de datos",
    intro:
      "Explicamos qué datos recopilamos, para qué los usamos y cómo puedes ejercer tus derechos.",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        paragraphs: [
          `${identity}. Canal de privacidad: ${businessInfo.email}. Teléfono: ${businessInfo.phoneDisplay}.`,
        ],
      },
      {
        title: "2. Datos que podemos recopilar",
        paragraphs: [
          "Nombre, correo electrónico, teléfono, ciudad, dirección de entrega, información del pedido, mensajes, experiencias compartidas, autorizaciones otorgadas y datos técnicos básicos necesarios para la seguridad y funcionamiento del sitio.",
          "No solicitamos datos sensibles a través de los formularios públicos. Evita incluir información médica o clínica en los campos de texto libre.",
        ],
      },
      {
        title: "3. Finalidades",
        paragraphs: [
          "Atender solicitudes y pedidos; coordinar pagos y entregas; responder consultas; enviar el e-book solicitado; gestionar garantías y servicio al cliente; prevenir fraude; cumplir obligaciones legales; y, cuando exista autorización, medir el uso del sitio y realizar comunicaciones comerciales.",
          "Una experiencia o testimonio solo podrá publicarse cuando el titular otorgue una autorización separada y expresa para esa finalidad.",
        ],
      },
      {
        title: "4. Encargados y terceros",
        paragraphs: [
          "Podemos compartir la información estrictamente necesaria con proveedores de alojamiento, mensajería, comercio electrónico, automatización, correo, transportadoras y autoridades cuando exista obligación legal.",
          "Exigimos a los proveedores tratar los datos únicamente para la finalidad contratada y aplicar medidas razonables de seguridad.",
        ],
      },
      {
        title: "5. Derechos del titular",
        paragraphs: [
          "Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos; pedir prueba de la autorización; conocer el uso dado a la información; presentar quejas ante la Superintendencia de Industria y Comercio; y revocar la autorización cuando sea procedente.",
        ],
      },
      {
        title: "6. Cómo ejercer tus derechos",
        paragraphs: [
          `Envía tu solicitud a ${businessInfo.email} indicando nombre, identificación suficiente para validar la titularidad, descripción de la solicitud y un canal de respuesta. Atenderemos consultas y reclamos dentro de los términos legales aplicables.`,
        ],
      },
      {
        title: "7. Conservación y seguridad",
        paragraphs: [
          "Conservamos los datos durante el tiempo necesario para cumplir las finalidades informadas, obligaciones contractuales y deberes legales. Aplicamos controles razonables para reducir riesgos de acceso, pérdida, alteración o divulgación no autorizada.",
        ],
      },
    ],
  },
  "/envios-cambios-y-devoluciones": {
    eyebrow: "Tu pedido",
    title: "Envíos, cambios y devoluciones",
    intro:
      "Condiciones generales aplicables a los pedidos de Colágeno Hidrolizado 40+ en Colombia.",
    sections: [
      {
        title: "Cobertura y costo de envío",
        paragraphs: [
          "Realizamos envíos a Bogotá y al resto de Colombia. El envío cuesta $6.000 para direcciones en Bogotá y $16.000 para los demás destinos del país. El valor correspondiente se muestra en el resumen antes de continuar el pedido por WhatsApp.",
        ],
      },
      {
        title: "Despacho, guía y tiempo de llegada",
        paragraphs: [
          "Cuando el pedido sea despachado, enviaremos por WhatsApp la guía de transporte. Allí se informarán la transportadora, el número de guía, la forma de hacer seguimiento y el tiempo estimado de llegada para el destino indicado.",
          "El tiempo de llegada se cuenta desde el despacho y puede cambiar por el destino, la operación de la transportadora, novedades viales, fuerza mayor o información de entrega incorrecta. El cliente debe suministrar una dirección y un teléfono válidos.",
          "Si detectas retraso, pérdida o novedad en el paquete, comunícate con nosotros para iniciar el seguimiento correspondiente.",
        ],
      },
      {
        title: "Producto incorrecto, incompleto o averiado",
        paragraphs: [
          `Repórtalo lo antes posible a ${businessInfo.email} o ${businessInfo.phoneDisplay}, adjuntando número de pedido, fotografías del empaque y una descripción de la novedad.`,
          "Cuando el error sea atribuible a 40+ o exista un defecto de calidad, coordinaremos la solución sin trasladar al consumidor costos que legalmente no le correspondan.",
        ],
      },
      {
        title: "Retracto y devoluciones",
        paragraphs: [
          `Cuando el derecho de retracto sea legalmente procedente, puedes solicitarlo por WhatsApp o en ${businessInfo.email} dentro de los cinco (5) días hábiles siguientes a la entrega. El producto deberá devolverse sin abrir, sin usar, con sus sellos y empaque original en buen estado.`,
          "En un retracto, el consumidor asume el costo de devolución cuando así lo establece la ley. Los productos abiertos o alterados no pueden ponerse nuevamente en circulación, salvo reclamaciones por calidad, seguridad, error en el despacho o garantías aplicables.",
        ],
      },
      {
        title: "Garantía legal",
        paragraphs: [
          `La garantía legal comienza con la entrega. Si encuentras un problema de calidad, idoneidad o seguridad, comunícalo por WhatsApp o a ${businessInfo.email}, indicando el número de pedido y adjuntando fotografías o videos que permitan revisar el caso.`,
          "Responderemos la reclamación dentro de los quince (15) días hábiles siguientes a su recepción. Cuando la novedad sea atribuible al producto o a 40+, asumiremos los costos que legalmente nos correspondan y coordinaremos la solución aplicable.",
        ],
      },
      {
        title: "Reversión del pago",
        paragraphs: [
          "Cuando se utilicen medios electrónicos de pago, la reversión podrá solicitarse en los eventos previstos por la ley, como fraude, operación no solicitada, producto no recibido, distinto al solicitado o defectuoso.",
          "La solicitud deberá presentarse dentro de los cinco (5) días hábiles siguientes a la fecha en que el consumidor conoció el hecho que la origina, conforme a los requisitos legales aplicables.",
        ],
      },
    ],
  },
};
