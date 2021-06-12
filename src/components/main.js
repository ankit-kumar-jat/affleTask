import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Box } from '@material-ui/core';


function Main(props) {

	return (
		<main >
			<Container maxWidth="xs">
				<Box mt={3} mb={5}>
					<Typography
						variant="h4"
						color="initial"
						align="center"
						variantMapping={{ h4: "h1" }}
					>
						Meeting Room Booking
					</Typography>
				</Box>
			</Container>
			{props.children}
		</main>
	)
}

export default Main
