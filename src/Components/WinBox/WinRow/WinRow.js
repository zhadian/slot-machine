import React from 'react'
import classes from './WinRow.module.css'

const WinRow = () => {
    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.name}`}></div>
            <div className={`${classes.point}`}></div>
        </div>
    )
}

export default WinRow
