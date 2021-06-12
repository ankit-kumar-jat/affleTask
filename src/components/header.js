import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import GlobalContext from '../context/global';

function Header() {
	const { globalStore } = React.useContext(GlobalContext)
	return (
		<React.Fragment>
			<AppBar position="static" color='primary'>
				<Toolbar variant="dense">
					{/*{globalStore && globalStore.isLoggedIn ? (
						<Button size="small" color="inherit">
							Logout
						</Button>
					) : (
						<Button size="small" color="inherit">
							Login
						</Button>
					)}*/}
					<Typography>{globalStore.appName}</Typography>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
}

export default Header
