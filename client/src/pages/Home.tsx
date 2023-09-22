import AddClientModal from '../components/AddClientModal'
import Clients from '../components/Clients'
import Projects from '../components/Projects'

export default function Home() {
	return (
		<>
			<div className="d-flex gap-3 mt-4">
				<AddClientModal />
			</div>
			<Projects />
			<hr />
			<Clients />
		</>
	)
}
