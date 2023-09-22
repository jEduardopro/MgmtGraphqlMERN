import { FormEvent, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/ClientMutations'
import { GET_CLIENTS } from '../queries/ClientQueries'

const AddClientModal = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')

	const [addClient] = useMutation(ADD_CLIENT, {
		variables: { name, email, phone },
		update(cache, { data: { addClient } }) {
			const { clients } = cache.readQuery({ query: GET_CLIENTS })
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] }
			})
		}
	})

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()		
		if (name === '' || email === '' || phone === '') {
			return alert('Please fill in the required fields')
		}

		addClient()
		
		setName('')
		setEmail('')
		setPhone('')
	}

	return (
		<>
			<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClient">
				<div className='d-flex align-items-center'>
					<FaUser className='icon' />
					<div>Add Client</div>
				</div>
			</button>

			<div className="modal fade" id="addClient" tabIndex={-1} aria-labelledby="addClientLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="addClientLabel">Add Client</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form onSubmit={onSubmit}>
								<div className="mb-3">
									<label className="form-label">Name</label>
									<input type="text" className='form-control' placeholder='name'
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input type="email" className='form-control' placeholder='email' 
										value={email}
										onChange={(e) => setEmail(e.target.value)} 
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Phone</label>
									<input type="text" className='form-control' placeholder='phone' 
										value={phone}
										onChange={(e) => setPhone(e.target.value)} 
									/>
								</div>

								<button
									type='submit'
									className='btn btn-secondary'
									data-bs-dismiss="modal"
								>
									Save
								</button>
							</form>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddClientModal
