import { Client } from "../types"
import {FaTrash} from 'react-icons/fa'

type Props = {
	client: Client
}

const ClientRow = ({ client }: Props) => {
	const { name, email, phone } = client
	return (
		<tr>
			<td>{name}</td>	
			<td>{email}</td>	
			<td>{phone}</td>	
			<td>
				<button className="btn btn-danger btn-sm">
					<FaTrash />
				</button>
			</td>	
		</tr>
	)
}

export default ClientRow
