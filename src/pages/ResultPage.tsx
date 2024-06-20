import ResultForm from '../components/results/ResultForm'
import ResultTable from '../components/results/ResultTable'

export default function ResultPage() {
  return (
    <div>
      <h1>Welcome to the Result Page</h1>
      <ResultTable />
      <ResultForm result={null} />
    </div>
  )
}
