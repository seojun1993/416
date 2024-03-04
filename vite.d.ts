declare module "*.xml" {
  const content: string;
  //  TODO
  export default content;
}

export declare global {
  interface Window {
    chrome: {
      webview: {
        hostObjects: {
          sync: {
            jumjaplay: {
              Play: (id: string) => string;
            };
          };
        };
      };
    };
  }
}
