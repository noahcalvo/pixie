// src/pages/_app.js

import { Container } from "react-bootstrap";
import "../styles/main.scss";
import HeaderNav from "./header-nav";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <HeaderNav />
      <Container>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}

export default MyApp;
