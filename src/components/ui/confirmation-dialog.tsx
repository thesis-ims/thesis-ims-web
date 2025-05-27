"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader } from "./dialog";
import { Button } from "./button";

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
        <div className="flex flex-col gap-8">
          <p className="text-center">{description}</p>

          <div className="flex w-full gap-4">
            <Button onClick={confirmAction} size={"small"} className="w-full">
              Yes
            </Button>

            <Button
              className="w-full"
              size={"small"}
              intent={"secondary"}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              No
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
