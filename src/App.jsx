import { ApplicationContextComponent } from "./context/ApplicationContext"
import "@ui5/webcomponents-icons/dist/AllIcons.js"
import IndexContent from "./Components/IndexContent"

export default function App() {

  return (
    <ApplicationContextComponent>
      <IndexContent />
    </ApplicationContextComponent>
  )
}
