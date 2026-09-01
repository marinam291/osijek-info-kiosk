import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="hr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <ScrollViewStyleReset />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          html, body {
            overscroll-behavior-y: none;
            overflow: hidden;
            height: 100%;
            width: 100%;
            position: fixed;
            user-select: none;
            -webkit-user-select: none;
          }
          #root {
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
        `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
