import { Container, Typography, Button, Box, CircularProgress, Link } from '@material-ui/core';
import React from 'react'
import GlobalContext from '../context/global'
import { API_KEY, CLIENT_ID } from "../config";
import { gapi } from 'gapi-script';

function AddEvent() {
	const { globalStore, setGlobalStore } = React.useContext(GlobalContext);
	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [eventLink, setEventLink] = React.useState('');

	var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
	var SCOPES = "https://www.googleapis.com/auth/calendar.events";

	const handleSubmit = () => {
		setLoading(true)
		const event = {
			'title': globalStore.meetingRoom,
			'summary': globalStore.meetingRoom,
			'location': 'Google Meet',
			'description': globalStore.description,
			'start': {
				'dateTime': globalStore.date,
				'timeZone': 'Asia/Calcutta'
			},
			'end': {
				'dateTime': globalStore.date,
				'timeZone': 'Asia/Calcutta'
			},
			'recurrence': [
				'RRULE:FREQ=DAILY;COUNT=2'
			],
			'attendees': [
				{ 'email': 'lpage@example.com' },
				{ 'email': 'sbrin@example.com' }
			],
			'reminders': {
				'useDefault': false,
				'overrides': [
					{ 'method': 'email', 'minutes': 24 * 60 },
					{ 'method': 'popup', 'minutes': 10 }
				]
			}
		};
		gapi.load('client:auth2', () => {
			gapi.client.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES
			});
			gapi.client.load('calendar', 'v3');
			gapi.auth2.getAuthInstance().signIn()
				.then(() => {
					setGlobalStore({
						...globalStore,
						isLoggedIn: true
					})
					var request = gapi.client.calendar.events.insert({
						'calendarId': 'primary',
						'resource': event
					});
					request.execute(event => {
						setLoading(false);
						setSuccess(true);
						setEventLink(event.htmlLink);
						window.open(event.htmlLink);
					});
				});
		});
		// setSuccess(true)
		// setLoading(false)
	}

	return (
		<>
			{globalStore && globalStore.date !== '' && <Container maxWidth="xs">
				{!success ? (<React.Fragment>
					<Typography>
						<strong>Name: </strong>{globalStore.name}
						<br />
						<strong>Meeting Room: </strong>{globalStore.meetingRoom}
						<br />
						<strong>Meeting Description: </strong>{globalStore.description}
						<br />
						<strong>Meeting Date: </strong> {globalStore.date.getDate()}-{globalStore.date.getMonth()}-{globalStore.date.getFullYear()}
						<br />
						<strong>Time Slot: </strong> {globalStore.timeSlot}
					</Typography>
					<Box mt={3} style={{ display: "flex", justifyContent: "center", position: "relative" }}>
						<Button variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
							Add To calendar
						</Button>
						{loading && <CircularProgress style={{ position: "absolute", top: '15%' }} size={28} />}
					</Box>
				</React.Fragment>)
					: (<div>
						<Typography>
							Event added successfully.
						</Typography>
						<Typography
							href={eventLink}
							target="_blank"
							component={Link}
							noWrap>Event Link</Typography>
					</div>)
				}
			</Container>
			}
		</>
	)
}

export default AddEvent
