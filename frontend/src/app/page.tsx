"use client";
import Image from "next/image";
import Generator from "./components/generator";
import Payment from "./components/payments";
import DataContext from "./components/dataContext";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

let socket: Socket | undefined;
export default function Home() {
  const [activeComponent, setActiveComponent] = useState("Generator");
  const [letter, setLetter] = useState("");
  const [wsEvent, setWsEvent] = useState(false);
  const [sharedValue, setSharedValue] = useState<SharedValue>({
    code: "0",
    grid: [],
    isCalling: false,
  });
  
  useEffect(() => {
    // Establish Socket.IO connection
    socket = io("http://localhost:3300", {
      transports: ["websocket", "polling"],
      auth: {
        token: "test-token",
      },
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    socket.on("customError", (errorMessage) => {
      console.error("Custom error from server:", errorMessage);
    });

    socket.on("customMessage", (customMessage) => {
      console.log("Custom msg from server:", customMessage);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setWsEvent(false);
    });

    socket.on("grid", (data) => {
      setWsEvent(true);
      setSharedValue({
        code: String(data.code),
        grid: data.grid,
        isCalling: true,
      });
     
    });

    // Clean up on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const loadComponentG = () => {
    setActiveComponent("Generator");
  };
  const loadComponentP = () => {
    setActiveComponent("Payment");
  };

  const handleSetLetter = (value: string) => {
   
    setLetter(value);
  
    socket?.emit("letter", value);
  };
  interface SharedValue {
    isCalling: boolean;
    code: string;
    grid: [];
  }

  return (
    <DataContext.Provider value={{ sharedValue, setSharedValue }}>
      <main className="flex min-h-screen flex-col  md:items-center justify-between p-2 lg:p-24 w-full">
        <Generator
          loadComponentP={loadComponentP}
          activeComponent={activeComponent}
          wsEvent={wsEvent}
          setLetter={handleSetLetter}
        />
        <Payment
          loadComponentG={loadComponentG}
          activeComponent={activeComponent}
        />
        {/* {activeComponent === "Generator" && <Generator loadComponentP={loadComponentP} />} */}
        {/* {activeComponent === "Payment" && <Payment />} */}
      </main>
    </DataContext.Provider>
  );
}
