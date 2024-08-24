"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Generator() {
  const items = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => "")
  );
  const [isCalling, setIsCalling] = useState(false);
  const [dataCode, setDataCode] = useState("");
  const [dataGrid, setDataGrid] = useState(items);
  const [letter, setLetter] = useState('');
  const [isDisabled, setIsDisabled] = useState(false); 
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCalling) {
      // Call the API immediately and then set up the interval
      callApi();

      interval = setInterval(() => {
        callApi();
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Clean up the interval on component unmount or when stopping the call
      }
    };
  }, [isCalling]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow a-z (both lowercase and uppercase) and ensure only one letter is entered
    if (/^[a-z]$/.test(value)) {
      setLetter(value);
      console.log("value: ",value)
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false); // Re-enable input after 4 seconds
        
      }, 4000);
    } else if (value === '') {
      // Allow clearing the input
      setLetter('');
    }
  };

  const callApi = async () => {
    try {
      let bodyData: string | null = JSON.stringify({character: letter})
      if(letter === ''){
        bodyData = null;
      }
        console.log("body",bodyData)
      const response = await fetch("http://localhost:3300/api/v1/grid", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: bodyData
        
      });
      const dataArr = await response.json();
      console.log("API response:", response.status);

      console.log("API response:", dataArr.data);

      if (response.status != 200) {
        setIsCalling(!isCalling);
        alert("Something went wrong. Try again");
      } else {
        console.log(dataArr);
        setDataCode(dataArr.data.code || "");
        setDataGrid(dataArr.data.grid || "");
        // items = dataArr.data.grid
      }
    } catch (error) {
      setIsCalling(!isCalling);
      console.error("Error calling the API:", error);
    }
  };

  const handleGenerate = () => {
    setIsCalling(!isCalling);
  };
  const liveIconCondition = isCalling ? "bg-red-500" : "bg-gray-700";

  return (
    <section className="w-[800px] ">
      <div className=" flex flex-row justify-between items-end ">
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase">
            Character
          </label>
          <input
            type="text"
            value={letter}
            disabled={isDisabled}
            onChange={handleInputChange}
            maxLength={1} // Restricts input length to 1 character
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
          <button
            onClick={handleGenerate}
            className="bg-primary hover:text-black text-white font-semibold  py-4 px-6 rounded uppercase"
          >
            Generate 2D grid
          </button>

          <button className="bg-primary hover:text-black text-white font-semibold  py-4 px-6 rounded uppercase">
            Payments
          </button>
        </div>
      </div>

      <div className="flex w-full pt-10">
        <div className="grid grid-cols-10   justify-evenly w-full auto-rows-[50px] border-gray-400    border-[0.5px] rounded-lg">
          {/* {dataGrid.map((item) => (
            <div
              key={item}
              className="flex justify-center items-center  border-[0.5px] border-gray-400 grid-item"
            >
              {item}
            </div>
          ))} */}

          {dataGrid.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="flex justify-center items-center  border-[0.5px] border-gray-400 grid-item"
              >
                {item}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-10 flex flex-col items-center  ">
        <div className="flex items-center gap-2 p-2">
          <div
            className={`w-[10px] h-[10px] rounded-full flex ${liveIconCondition}  `}
          ></div>
          <label className=" block text-gray-700 text-sm font-bold  uppercase">
            Live
          </label>
        </div>

        <div className=" p-4 border border-gray-700 rounded w-40 uppercase">
          <span className="text-gray-700"> Your code: {dataCode} </span>
        </div>
      </div>
    </section>
  );
}
