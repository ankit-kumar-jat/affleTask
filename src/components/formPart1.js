import React from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Container, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GlobalContext from '../context/global';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingBottom: theme.spacing(4),
		'& .MuiFormControl-root': {
			marginBottom: theme.spacing(4),
		},
	},
}));

function FormPart1() {
	const classes = useStyles();
	const history = useHistory()
	const { globalStore, setGlobalStore } = React.useContext(GlobalContext);
	const [values, setValues] = React.useState({
		meetingRoom: '',
		name: '',
		description: ''
	});

	// const [errors, setErrors] = React.useState({
	// 	meetingRoom: false,
	// 	name: false,
	// 	description: false,
	// 	timeSlot: false
	// })

	const handleSubmit = (e) => {
		e.preventDefault();
		setGlobalStore({
			...globalStore,
			meetingRoom: values.meetingRoom,
			name: values.name,
			description: values.description
		})
		history.push('/part2');
	}

	return (
		<>
			<Container maxWidth="xs">
				<form onSubmit={handleSubmit} className={classes.form}>
					<FormControl variant="outlined" fullWidth size="small">
						<InputLabel id="selectMeetingRoom">Meeting Room</InputLabel>
						<Select
							labelId="selectMeetingRoom"
							id="selectMeetingRoom"
							value={values.meetingRoom}
							onChange={e => setValues({ ...values, meetingRoom: e.target.value })}
							label="Meeting Room"
							required
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value="training_room">Training Room</MenuItem>
							<MenuItem value="project_room">Project Room</MenuItem>
						</Select>
					</FormControl>
					<TextField
						fullWidth
						size="small"
						id="outlined-helperText"
						label="Name"
						placeholder="Enter Your Name"
						variant="outlined"
						value={values.name}
						onChange={e => setValues({ ...values, name: e.target.value })}
						required
					/>
					<TextField
						fullWidth
						size="small"
						id="outlined-helperText"
						label="Meeting Description"
						placeholder="Enter meeting description"
						variant="outlined"
						value={values.description}
						onChange={e => setValues({ ...values, description: e.target.value })}
						required
					/>
					<Button variant="contained" color="primary" type="submit">
						Next
					</Button>
				</form>
			</Container>
		</>
	)
}

export default FormPart1
