import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/compare")({
  component: CompareRedirect,
});

function CompareRedirect() {
  return <Navigate to="/components" />;
}
