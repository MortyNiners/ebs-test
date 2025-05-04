import { ICartProduct } from "../context/CartContext";
interface ICartComponent {
  product: ICartProduct[];
  visibility: boolean;
}
export const Cart: React.FC<ICartComponent> = ({ product, visibility }) => {
  return (
    <div
      className={
        visibility
          ? "absolute z-10 top-22 right-2 bg-gray-300 shadow-lg max-w-[420px]  rounded-xl"
          : "hidden"
      }
    >
      <h5 className="font-semibold my-2 ml-2">Cart Items</h5>
      <div className="max-h-[50vh] overflow-hidden overflow-y-auto">
        {product.map((item, index) => (
          <div
            key={index}
            className=" flex flex-col overflow-y-auto mb-2 shadow-md"
          >
            <div className="flex bg-white p-2">
              <img
                src={item.image}
                alt={item.title}
                className="aspect-square w-[80px]"
              />
              <div className="ml-2 w-full">
                <h5 className="font-semibold max-w-[300px]">{item.title}</h5>
                <div className="flex justify-between mt-2">
                  <span>Quantity: {item.quantity}</span>
                  <div className="grid grid-cols-3 mr-2">
                    <button className="bg-gray-200 px-2  text-center border-r--1 border-gray-100 cursor-pointer">
                      +
                    </button>
                    <button className="bg-gray-200 px-2  text-center border-x-1 border-gray-100 cursor-pointer">
                      -
                    </button>
                    <button className="bg-gray-200 px-2  text-center border-l-1 border-gray-100 cursor-pointer">
                      x
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center my-1">
        <button className="bg-gray-100 p-2 my-1 min-w-[95%] rounded-xl font-semibold cursor-pointer hover:bg-red-600 hover:text-white">
          Remove all
        </button>
        <button className="bg-gray-100 p-2 my-1 min-w-[95%] rounded-xl font-semibold cursor-pointer hover:bg-green-600 hover:text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};
