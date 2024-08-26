"use client"
import Image from "next/image";
import { useState } from "react";
import Generator from "./components/generator";
import Payment from "./components/payments";
import DataContext from "./components/dataContext";


export default function Home() {
  const [activeComponent, setActiveComponent] = useState("Generator");
  const [sharedValue, setSharedValue] = useState<SharedValue>({code:'0',grid:[],isCalling:false});

  const loadComponentG = () => {
    setActiveComponent("Generator");
  };
  const loadComponentP = () => {
    setActiveComponent("Payment");
    
  }
  interface SharedValue {
    isCalling: boolean;
    code: string;
    grid: [];
  }

  return (
    <DataContext.Provider value={{ sharedValue, setSharedValue }}>
    <main className="flex min-h-screen flex-col  md:items-center justify-between p-2 lg:p-24 w-full">

    <Generator loadComponentP={loadComponentP}  activeComponent= {activeComponent}/>
    <Payment loadComponentG={loadComponentG}  activeComponent= {activeComponent} />
      {/* {activeComponent === "Generator" && <Generator loadComponentP={loadComponentP} />} */}
      {/* {activeComponent === "Payment" && <Payment />} */}
    </main>
    </DataContext.Provider>
  );
}
