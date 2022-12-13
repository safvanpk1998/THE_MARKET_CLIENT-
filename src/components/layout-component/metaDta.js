import React from 'react'
import { Helmet } from 'react-helmet'

function MetaDta({title}) {
  return (
    <Helmet>

<title>{title}</title>

    </Helmet>
  )
}

export default MetaDta