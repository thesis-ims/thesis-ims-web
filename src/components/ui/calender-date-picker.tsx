import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function CalenderDatePicker({
  value,
  setValue,
}: {
  value: Dayjs;
  setValue: (data: number) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD/MM/YYYY"
        slotProps={{ textField: { placeholder: "Select a date" } }}
        onChange={(newValue) => {
          if (newValue) {
            const localDate = newValue.utc().tz("Asia/Jakarta");
            console.log(localDate, "BIRTHDAY");
            setValue(dayjs(localDate).valueOf());
          }
        }}
      />
    </LocalizationProvider>
  );
}
