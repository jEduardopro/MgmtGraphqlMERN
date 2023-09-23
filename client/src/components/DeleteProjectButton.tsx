import { useMutation } from "@apollo/client"
import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { DELETE_PROJECT } from "../mutations/ProjectMutations"
import { GET_PROJECTS } from "../queries/ProjectQueries"

type Props = {
	projectId: string
}

export default function DeleteProjectButton({ projectId }: Props) {
	const navigate = useNavigate()
	const [deleteProject] = useMutation(DELETE_PROJECT, {
		variables: { id: projectId },
		onCompleted: () => navigate('/'),
		refetchQueries: [{query: GET_PROJECTS}]
	})

	return (
		<div className="d-flex mt-5 ms-auto">
			<button className="btn btn-danger m-2"
				type="button"
				onClick={() => deleteProject()}
			>
				<FaTrash className="icon" />
				Delete Project
			</button>
		</div>
	)
}
