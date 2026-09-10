import { AppProviders } from "@/app/providers"
import { AppRouter } from "@/app/routes"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App
