import React from 'react'

export default function JoinCompetationConfirmPopup() {
  return (
    <>
        <div className='competation-confirm-popup'>
            <div className='boxAlign'>
                <div className='popupHeader'>
                    <h4 className='font-16 font--bold'>Competition Name</h4>
                    <div className='close'>
                        <button>
                            X
                        </button>
                    </div>
                </div>
                <div className='popupBody'>
                    <div className='popupTop'>
                        <div className='grid--2'>
                            <div className='colLeftBlock'>
                                <h4 className='font-16 font--normal'>
                                    Start Game
                                    <span className='flexBox font--bold'>June 11, 2003</span>
                                </h4>
                            </div>
                            <div className='colRightBlock'>
                                <h4 className='font-16 font--normal'>
                                    End Date
                                    <span className='flexBox font--bold'>No Date</span>
                                </h4>
                            </div>
                        </div>
                        <div className='grid--2'>
                            <div className='colLeftBlock'>
                                <h4 className='font-16 font--normal'>
                                    Number of players
                                    <span className='flexBox font--bold'>989,123</span>
                                </h4>
                            </div>
                            <div className='colRightBlock'>
                                <h4 className='font-16 font--normal'>
                                    Starting Cash
                                    <span className='flexBox font--bold'>$10,000.00</span>
                                </h4>
                            </div>
                        </div>
                        <div className="btn--group form--actions">
                            <button type="submit" className="btn form--submit">CONFIRM JOIN</button>
                            <button type="reset" className="btn reset--btn">Cancel</button>
                        </div>
                    </div>
                    <div className='borderBlock'></div>
                    <div className='popupBottom'>
                        <div className='rowBlock'>
                            <h4 className='title'>Competition NAME & BASIC TRADING RULES</h4>
                            <div className='textBlock'>
                                <p className='textTitle'>Margin Trading</p>
                                <p className='textTitle bold'>Yes</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Short Selling</p>
                                <p className='textTitle bold'>Yes</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Option Trading</p>
                                <p className='textTitle bold'>Yes</p>
                            </div>
                        </div>
                        <div className='rowBlock'>
                            <h4 className='title'>BASIC Competition RULES</h4>
                            <div className='textBlock'>
                                <p className='textTitle'>Late Entry</p>
                                <p className='textTitle bold'>Yes</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Portfolio Viewing</p>
                                <p className='textTitle bold'>Yes</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Portfolio Resetting</p>
                                <p className='textTitle bold'>Yes</p>
                            </div>
                        </div>
                        <div className='rowBlock'>
                            <h4 className='title'>ADVANCED Competition RULES</h4>
                            <div className='textBlock'>
                                <p className='textTitle'>Market Delay</p>
                                <p className='textTitle bold'>20 Minutes</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Daily Volume</p>
                                <p className='textTitle bold'>0.10%</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Quick Sell</p>
                                <p className='textTitle bold'>
                                15 minutes</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Minimum Price</p>
                                <p className='textTitle bold'>$1.00</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Minimum Price Short</p>
                                <p className='textTitle bold'>$5.00</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Minimum Stock For Margin</p>
                                <p className='textTitle bold'>$5.00</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Minimum Stock For Margin</p>
                                <p className='textTitle bold'>$5.00</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Minimum Stock For Margin</p>
                                <p className='textTitle bold'>$5.00</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Minimum Stock For Margin</p>
                                <p className='textTitle bold'>$5.00</p>
                            </div>
                            <div className='textBlock'>
                                <p className='textTitle'>Minimum Stock For Margin</p>
                                <p className='textTitle bold'>$5.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
