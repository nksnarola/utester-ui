import type { ReactNode } from "react"
import { StoreProvider } from "./StoreProvider"
import { ThemeProvider } from "./ThemeProvider"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  )
}
