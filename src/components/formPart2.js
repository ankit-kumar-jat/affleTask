import React from 'react'
import { Box, Typography, Button, RadioGroup, Radio, FormControlLabel, FormControl, Container } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../context/global';


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
	selectSlot: {
		flexDirection: 'row',
		justifyContent: "center",
		gap: theme.spacing(1),
		'& .MuiFormControlLabel-root': {
			margin: 0,
			padding: theme.spacing(1),
			paddingTop: theme.spacing(.5),
			paddingBottom: theme.spacing(.5),
			border: `1px solid ${theme.palette.primary.main}`,
			borderRadius: 5,
		},
		'& .MuiFormControlLabel-root:hover': {
			color: theme.palette.primary.main,
			borderColor: theme.palette.primary.main
		}
	},
	selected: {
		'& .MuiFormControlLabel-label': {
			color: theme.palette.primary.main,
		}
	}
}));

function FormPart2() {

	const classes = useStyles();

	const history = useHistory();
	const { globalStore, setGlobalStore } = React.useContext(GlobalContext);

	const [values, setValues] = React.useState({
		date: new Date(),
		timeSlot: ''
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (values.timeSlot === '') {
			alert("please select time slot");
		} else {
			setGlobalStore({
				...globalStore,
				date: values.date,
				timeSlot: values.timeSlot
			});
			history.push('/addevent');
		}
	}

	const disableWeekends = (date) => {
		return date.getDay() === 0 || date.getDay() === 6;
	}

	const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const TIMESLOTS = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM"]

	return (
		<>
			<Container maxWidth="sm">
				<form onSubmit={handleSubmit} className={classes.form}>
					<FormControl >
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								autoOk
								disableToolbar
								variant="static"
								format="MM/dd/yyyy"
								margin="normal"
								id="date-picker"
								label="Date picker"
								value={values.date}
								onChange={date => setValues({ ...values, date: date })}
								color="primary"
								minDate={Date.now()}
								shouldDisableDate={disableWeekends}
							/>
						</MuiPickersUtilsProvider>
						<Box pt={2}>
							<Typography variant="body2" color="initial" align="center">
								{values && values.date ? `${MONTHS[values.date.getMonth()]} ${values.date.getDate()} ${values.date.getFullYear()}` : null}
							</Typography>
						</Box>
					</FormControl>
					<FormControl component="fieldset">
						<Box mb={2}>
							<Typography variant="h6" color="initial" align="center">Please select your preferred slot</Typography>
						</Box>
						<RadioGroup
							className={classes.selectSlot}
							aria-label="time slot"
							name="timeSlot"
							value={values.timeSlot}
							onChange={e => setValues({ ...values, timeSlot: e.target.value })}>
							{TIMESLOTS.map((slot, index) => {
								return (values && values.timeSlot === slot ? (<FormControlLabel
									className={classes.selected}
									value={slot}
									control={<Radio style={{ display: "none" }} />}
									label={slot}
									key={index} />)
									: (<FormControlLabel
										value={slot}
										control={<Radio style={{ display: "none" }} />}
										label={slot}
										key={index} />)
								)
							})}
						</RadioGroup>
					</FormControl>
					<Button variant="contained" color="primary" type="submit">
						Book Appointment
					</Button>
				</form>
			</Container>
		</>
	)
}

export default FormPart2
