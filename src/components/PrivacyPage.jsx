// src/components/PrivacyPage.jsx
import React from "react";

const PrivacyPage = () => {
  return (
    <main className="bg-[#F6F0DD] py-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#124948] mb-4">
          Política de tratamiento de datos personales
        </h1>

        <p className="text-xs text-[#124948]/70 mb-6">
          Última actualización: {new Date().toLocaleDateString("es-CO")}
        </p>

        <div className="space-y-4 text-sm md:text-base text-[#244D4B] leading-relaxed">
          {/* ENCABEZADO */}
          <p>
            Esta política describe cómo 40+ – Cuarentamas.com trata los datos
            personales de sus usuarios, clientes y visitantes, de conformidad
            con la normativa colombiana sobre protección de datos personales.
          </p>

          {/* 1. IDENTIFICACIÓN DEL RESPONSABLE */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            1. Identificación del Responsable
          </h2>
          <p>
            <strong>Razón social:</strong> Zentia Healthcare Group
            <br />
            <strong>NIT:</strong> 901977632
            <br />
            <strong>Domicilio:</strong> Bogotá D.C., Colombia
            <br />
            <strong>Correo electrónico:</strong>{" "}
            <a
              href="mailto:contacto@cuarentamas.com"
              className="text-[#EB632F] underline-offset-2 hover:underline"
            >
              contacto@cuarentamas.com
            </a>
            <br />
            <strong>Sitio web:</strong>{" "}
            <a
              href="https://www.cuarentamas.com"
              className="text-[#EB632F] underline-offset-2 hover:underline"
            >
              www.cuarentamas.com
            </a>
          </p>
          <p>
            En adelante, <strong>“40+”</strong>.
          </p>

          {/* 2. FINALIDAD DEL TRATAMIENTO */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            2. Finalidad del Tratamiento de Datos
          </h2>
          <p>40+ recolecta y trata datos personales para:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Procesar pedidos y despachos de Colágeno Hidrolizado 40+.</li>
            <li>Gestionar pagos electrónicos.</li>
            <li>Enviar confirmaciones de compra y seguimiento de envío.</li>
            <li>Brindar atención al cliente.</li>
            <li>
              Enviar información comercial, promociones, tips, recetas, e-books
              y contenido de bienestar (previa autorización).
            </li>
            <li>Cumplimiento de obligaciones legales y fiscales.</li>
            <li>
              Realizar análisis estadístico y mejorar la experiencia de usuario.
            </li>
          </ul>
          <p>
            <strong>
              No recolectamos datos sensibles relacionados con salud clínica o
              diagnósticos médicos.
            </strong>
          </p>

          {/* 3. DATOS QUE RECOLECTAMOS */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            3. Datos que Recolectamos
          </h2>
          <p>Podemos recolectar, entre otros, los siguientes datos personales:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nombre y apellidos.</li>
            <li>Documento de identidad (cuando aplique).</li>
            <li>Dirección de envío.</li>
            <li>Teléfono.</li>
            <li>Correo electrónico.</li>
            <li>
              Información de pago (procesada por pasarelas seguras; 40+ no
              almacena datos de tarjetas).
            </li>
          </ul>

          {/* 4. DERECHOS DEL TITULAR */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            4. Derechos del Titular
          </h2>
          <p>
            El titular de los datos personales tiene derecho a, entre otros:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Conocer, actualizar y rectificar sus datos personales.</li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Revocar la autorización y/o solicitar la supresión del dato.</li>
            <li>Acceder de forma gratuita a sus datos personales.</li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio
              (SIC) por infracciones a la normativa de protección de datos.
            </li>
          </ul>
          <p>
            Las solicitudes relacionadas con estos derechos pueden enviarse al
            correo:{" "}
            <a
              href="mailto:contacto@cuarentamas.com"
              className="text-[#EB632F] underline-offset-2 hover:underline"
            >
              contacto@cuarentamas.com
            </a>
            .
          </p>
          <p className="mt-2">
            <strong>Tiempos de respuesta:</strong>
            <br />
            Consultas: máximo 10 días hábiles.
            <br />
            Reclamos: máximo 15 días hábiles.
          </p>

          {/* 5. SEGURIDAD DE LA INFORMACIÓN */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            5. Seguridad de la Información
          </h2>
          <p>
            40+ adopta medidas técnicas, humanas y administrativas razonables
            para proteger los datos personales contra pérdida, uso indebido,
            alteración, acceso o divulgación no autorizada.
          </p>

          {/* 6. VIGENCIA */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            6. Vigencia
          </h2>
          <p>
            La información permanecerá almacenada mientras exista una relación
            comercial, contractual o legal que lo justifique, y/o mientras sea
            necesario para las finalidades descritas en esta política, sin
            perjuicio de los plazos de conservación exigidos por la ley
            aplicable.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
