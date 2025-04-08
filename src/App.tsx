import 'djuno-design/dist/index.css'
import { Outlet } from 'react-router-dom'
import { DjunoDesignProvider } from 'djuno-design'

const App = () => {
  return (
    <DjunoDesignProvider>
      <Outlet />
    </DjunoDesignProvider>
  )
}

export default App
