import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Card,
	Grid,
	Typography
} from '@material-ui/core'
import PropTypes from 'prop-types';
import { translate } from '../../translations';

const useStyles = makeStyles((theme) => ({
	customCard: {
		'@media (min-width: 960px)': {
			width: "97%",
		},
		padding: 0,
		marginLeft: 0,
		"& .dark": {
			backgroundColor: "#f7fafb"
		},
		"& .field": {
			padding: "16px 0",
			borderBottom: '1px solid rgba(224, 224, 224, 1)',
			"& .label": {
				textTransform: 'uppercase',
				paddingLeft: 16
			},
			"& .value": {
				'@media (max-width: 600px)': {
					overflowWrap: 'anywhere'
				},
			}
		},
	}
}));



export default function Bio(props) {
	const classes = useStyles()
	const { profile, my_profile } = props
	const fields = Object.keys(profile)

  return (

    <Card className={classes.customCard}>
			{fields.map((field, index) => (
				<Grid container className={index % 2 === 0? "dark field" : "field"}>
					<Grid item xs={6} md={4} className="label">
						<Typography variant="body2" component="body2" style={{fontWeight: 600, fontSize: 14}}>
							{translate(`pages.components.profile.bio.fields.${field}`, { defaultValue: field })}
						</Typography>
					</Grid>
					<Grid item xs={6} md={8}>
						<Typography variant="body1" component="body1" >
							{(my_profile && my_profile[field]) ?? profile[field]}
						</Typography>
					</Grid>
				</Grid>
			))}
		</Card>

  );
}

Bio.propTypes = {
	profile: {
		full_name: PropTypes.string.isRequired,
		sic_code: PropTypes.string.isRequired,
		billing_address_street: PropTypes.string.isRequired,
		billing_address_state_name: PropTypes.string.isRequired,
		billing_address_postalcode: PropTypes.string.isRequired,
		billing_address_city_name: PropTypes.string.isRequired,
		phone_alternate: PropTypes.string.isRequired,
		phone_office: PropTypes.string.isRequired,
		"email 1": PropTypes.string.isRequired,
		"email 2": PropTypes.string.isRequired,
		website: PropTypes.string.isRequired,
	}
};

Bio.defaultProps = {
	profile: {
		full_name: '-',
		sic_code: '-',
		billing_address_street: '-',
		billing_address_state_name: '-',
		billing_address_postalcode: '-',
		billing_address_city_name: '-',
		phone_alternate: '-',
		phone_office: '-',
		"email 1": '-',
		"email 2": '-',
		website: '-',
	}
};

