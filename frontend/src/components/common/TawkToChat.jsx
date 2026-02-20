import React, { useEffect } from 'react';

/**
 * TawkToChat Component
 * Integrates Tawk.to live chat widget into the application.
 * 
 * Requires Tawk.to Property ID and Widget ID.
 * These can be passed as props or set in environment variables:
 * VITE_TAWK_PROPERTY_ID
 * VITE_TAWK_WIDGET_ID
 */
const TawkToChat = ({ propertyId, widgetId }) => {
  useEffect(() => {
    const tawkPropertyId = propertyId || import.meta.env.VITE_TAWK_PROPERTY_ID;
    const tawkWidgetId = widgetId || import.meta.env.VITE_TAWK_WIDGET_ID;

    if (!tawkPropertyId || !tawkWidgetId) {
      console.warn('Tawk.to Chat: Missing Property ID or Widget ID. Chat widget will not be loaded.');
      return;
    }

    // Check if script is already present to avoid duplicates
    if (document.getElementById('tawk-to-script')) {
      return;
    }

    // Tawk.to Script
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.id = 'tawk-to-script'; // Add ID for tracking
      s1.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Cleanup function? Tawk.to doesn't really support unmounting easily, 
    // but we prevent double injection with the ID check.

  }, [propertyId, widgetId]);

  return null; // This component does not render anything visible itself
};

export default TawkToChat;
