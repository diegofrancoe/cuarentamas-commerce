// src/components/TermsPage.jsx
import React from "react";

const TermsPage = () => {
  return (
    <main className="bg-[#F6F0DD] py-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#124948] mb-4">
          Términos y condiciones de uso
        </h1>

        <p className="text-xs text-[#124948]/70 mb-6">
          Última actualización: {new Date().toLocaleDateString("es-CO")}
        </p>

        <div className="space-y-4 text-sm md:text-base text-[#244D4B] leading-relaxed">
          <p>
            Estos términos y condiciones regulan el acceso y uso del sitio web{" "}
            <strong>cuarentamas.com – 40+</strong>. Al navegar, registrarte o
            realizar una compra en el sitio, declaras que has leído, entendido y
            aceptas expresamente lo aquí establecido.
          </p>

          {/* 1. ACEPTACIÓN */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            1. Aceptación
          </h2>
          <p>
            El acceso y uso del sitio web implica la{" "}
            <strong>aceptación expresa</strong> de estos términos por parte del
            usuario. Si no estás de acuerdo con ellos, te recomendamos no
            utilizar el sitio ni realizar compras a través de este.
          </p>

          {/* 2. NATURALEZA DEL PRODUCTO */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            2. Naturaleza del producto
          </h2>
          <p>
            <strong>40+</strong> comercializa suplementos alimenticios que:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>No son un medicamento.</li>
            <li>No reemplazan tratamientos médicos.</li>
            <li>No diagnostican, tratan ni curan enfermedades.</li>
            <li>Debe consumirse como complemento alimenticio.</li>
          </ul>
          <p>
            El contenido de este sitio tiene fines informativos y comerciales.
            No constituye diagnóstico médico, ni reemplaza la evaluación,
            tratamiento o recomendaciones de un profesional de la salud. Te
            recomendamos consultar con tu médico antes de iniciar cualquier
            suplementación si tienes condiciones de salud preexistentes.
          </p>

          {/* 3. CONDICIONES DE COMPRA */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            3. Condiciones de compra
          </h2>
          <p>Al realizar una compra en cuarentamas.com, aceptas que:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Todas las compras están sujetas a disponibilidad de producto.</li>
            <li>Los precios están expresados en pesos colombianos (COP).</li>
            <li>El valor incluye IVA cuando aplique.</li>
            <li>
              El pago se realiza mediante pasarelas electrónicas certificadas.
            </li>
          </ul>
          <p>
            40+ se reserva el derecho de rechazar o cancelar pedidos en casos de
            fraude, error en la información suministrada o uso indebido de los
            medios de pago.
          </p>

          {/* 4. ENTREGAS */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            4. Entregas
          </h2>
          <p>En condiciones generales, los tiempos de entrega estimados son:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tiempo estimado: 2 a 5 días hábiles en ciudades principales.</li>
          </ul>
          <p>
            Estos tiempos pueden variar por causas externas a 40+, como
            retrasos de transportadoras, condiciones climáticas, eventos de
            orden público u otras circunstancias ajenas al control de la marca.
          </p>
          <p>
            El cliente debe <strong>verificar el estado del producto</strong> al
            recibirlo y reportar cualquier novedad en un plazo razonable al canal
            de atención al cliente.
          </p>

          {/* 5. PROPIEDAD INTELECTUAL */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            5. Propiedad intelectual
          </h2>
          <p>
            Todo el contenido del sitio web, incluyendo la{" "}
            <strong>marca 40+</strong>, textos, imágenes, gráficos, diseño,
            videos y cualquier otro material, está protegido por normas de{" "}
            <strong>propiedad intelectual</strong>.
          </p>
          <p>
            Su uso, reproducción, distribución o modificación sin autorización
            previa y expresa de 40+ está{" "}
            <strong>estrictamente prohibido</strong>.
          </p>

          {/* 6. USO RESPONSABLE */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            6. Uso responsable
          </h2>
          <p>El usuario se compromete a:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Suministrar información veraz, completa y actualizada.</li>
            <li>No usar el sitio para fines fraudulentos o ilícitos.</li>
            <li>
              No intentar vulnerar la seguridad del sitio ni de las pasarelas de
              pago.
            </li>
            <li>
              No reproducir el contenido del sitio sin la debida autorización.
            </li>
          </ul>

          {/* 7. MODIFICACIONES */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-4">
            7. Modificaciones
          </h2>
          <p>
            40+ podrá <strong>modificar estos términos</strong> en cualquier
            momento, publicando la versión actualizada en el sitio web. El
            uso continuo del sitio después de la publicación de cambios
            implicará la aceptación de los nuevos términos.
          </p>

          {/* POLÍTICA DE DEVOLUCIONES Y GARANTÍAS */}
          <h2 className="text-lg md:text-xl font-semibold text-[#124948] mt-6">
            Política de devoluciones y garantías
          </h2>

          {/* 1. DERECHO DE RETRACTO */}
          <h3 className="text-base md:text-lg font-semibold text-[#124948] mt-3">
            1. Derecho de retracto
          </h3>
          <p>
            Aplica dentro de los cinco (5) días hábiles siguientes a la
            entrega, únicamente si:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>El producto no ha sido abierto.</li>
            <li>El sello de seguridad está intacto.</li>
            <li>El empaque se encuentra en perfecto estado.</li>
          </ul>
          <p>
            No aplica retracto en productos abiertos por tratarse de suplementos
            alimenticios de consumo humano (por razones sanitarias).
          </p>
          <p>
            El cliente debe asumir el costo de envío de la devolución, salvo
            cuando la ley o una falla atribuible a 40+ disponga lo contrario.
          </p>

          {/* 2. GARANTÍA LEGAL */}
          <h3 className="text-base md:text-lg font-semibold text-[#124948] mt-4">
            2. Garantía legal
          </h3>
          <p>La garantía legal aplica si el producto presenta:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Defectos de fabricación.</li>
            <li>Empaque roto al momento de la entrega.</li>
            <li>Error en el producto enviado.</li>
          </ul>
          <p>
            Estos casos deben notificarse dentro de los cinco (5) días hábiles
            siguientes a la entrega, enviando evidencia fotográfica y número de
            pedido al canal de atención de 40+.
          </p>
          <p>40+ evaluará el caso y podrá, según corresponda:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Reponer el producto.</li>
            <li>Devolver el dinero.</li>
            <li>Otorgar un bono para una compra futura.</li>
          </ul>

          {/* 3. NO PROCEDE DEVOLUCIÓN CUANDO */}
          <h3 className="text-base md:text-lg font-semibold text-[#124948] mt-4">
            3. No procede devolución cuando
          </h3>
          <p>No habrá lugar a devolución o garantía cuando:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>El producto fue abierto.</li>
            <li>Hubo uso indebido del producto.</li>
            <li>Se almacenó en condiciones inadecuadas.</li>
            <li>Pasó el término legal para ejercer retracto o garantía.</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
