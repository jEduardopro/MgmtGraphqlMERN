import { FormEvent, useState } from 'react'
import { Project } from '../types'
import { useMutation } from '@apollo/client'
import { UPDATE_PROJECT } from '../mutations/ProjectMutations'
import { GET_PROJECT } from '../queries/ProjectQueries'

type Props = {
	project: Project
}

export default function EditProjectForm({ project }: Props) {
	const [name, setName] = useState(project.name)
	const [description, setDescription] = useState(project.description)
	const [status, setStatus] = useState('new')

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { name, description, status, id: project.id },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		console.log('submitted')

		if (name.trim() === '' || description.trim() === '') {
			alert('Please fill out all fields')
			return
		}

		updateProject()
	}

	return (
		<div className='mt-5'>
			<h3>Update Project Details</h3>
			<form onSubmit={handleSubmit}>
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
						<option value='progress'>In Progress</option>
						<option value='completed'>Completed</option>
					</select>
				</div>

				<button
					type='submit'
					className='btn btn-primary'
				>
					Save Changes
				</button>
			</form>
		</div>
	)
}
