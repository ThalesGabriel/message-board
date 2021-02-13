import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles'
import theme from '../theme';

class MessageBoardDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="assets/favicon.png" />
          {/* PWA primary color */}
          <meta name="theme-color" content="#d72027"/>
          <meta name="msapplication-navbutton-color" content="#d72027"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="#d72027"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>  
        </Head>
      
        <body>
            <Main />
            <NextScript />
        </body>
      </Html>
    );
  }
}

MessageBoardDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}

export default MessageBoardDocument;

