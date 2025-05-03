import { ICartProduct } from "../context/CartContext";

export const Cart: React.FC<{ product: ICartProduct[] }> = ({ product }) => {
  return (
    <div className="absolute z-10 top-22 right-2 bg-gray-300 min-w-[300px] rounded-2xl">
      <div>
        {product.map((item, index) => (
          <div className=" flex flex-col overflow-y-auto ">
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
    </div>
  );
};
