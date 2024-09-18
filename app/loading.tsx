import { Spinner, Progress } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Spinner size="lg" color="primary" />
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
        color="primary"
      />
    </div>
  );
}
