/// <reference types="vite/client" />

// Phoenix Theme global declarations
declare global {
  interface Window {
    feather?: {
      replace: () => void;
    };
    phoenix?: {
      init: () => void;
      utils: {
        docReady: (callback: () => void) => void;
      };
    };
    config?: {
      config?: {
        phoenixIsRTL?: boolean;
      };
      set: (config: Record<string, unknown>) => void;
    };
  }
}

export {};
