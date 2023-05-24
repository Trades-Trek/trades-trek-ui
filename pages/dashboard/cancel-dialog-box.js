import React from 'react'

export default function CancelDialogBox() {
    return (
        <>
            <div className='confirm-box-width cancel-dialog'>
                <div className='box-align'>
                    <div className='dialog-body'>
                        <p className='font-14'>Cancel this order?</p>
                    </div>
                    <div className='btn--group form--actions'>
                        <button type='submit' className='btn form--submit'>KEEP ORDER</button>
                        <button type='reset' className='btn reset--btn'>CANCEL ORDER</button>
                    </div>
                </div>
            </div>
        </>
    )
}
