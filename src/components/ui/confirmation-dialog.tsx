"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "./dialog";
import Button from "./button";

export default function ConfirmationDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  confirmAction,
}: {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  title: string;
  description: string;
  confirmAction: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col gap-6">
        <DialogHeader showClose={false}>{title}</DialogHeader>
        <p>{description}</p>

        <div className="flex gap-6">
          <Button onClick={confirmAction}>Yes</Button>

          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
