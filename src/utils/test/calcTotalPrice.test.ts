import { calculateTotalPrice } from "../calcTotalPrice";

describe("calculateTotalPrice", () => {
  it("returns 0.00 for an empty cart", () => {
    expect(calculateTotalPrice([])).toBe("0.00");
  });

  it("calculates total for items", () => {
    const cart = [
      {
        id: 1,
        price: 10,
        quantity: 2,
        title: "Product 1",
        description: "Description 1",
        category: "Category 1",
        image: "image1.jpg",
      },
      {
        id: 2,
        price: 5.5,
        quantity: 1,
        title: "Product 2",
        description: "Description 2",
        category: "Category 2",
        image: "image2.jpg",
      },
    ];
    expect(calculateTotalPrice(cart)).toBe("25.50");
  });
});
