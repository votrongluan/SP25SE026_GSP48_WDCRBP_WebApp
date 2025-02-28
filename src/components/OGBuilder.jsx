import { Helmet, HelmetProvider } from "react-helmet-async";

export default function ProductPage({ RenderedComponent, data }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.image} />
        <meta property="og:url" content={data.url} />
      </Helmet>
      <RenderedComponent />
    </HelmetProvider>
  );
}
