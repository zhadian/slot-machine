import React from 'react'
import classes from './Reel.module.css'
import all from '../../../Assets/all.png'

const Reel = (props) => {
    return (
        <div id="float" style={{ top: props.top, left: props.left }} className={` d-flex justify-content-center align-items-center flex-column overflow-hidden position-absolute ${classes.reels}`}>
            {props.status === 'rolling' &&
                <div style={{ animation: ` ${classes.floatBubble} ${props.speed} linear infinite` }} className={`w-100 position-relative h-100  ${classes.anim}`}>
                    <img alt={'all'} src={all} />
                    <img alt={'all'} src={all} />
                </div>}
            {props.status === 'start' &&
                <div className='h-100 d-flex justify-content-start flex-column  align-items-start'>
                    <img alt={'top'} src={all} />
                </div>}
            {props.status === 'end' &&
                <div className={`d-flex justify-content-center align-items-center flex-column ${classes.end}`}>
                    <img alt={'top'} src={props.reels?.urls.top} />
                    {props.reels?.urls.center ? <img alt={'center'} src={props.reels?.urls.center} /> : null}
                    < img alt={'bottom'} src={props.reels?.urls.bottom} />
                </div>}
        </div>
    )
}

export default Reel
