import React from 'react'
import createEmotionServer from '@emotion/server/create-instance'
import Document, {Main, Head, Html, NextScript, DocumentContext} from 'next/document'
import { theme } from '../theme/theme' 
import createEmotionCache from '../utils/theme'


export default class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext) {

    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
  
    /* eslint-disable */
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) =>
          <App emotionCache={cache} {...props} />,
    });
    /* eslint-enable */
  
    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));
  
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags,
      ],
    };
  }

  render() {

    return (
      <Html>
          <Head>
              <meta name="keywords" content="floranext, flora" />
              <meta name="theme-color" content={theme.palette.primary.main} />
          </Head>
          <Main />
          <NextScript />
      </Html>
    );
  }
}