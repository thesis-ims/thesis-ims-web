"use client";

import React, { ReactElement, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader } from "./dialog";
import { Button } from "./button";

export default function ConfirmationDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  confirmAction,
  icon,
}: {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  title: string;
  description: string;
  confirmAction: () => void;
  icon?: ReactElement;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {icon}
          <DialogHeader showClose={false} className="flex flex-col gap-4">
            {title}
          </DialogHeader>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-center">{description}</p>

          <div className="flex w-full gap-4">
            <Button
              onClick={confirmAction}
              size={"small"}
              intent={"warning"}
              className="w-full"
            >
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
