import type { Metadata } from "next";

import { UploadDocumentForm } from "./upload-document-form";

export const metadata: Metadata = {
  title: "Share document",
};

export default function UploadDocumentPage() {
  return <UploadDocumentForm />;
}
