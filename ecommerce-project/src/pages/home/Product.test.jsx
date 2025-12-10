import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Product } from "./Product";
import axios from "axios";

vi.mock("axios");

describe("Product Component", () => {
  it("displays the product details correctly", () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    //create a fake fucntion taht is called a mock so that we dont contact the database
    const loadCart = vi.fn();

    //we have to render the component in the fake web page
    render(<Product product={product} loadCart={loadCart} />);

    //screen is used to check the fake webpage and to see if everything is renderd correectly.
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );

    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      `images/ratings/rating-${product.rating.stars * 10}.png`
      // 'images/ratings/rating-45.png'
    );

    expect(screen.getByText(product.rating.count)).toBeInTheDocument();
    //expect(screen.getByText("87")).toBeInTheDocument();
  });

  //Test user interaction by button click
  it("add a product to the cart", async () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    const loadCart = vi.fn();

    render(<Product product={product} loadCart={loadCart} />);

    //setup user event now we can simulate a click event and in the click fucntion we will let it know which element to click.
    //now we will give a data-testid proerty with value what ever we want like we gave in this case 'add-to-cart-button' in the product component , then we will get that element based on the data-testid by using screen then will save it to a varibale and pass the element to user.click function.
    //so that it will simulate a click event on that element.
    const user = userEvent.setup();
    const addTocartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addTocartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });
});
