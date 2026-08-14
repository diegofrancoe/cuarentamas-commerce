import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import productoFront from "../assets/producto_front.png";
import productoBack from "../assets/producto_back.png";
import pouchModel from "../assets/meshy-pouch-blank.glb?url";
import "./ProductExperience3D.css";

function buildInkTexture(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const source = document.createElement("canvas");
      source.width = image.naturalWidth;
      source.height = image.naturalHeight;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      sourceContext.drawImage(image, 0, 0);
      const sourceData = sourceContext.getImageData(0, 0, source.width, source.height);
      const sourcePixels = sourceData.data;
      let minX = source.width;
      let minY = source.height;
      let maxX = 0;
      let maxY = 0;

      for (let y = 0; y < source.height; y += 1) {
        for (let x = 0; x < source.width; x += 1) {
          const index = (y * source.width + x) * 4;
          const alpha = sourcePixels[index + 3];
          const red = sourcePixels[index];
          const green = sourcePixels[index + 1];
          const blue = sourcePixels[index + 2];
          const brightness = red + green + blue;
          const isDarkShadow = brightness < 430;
          const isProductPixel = alpha > 80 && !isDarkShadow;
          if (isProductPixel) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      const pad = 8;
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(source.width - 1, maxX + pad);
      maxY = Math.min(source.height - 1, maxY + pad);

      const canvas = document.createElement("canvas");
      canvas.width = 1800;
      canvas.height = 2600;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        source,
        minX,
        minY,
        maxX - minX,
        maxY - minY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const data = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = data.data;
      for (let index = 0; index < pixels.length; index += 4) {
        const pixel = index / 4;
        const x = pixel % canvas.width;
        const y = Math.floor(pixel / canvas.width);
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const saturation = max - min;
        const brightness = (red + green + blue) / 3;
        const isBackground =
          brightness > 170 ||
          (brightness > 130 && saturation < 35) ||
          (red > 190 && green > 185 && blue > 165);
        const isShadow = brightness < 25 && saturation < 12;
        const isEdgeShadow =
          (y > canvas.height * 0.68 && brightness < 118) ||
          (x > canvas.width * 0.88 && y > canvas.height * 0.48 && brightness < 150);

        if (isBackground || isShadow || isEdgeShadow) {
          pixels[index + 3] = 0;
        }
      }
      context.putImageData(data, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      resolve(texture);
    };
    image.onerror = reject;
    image.src = imageUrl;
  });
}

function makeArtworkPlane(width, height, direction = 1) {
  const geometry = new THREE.PlaneGeometry(width, height, 44, 72);
  const position = geometry.attributes.position;

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const y = position.getY(index);
    const nx = Math.abs(x) / (width / 2);
    const wrinkle =
      (Math.sin((y + height / 2) * 8.5) * 0.008 +
        Math.sin((x + width / 2) * 10.5) * 0.004) *
      (1 - nx);
    const pouchCurve = direction * Math.cos(nx * Math.PI * 0.5) * 0.018;
    position.setZ(index, direction * wrinkle);
    position.setZ(index, position.getZ(index) + pouchCurve);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function ProductExperience3D() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const interactionRef = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    targetX: 0,
    targetY: 0,
    velocityY: 0,
    cameraZ: 8.6,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.02, interactionRef.current.cameraZ);

    const product = new THREE.Group();
    product.scale.setScalar(0.82);
    scene.add(product);

    const footShadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.15, 64),
      new THREE.MeshBasicMaterial({
        color: "#000000",
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      })
    );
    footShadow.rotation.x = -Math.PI / 2;
    footShadow.position.set(0, -1.82, 0);
    footShadow.scale.set(1.2, 0.18, 1);
    scene.add(footShadow);

    const ambient = new THREE.HemisphereLight("#ffffff", "#e8e8e8", 1.8);
    const key = new THREE.DirectionalLight("#ffffff", 2.7);
    key.position.set(3.4, 4.2, 5);
    const fill = new THREE.DirectionalLight("#ffffff", 1.45);
    fill.position.set(-3, 1.5, 3);
    const rim = new THREE.DirectionalLight("#ffffff", 1.1);
    rim.position.set(-2.5, 2, -3);
    scene.add(ambient, key, fill, rim);

    let frontTexture;
    let backTexture;
    let modelScene;
    let frontPrint;
    let backPrint;
    const gltfLoader = new GLTFLoader();
    let disposed = false;
    let frame = 0;

    Promise.all([
      buildInkTexture(productoFront),
      buildInkTexture(productoBack),
      gltfLoader.loadAsync(pouchModel),
    ]).then(
      ([front, back, gltf]) => {
        if (disposed) return;
        frontTexture = front;
        backTexture = back;
        modelScene = gltf.scene;

        modelScene.traverse((object) => {
          if (!object.isMesh) return;
          object.castShadow = false;
          object.receiveShadow = false;
          object.material = new THREE.MeshPhysicalMaterial({
            color: "#f8f5e9",
            roughness: 0.42,
            metalness: 0,
            clearcoat: 0.35,
            clearcoatRoughness: 0.38,
            side: THREE.DoubleSide,
          });
        });

        const box = new THREE.Box3().setFromObject(modelScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        modelScene.position.sub(center);
        const scale = 3.55 / Math.max(size.y, 0.001);
        modelScene.scale.setScalar(scale);
        const scaledBox = new THREE.Box3().setFromObject(modelScene);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        modelScene.position.sub(scaledCenter);
        product.add(modelScene);

        const printMaterial = (texture) =>
          new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            toneMapped: false,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -8,
            side: THREE.DoubleSide,
          });

        const fitted = new THREE.Box3().setFromObject(modelScene);
        const fittedSize = fitted.getSize(new THREE.Vector3());
        const printWidth = fittedSize.x * 0.9;
        const printHeight = fittedSize.y * 0.9;

        frontPrint = new THREE.Mesh(
          makeArtworkPlane(printWidth, printHeight, 1),
          printMaterial(frontTexture)
        );
        frontPrint.position.set(0, -0.08, fitted.max.z + 0.022);
        frontPrint.renderOrder = 20;

        backPrint = new THREE.Mesh(
          makeArtworkPlane(printWidth, printHeight, -1),
          printMaterial(backTexture)
        );
        backPrint.position.set(0, -0.08, fitted.min.z - 0.022);
        backPrint.rotation.y = Math.PI;
        backPrint.renderOrder = 20;
        backPrint.visible = false;

        product.add(frontPrint, backPrint);
      }
    );

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };

    const onPointerDown = (event) => {
      interactionRef.current.isDragging = true;
      interactionRef.current.lastX = event.clientX;
      interactionRef.current.lastY = event.clientY;
      interactionRef.current.velocityY = 0;
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };

      const interaction = interactionRef.current;
      if (!interaction.isDragging) return;

      const deltaX = event.clientX - interaction.lastX;
      const deltaY = event.clientY - interaction.lastY;
      interaction.targetY += deltaX * 0.012;
      interaction.targetX = THREE.MathUtils.clamp(
        interaction.targetX + deltaY * 0.007,
        -0.55,
        0.55
      );
      interaction.velocityY = deltaX * 0.0009;
      interaction.lastX = event.clientX;
      interaction.lastY = event.clientY;
    };

    const onPointerUp = (event) => {
      interactionRef.current.isDragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const onWheel = (event) => {
      event.preventDefault();
      const interaction = interactionRef.current;
      interaction.cameraZ = THREE.MathUtils.clamp(
        interaction.cameraZ + event.deltaY * 0.0025,
        6.8,
        10.5
      );
    };

    const render = () => {
      if (disposed) return;
      frame += 0.012;
      const pointer = pointerRef.current;
      const interaction = interactionRef.current;

      if (!interaction.isDragging) {
        interaction.targetY += interaction.velocityY;
        interaction.velocityY *= 0.985;
      }

      const targetY = interaction.targetY + pointer.x * 0.025;
      const targetX = interaction.targetX - pointer.y * 0.025;
      camera.position.z += (interaction.cameraZ - camera.position.z) * 0.08;
      product.rotation.y += (targetY - product.rotation.y) * 0.11;
      product.rotation.x += (targetX - product.rotation.x) * 0.11;
      product.position.y = Math.sin(frame) * 0.025;
      footShadow.material.opacity = 0.08 + Math.sin(frame) * 0.01;
      if (frontPrint || backPrint) {
        const normalizedRotation = Math.atan2(
          Math.sin(product.rotation.y),
          Math.cos(product.rotation.y)
        );
        const frontSideVisible = Math.abs(normalizedRotation) < Math.PI * 0.42;
        const backSideVisible = Math.abs(normalizedRotation) > Math.PI * 0.58;
        if (frontPrint) frontPrint.visible = frontSideVisible;
        if (backPrint) backPrint.visible = backSideVisible;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    setSize();
    render();
    window.addEventListener("resize", setSize);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      disposed = true;
      window.removeEventListener("resize", setSize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      renderer.dispose();
      footShadow.geometry.dispose();
      footShadow.material.dispose();
      if (modelScene) {
        modelScene.traverse((object) => {
          if (object.isMesh) object.geometry.dispose();
        });
      }
      if (frontPrint) {
        frontPrint.geometry.dispose();
        frontPrint.material.dispose();
      }
      if (backPrint) {
        backPrint.geometry.dispose();
        backPrint.material.dispose();
      }
      if (frontTexture) frontTexture.dispose();
      if (backTexture) backTexture.dispose();
    };
  }, []);

  return (
    <section className="blank-product">
      <canvas ref={canvasRef} className="blank-product__canvas" />
    </section>
  );
}

export default ProductExperience3D;
