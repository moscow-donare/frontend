import { DashboardProvider } from "./context/DashboardContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div>{children}</div>
    </DashboardProvider>
  );
}