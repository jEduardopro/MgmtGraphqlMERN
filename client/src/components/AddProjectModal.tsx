import { FormEvent, useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/ProjectQueries'
import { GET_CLIENTS } from '../queries/ClientQueries'
import Spinner from './Spinner'
import { Client } from '../types'
import { ADD_PROJECT } from '../mutations/ProjectMutations'

const AddProjectModal = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [clientId, setClientId] = useState('')
	const [status, setStatus] = useState('new')

	const { loading, error, data } = useQuery(GET_CLIENTS)

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, status, clientId },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS })
			cache.writeQuery({
				query: GET_PROJECTS,
				data: {projects: [...projects, addProject]}
			})
		}
	})

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		
		if (name === '' || description === '' || status === '') {
			return alert('Please fill in the required fields')
		}

		addProject()
		
		setName('')
		setDescription('')
		setStatus('new')
		setClientId('')
	}

	if (loading) return null;
	if (error) return <p>Something went wrong!</p>

	return (
		<>
			{
				!loading && !error && (
					<>
						<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProject">
							<div className='d-flex align-items-center'>
								<FaList className='icon' />
								<div>New Project</div>
							</div>
						</button>

						<div className="modal fade" id="addProject" tabIndex={-1} aria-labelledby="addProjectLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="addProjectLabel">Add Project</h1>
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
												<label className="form-label">Description</label>
												<textarea className='form-control' placeholder='Description' 
													value={description}
													onChange={(e) => setDescription(e.target.value)} 
												></textarea>
											</div>
											<div className="mb-3">
												<label className="form-label">Status</label>
												<select
													className='form-select'
													value={status}
													onChange={(e) => setStatus(e.target.value)}
												>
													<option value='new'>New</option>
													<option value='in_progress'>In Progress</option>
													<option value='completed'>Completed</option>
												</select>
											</div>

											<div className='mb-3'>
												<label className="form-label">Client</label>
												<select
													className='form-select'
													value={clientId}
													onChange={(e) => setClientId(e.target.value)}
												>
													<option value=''>Select a client</option>
													{
														data.clients.map((client: Client) => (
															<option key={client.id} value={client.id}>{client.name}</option>
														))
													}
												</select>
											</div>

											<button
												type='submit'
												className='btn btn-primary'
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
		</>
	)
}

export default AddProjectModal
