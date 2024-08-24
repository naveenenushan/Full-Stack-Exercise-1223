import Image from "next/image";
export default function Generator() {
  const items = Array.from({ length: 100 }, (_, index) => index + 1);
  return (
    <section className="w-[800px] ">
      <div className=" flex flex-row justify-between items-end ">
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase">
            Character
          </label>
          <input
            type="text"
            className=" appearance-none border border-gray-700 rounded w-28 py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="character"
            placeholder="Character"
          />
        </div>
        <div className="">
          <Image
            src="/clock.png"
            width={70}
            height={70}
            alt="Picture of a clock"
          ></Image>
        </div>
        <div className=" flex gap-4">
          <button className="bg-primary hover:text-black text-white font-semibold  py-4 px-6 rounded uppercase">
            Generate 2D grid
          </button>

          <button className="bg-primary hover:text-black text-white font-semibold  py-4 px-6 rounded uppercase">
            Payments
          </button>
        </div>
      </div>

      <div className="flex w-full pt-10">
        <div className="grid grid-cols-10   justify-evenly w-full auto-rows-[50px] border-gray-400    border-[0.5px] rounded-lg">
          {items.map((item) => (
            <div
              key={item}
              className="flex justify-center items-center  border-[0.5px] border-gray-400 grid-item"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-10 flex flex-col items-center  ">

        <div className="flex items-center gap-2 p-2">
          <div className="w-[10px] h-[10px] rounded-full bg-red-500 flex  "></div>
          <label className=" block text-gray-700 text-sm font-bold  uppercase">
            Live
          </label>
        </div>

        <div className=" p-4 border border-gray-700 rounded w-40 uppercase">
          <span className="text-gray-700"> Your code: {10} </span>
        </div>
      </div>
    </section>
  );
}
