"use client";

import React, { useEffect, useRef, useState } from "react";

interface RecaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
  theme?: "dark" | "light";
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          theme?: "dark" | "light";
          callback: (response: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    onRecaptchaLoaded?: () => void;
  }
}

export default function Recaptcha({
  onVerify,
  onExpire,
  className = "",
  theme = "dark",
}: RecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    "6LfQyrAtAAAAAA8x65G7GT9jbkSucU1FZ8F-RFVK";

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.grecaptcha) return;

      // Avoid re-rendering if already rendered
      if (widgetIdRef.current !== null) {
        return;
      }

      try {
        const id = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          callback: (token: string) => {
            if (isMounted) {
              onVerify(token);
            }
          },
          "expired-callback": () => {
            if (isMounted && onExpire) {
              onExpire();
            }
          },
        });
        widgetIdRef.current = id;
        setIsLoaded(true);
      } catch (err) {
        console.error("Failed to render reCAPTCHA widget:", err);
      }
    };

    // If script already loaded
    if (typeof window !== "undefined" && typeof window.grecaptcha?.render === "function") {
      renderWidget();
      return;
    }

    // Check if script tag exists
    const scriptId = "google-recaptcha-v2-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    window.onRecaptchaLoaded = () => {
      renderWidget();
    };

    return () => {
      isMounted = false;
    };
  }, [siteKey, theme, onVerify, onExpire]);

  return (
    <div className={`flex flex-col items-center justify-center my-2 ${className}`}>
      <div ref={containerRef} className="min-h-[78px] flex items-center justify-center" />
      {!isLoaded && (
        <div className="text-[11px] font-mono text-muted-foreground animate-pulse py-2">
          Loading security verification...
        </div>
      )}
    </div>
  );
}
