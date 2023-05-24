import React from 'react'

export default function ConfirmDialogBox() {
  return (
    <>
        <div className='confirm-box-width'>
        <div className='box-align'>
            <div className='row-block'>
                <p className='font-18'>Stock: Buy at Market</p>
                <p className='font-18'>Quality</p>
            </div>
            <div className='row-block'>
                <p className='font-18 font--bold'>AAPL</p>
                <p className='font-18 font--bold'>16</p>
            </div>
            <div className='row-block'>
                <p className='font-18'>Duration</p>
                <p className='font-18'>Day Only</p>
            </div>
            <div className='row-block'>
                <p className='font-18'>Estimate Price</p>
                <p className='font-18'>$154.08</p>
            </div>
            <div className='row-block'>
                <p className='font-18'>Quantity</p>
                <p className='font-18'>8</p>
            </div>
            <div className='row-block'>
                <p className='font-18'>Commission</p>
                <p className='font-18'>$29.95</p>
            </div>
            <div className='row-block'>
                <p className='font-18'>Estimate Total</p>
                <p className='font-18'>$2,495.2555</p>
            </div>
            <div className='btn--group form--actions'>
                <button type='submit' className='btn form--submit'>SUBMIT ORDER</button>
                <button type='reset' className='btn reset--btn'>CHANGE ORDER</button>
            </div>
            </div>
        </div>
    </>
  )
}
