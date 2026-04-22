import React, { useEffect, useRef } from 'react';
import 'pannellum/build/pannellum.css';
import 'pannellum/build/pannellum.js';

const VRViewer = ({ 
  image, 
  title, 
  author, 
  autoLoad = true, 
  autoRotate = -2, 
  hfov = 110,
  pitch = 0,
  yaw = 0
}) => {
  const viewerRef = useRef(null);
  const pannellumRef = useRef(null);

  useEffect(() => {
    // We need to wait for the DOM element to be ready
    if (viewerRef.current && window.pannellum) {
      pannellumRef.current = window.pannellum.viewer(viewerRef.current, {
        type: 'equirectangular',
        panorama: image,
        title: title,
        author: author,
        autoLoad: autoLoad,
        autoRotate: autoRotate,
        hfov: hfov,
        pitch: pitch,
        yaw: yaw,
        showZoomCtrl: false,
        showFullscreenCtrl: true,
        compass: true,
        northOffset: 247,
      });
    }

    return () => {
      if (pannellumRef.current) {
        pannellumRef.current.destroy();
      }
    };
  }, [image, title, author, autoLoad, autoRotate, hfov, pitch, yaw]);

  return (
    <div className="w-full h-full relative group">
      <div 
        ref={viewerRef} 
        id="panorama" 
        className="w-full h-full bg-stone-900"
      />
      
      {/* Overlay Help Text (Fades out on interaction) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/20 group-hover:opacity-0 transition-opacity duration-500">
        <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-white text-sm font-medium animate-pulse">
          Click & Drag to Explore
        </div>
      </div>
    </div>
  );
};

export default VRViewer;
