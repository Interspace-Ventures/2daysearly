declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: {
        width?: number;
        alignLeft?: boolean;
        hideTitle?: boolean;
        emoji?: {
          text: string;
          animation: string;
        };
      }) => void;
    };
    TallyConfig?: {
      hideTitle?: boolean;
      formId?: string;
    };
  }
}

export {};