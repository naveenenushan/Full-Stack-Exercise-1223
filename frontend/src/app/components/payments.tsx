"use client";
import DataContext from "./dataContext";
import { useEffect, useContext, useState } from "react";

interface PaymentProps {
  loadComponentG: () => void;
  activeComponent: string;
}
interface Record {
  _id: string;
  name: string;
  amount: number;
  code: string;
  grid: [];
}
export default function Payment({
  loadComponentG,
  activeComponent,
}: PaymentProps) {
  const dataContext = useContext(DataContext);
  const [data, setData] = useState<Record[]>([]);
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  if (!dataContext) {
    throw new Error("Component must be used within a DataContext.Provider");
  }

  const fetchData = async () => {
    setHasRun(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL!}/api/v1/payments`
    );
    const result = await res.json();
    if (res.status != 200) {
      alert("Something went wrong. Try again");
    } else {
      setData(result.data);
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setName(value);
    if(value=='' || value.length==0){
      setIsAddButtonEnabled(false);
    }else{
      setIsAddButtonEnabled(true);
    }
    
  };
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = parseInt(value, 10);

    if (isNaN(amount) || Number(amount) <= 0) {
      console.log("Please enter a valid number greater than 0");
      setAmount(0);
    } else {
      setAmount(amount);
    }
  };
  const savePaymentData = async () => {
    try {

      if(!sharedValue.isCalling){
        alert("System is not live. Please generate grid first")
        return
      }
      let bodyData: string | null = JSON.stringify({
        amount: amount,
        name: name,
        code: sharedValue.code,

        grid: sharedValue.grid,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL!}/api/v1/payments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyData,
        }
      );
      const dataArr = await response.json();

      if (response.status != 200) {
        alert("Something went wrong. Try again");
      } else {
        alert("Saved");
        fetchData();
      }
    } catch (error) {
      console.error("Error calling the API:", error);
    }
  };

  const { sharedValue } = dataContext;
  const liveIconCondition = sharedValue.isCalling
    ? "bg-red-500"
    : "bg-gray-700";
  let activeComponentCondition = "";

  if (activeComponent == "Generator") {
    activeComponentCondition = "hidden";
  }

  if (activeComponent == "Payment" && !hasRun) {
    fetchData();
  }

  if (!data) return <div>Loading...</div>;

  return (
    <section className={`w-[800px] ${activeComponentCondition}`}>
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
          <span className="text-gray-700"> Your code: {sharedValue.code} </span>
        </div>
      </div>

      <div className=" flex flex-row justify-between items-end gap-6">
        <div className="">
          <label className="block text-primary text-sm font-bold mb-2 uppercase">
            Payment
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameInputChange}
            minLength={1}
            className={`appearance-none border  rounded w-28 py-4 px-3  leading-tight focus:outline-none focus:shadow-outline border-gray-700 text-gray-700`}
            id="Payment"
            placeholder="Payment"
          />
        </div>

        <div className="">
          <label className="block text-primary text-sm font-bold mb-2 uppercase">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountInputChange}
            minLength={1}
            className={`appearance-none border  rounded w-28 py-4 px-3  leading-tight focus:outline-none focus:shadow-outline border-gray-700 text-gray-700`}
            id="Amount"
            placeholder="Amount"
          />
        </div>
        <div className=" flex gap-4 ">
          <button
            disabled={!isAddButtonEnabled}
            onClick={savePaymentData}
            className="bg-primary hover:text-black text-white font-semibold  py-4 px-6 rounded uppercase inline-flex items-center"
          >
            <svg
              className="pr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
            >
              <polygon
                fill="#ffffff"
                points="22,10.996 13.003,10.996 13.003,2 10.997,2 10.997,10.996   2,10.996 2,13.003 10.997,13.003 10.997,22 13.003,22 13.003,13.003 22,13.003 "
              />
            </svg>
            Add
          </button>
        </div>

        <div className=" flex gap-4 ml-auto">
          <button
            onClick={loadComponentG}
            className="bg-primary hover:text-black text-white font-semibold  py-4 px-6 rounded uppercase"
          >
            Generator
          </button>
        </div>
      </div>

      <div className="flex w-full pt-10">
        <div className="relative overflow-x-auto w-full">
          <table className=" text-sm text-left text-gray-500 w-full border border-gray-400 rounded-lg ">
            <thead className="text-xs text-primary uppercase ">
              <tr>
                <th className="px-6 py-3 border  border-gray-400 w-2/3">
                  Name
                </th>
                <th className="px-6 py-3 border  border-gray-400">Amount</th>
                <th className="px-6 py-3 border  border-gray-400">Code</th>

                <th className="px-6 py-3 border  border-gray-400">Grid</th>
              </tr>
            </thead>
            <tbody className="">
              
              {data.map((record) => (
                <tr key={record._id} className=" border border-gray-400">
                  <td className="px-6 py-4 border border-gray-400">
                    {" "}
                    {record.name}
                  </td>
                  <td className="px-6 py-4 border  border-gray-400">
                    {record.amount}
                  </td>
                  <td className="px-6 py-4 border  border-gray-400">
                    {record.code}
                  </td>
                  <td className="px-6 py-4 border  border-gray-400">
                    {record.grid.flat().length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
