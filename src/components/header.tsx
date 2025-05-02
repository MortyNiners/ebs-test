import Cart from "./../../public/cart.svg";

export const Header = () => {
  return (
    <header className="flex justify-between items-center mt-4 py-4 px-4 rounded-3xl bg-gray-200">
      <div>
        <span className="text-[28px] font-semibold">EBS Test</span>
      </div>
      <div>
        <div className="relative bg-blue-400 p-6 rounded-full cursor-pointer">
          <img
            src={Cart}
            alt=""
            className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </header>
  );
};
