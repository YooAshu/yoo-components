import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
  component: PlaygroundRedirect,
});

function PlaygroundRedirect() {
  return <Navigate to="/components" />;
}
