import { Header } from "../components/Header";

import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <>
      {/* You can choose whatever title and favicon you want. */}
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header></Header>
      <div className="not-found-message">Page not found</div>
    </>
  );
}
