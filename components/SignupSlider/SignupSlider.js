import React, { useState } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';

export default function SignupSlider() {
  const settings = {
    fade: true,
    dots: true,
    speed: 500, // ms
    autoplay: true,
    initialSlide: 0,
    lazyLoad: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <Slider {...settings}>
        <div>
          <div className="login--icons">
            <div className="purple--bg-circle--transparent">
              <Image
                src="/images/purple-circle-transparent.svg"
                layout="responsive"
                width={122}
                height={122}
                alt=""
              />
              <div className="purple--bg-circle">
                <Image
                  src="/images/purple-circle.svg"
                  layout="responsive"
                  width={78}
                  height={78}
                  alt=""
                />
              </div>
            </div>

            <div className="portfolio--icon icons">
              <Image
                src="/images/portfolio-icon.svg"
                layout="responsive"
                width={41}
                height={38}
                alt=""
              />
            </div>
          </div>
          <div className="form--title">
            <h1>Portfolio</h1>
          </div>
          <div className="right--content">
            <p>
              On teada-tuntud fakt, et lehe kujunduse vaatamisel juhib selle
              loetav sisu lugeja tähelepanu kõrvale.
            </p>
          </div>
        </div>
        <div>
          <div className="login--icons">
            <div className="purple--bg-circle--transparent">
              <Image
                src="/images/purple-circle-transparent.svg"
                layout="responsive"
                width={122}
                height={122}
                alt=""
              />
              <div className="purple--bg-circle">
                <Image
                  src="/images/purple-circle.svg"
                  layout="responsive"
                  width={78}
                  height={78}
                  alt=""
                />
              </div>
            </div>

            <div className="portfolio--icon icons">
              <Image
                src="/images/trade.png"
                layout="responsive"
                width={41}
                height={38}
                alt=""
              />
            </div>
          </div>
          <div className="form--title">
            <h1>Trade</h1>
          </div>
          <div className="right--content">
            <p>
              On teada-tuntud fakt, et lehe kujunduse vaatamisel juhib selle
              loetav sisu lugeja tähelepanu kõrvale.
            </p>
          </div>
        </div>
        <div>
          <div className="login--icons">
            <div className="purple--bg-circle--transparent">
              <Image
                src="/images/purple-circle-transparent.svg"
                layout="responsive"
                width={122}
                height={122}
                alt=""
              />
              <div className="purple--bg-circle">
                <Image
                  src="/images/purple-circle.svg"
                  layout="responsive"
                  width={78}
                  height={78}
                  alt=""
                />
              </div>
            </div>

            <div className="portfolio--icon icons">
              <Image
                src="/images/learning.svg"
                layout="responsive"
                width={41}
                height={38}
                alt=""
              />
            </div>
          </div>
          <div className="form--title">
            <h1>Learning</h1>
          </div>
          <div className="right--content">
            <p>
              On teada-tuntud fakt, et lehe kujunduse vaatamisel juhib selle
              loetav sisu lugeja tähelepanu kõrvale.
            </p>
          </div>
        </div>
        <div>
          <div className="login--icons">
            <div className="purple--bg-circle--transparent">
              <Image
                src="/images/purple-circle-transparent.svg"
                layout="responsive"
                width={122}
                height={122}
                alt=""
              />
              <div className="purple--bg-circle">
                <Image
                  src="/images/purple-circle.svg"
                  layout="responsive"
                  width={78}
                  height={78}
                  alt=""
                />
              </div>
            </div>

            <div className="portfolio--icon icons">
              <Image
                src="/images/competition.svg"
                layout="responsive"
                width={41}
                height={38}
                alt=""
              />
            </div>
          </div>
          <div className="form--title">
            <h1>Competition</h1>
          </div>
          <div className="right--content">
            <p>
              On teada-tuntud fakt, et lehe kujunduse vaatamisel juhib selle
              loetav sisu lugeja tähelepanu kõrvale.
            </p>
          </div>
        </div>
        <div>
          <div className="login--icons">
            <div className="purple--bg-circle--transparent">
              <Image
                src="/images/purple-circle-transparent.svg"
                layout="responsive"
                width={122}
                height={122}
                alt=""
              />
              <div className="purple--bg-circle">
                <Image
                  src="/images/purple-circle.svg"
                  layout="responsive"
                  width={78}
                  height={78}
                  alt=""
                />
              </div>
            </div>

            <div className="portfolio--icon icons">
              <Image
                src="/images/analysis.svg"
                layout="responsive"
                width={41}
                height={38}
                alt=""
              />
            </div>
          </div>
          <div className="form--title">
            <h1>Analysis</h1>
          </div>
          <div className="right--content">
            <p>
              On teada-tuntud fakt, et lehe kujunduse vaatamisel juhib selle
              loetav sisu lugeja tähelepanu kõrvale.
            </p>
          </div>
        </div>
      </Slider>
    </>
  );
}
