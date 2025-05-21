import PageHeader from "@/components/ui/page-header";
import React from "react";
import ProfilePhotoSection from "./components/profile-photo-section";
import UserDetailForm from "./components/user-detail-form";

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" />
      <div className="flex flex-col gap-4">
        <ProfilePhotoSection />
        <UserDetailForm />
      </div>
    </div>
  );
}
