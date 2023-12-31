import { Client } from "../types"
import { FaTrash } from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/ClientMutations'
import { GET_CLIENTS } from "../queries/ClientQueries"
import { GET_PROJECTS } from "../queries/ProjectQueries"

type Props = {
	client: Client
}

const ClientRow = ({ client }: Props) => {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		refetchQueries: [{ query: GET_CLIENTS }, {query: GET_PROJECTS}]
		// update(cache, { data: { deleteClient } }) {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS })
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: { clients: clients.filter((client: Client) => client.id !== deleteClient.id) }
		// 	})
		// }
	})

	const { name, email, phone } = client

	return (
		<tr>
			<td>{name}</td>	
			<td>{email}</td>	
			<td>{phone}</td>	
			<td>
				<button
					className="btn btn-danger btn-sm"
					onClick={() => { deleteClient() }}
				>
					<FaTrash />
				</button>
			</td>	
		</tr>
	)
}

export default ClientRow
