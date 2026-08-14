// src/components/VideoSection.jsx
import React, { useEffect, useRef, useState } from "react";

const VideoSection = () => {
  const sectionRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="bg-[#F6F0DD] px-4 py-10 md:py-14"
    >
      <div className="max-w-5xl mx-auto">
        {/* Línea separadora superior */}
        <div className="flex justify-center mb-8">
          <div className="h-px w-3/4 max-w-4xl bg-[#124948]/25" />
        </div>

        {/* RECUADRO BLANCO DEL VIDEO */}
        <div className="bg-white rounded-3xl shadow-md w-full aspect-video overflow-hidden">
          {shouldLoadVideo ? (
            <video
              src="video-cuarentamas.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#f6f0dd] to-white flex items-center justify-center text-[#124948]/70 text-sm md:text-base">
              Cargando video...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
