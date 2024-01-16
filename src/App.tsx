import './App.css'
import { ChipsComponent } from './components/ChipsComponent'

function App() {
  const chipOptions = ["react", "javascript", "css", "c++", "python", "dotnet core"];

  return (
    <div>
      <ChipsComponent options={chipOptions} />
    </div>
  )
}

export default App
