// CODE SNIPPET: "racfp"
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { ProgressBar } from 'react-bootstrap';

const Progress = ({ percentage }) => {
  return (
    <Fragment>
      <ProgressBar animated now={ percentage } variant="primary" label={`${percentage}%`} />
    </Fragment>
  )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default Progress
