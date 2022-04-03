import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
