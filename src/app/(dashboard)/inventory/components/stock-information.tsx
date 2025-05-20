import React from "react";

export default function StockInformation() {
  return (
    <div className="grid w-full grid-cols-3 gap-6">
      <StockCard text={"Available Stock"} />
      <StockCard text={"Available Stock"} />
      <StockCard text={"Available Stock"} />
    </div>
  );
}

function StockCard({ text }: { text: string }) {
  return <div className="bg-white p-4">{text}</div>;
}
