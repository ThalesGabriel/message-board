import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux';
import App from 'next/app';
// import { ThemeProvider } from 'styled-components';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { NavigationHistoryProvider } from '../components/NavigationHistoryProvider';
import mediaQuery from 'css-mediaquery';
import theme from '../theme';
import Router from 'next/router';

// Router.events.on('routeChangeStart', (url) => {
//   NProgress.start();
//   resetLocatorByRouter(url);
// });
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

//export default withRedux(initStore, { debug: true })(
class MessageBoardApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
    
    const currentRouter = Router.router.pathname;
    // if (currentRouter !== '/sign-up') {
    //   checkCompleteSignUp();
    // }
  }

  ssrMatchMedia = (query) => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      width: this.props.deviceType === 'mobile' ? '0px' : '1024px',
    }),
  });

  render() {
    const { Component, pageProps, store, router } = this.props;
    return (
      <React.Fragment>
        {/* <Seo></Seo> */}
        <Provider store={store}>
          <StylesProvider injectFirst>
            <MuiThemeProvider
              theme={{
                ...theme,
                props: {
                  // Change the default options of useMediaQuery
                  MuiUseMediaQuery: { ssrMatchMedia: this.ssrMatchMedia },
                },
              }}
            >
              {/* <ThemeProvider theme={theme}> */}
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
              {/* </ThemeProvider> */}
            </MuiThemeProvider>
          </StylesProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

//);

MessageBoardApp.getInitialProps = async (appContext) => {
  let deviceType = 'desktop';

  // if (appContext.ctx.req && parser(appContext.ctx.req.headers['user-agent']).device.type) {
  //   deviceType = parser(appContext.ctx.req.headers['user-agent']).device.type;
  // }
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, deviceType };
};

export default withRedux(initStore, { debug: true })(MessageBoardApp);