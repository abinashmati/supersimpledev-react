import { Header } from "../components/Header";
import pagenotFound from "../assets/images/pagenotfound.png";

import "./NotFoundPage.css";

export function NotFoundPage({ cart }) {
  return (
    <>
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart}></Header>
      <div className="not-found-message">
        <img src={pagenotFound}></img>
      </div>
    </>
  );
}
