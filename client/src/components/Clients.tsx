import {gql, useQuery} from '@apollo/client'
import ClientRow from './ClientRow';
import { Client } from '../types';

const GET_CLIENTS = gql`
	query getClients {
		clients {
			name,
			id
			email
			phone
		}
	}
`

const Clients = () => {

	const { data, loading, error } = useQuery(GET_CLIENTS)
	const clients = data?.clients as Client[]
	console.log({clients, loading, error});
	

	return (
		<>
			{
				loading
					? <div>Loading...</div>
					: (
					<table className='table table-hover mt-3'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{
									clients.map(client => (
										<ClientRow
											key={client.id}
											client={client}
										/>
									))
								}
							</tbody>
					</table>
				)
			}
		</>
	)
}

export default Clients
