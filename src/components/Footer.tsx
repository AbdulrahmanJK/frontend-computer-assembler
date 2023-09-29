import React from 'react';
import style from '../css/footer.module.css'

function Footer() {
  return (
    <>
    <div className={style.dummy_page}>
      Mobile responsive footer
    </div>
    <div className={style.footer}>
      <div className={style.contain}>
        <div className={style.col}>
          <h1>Company</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className={style.col}>
          <h1>Products</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className={style.col}>
          <h1>Accounts</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className={style.col}>
          <h1>Resources</h1>
          <ul>
            <li>Webmail</li>
            <li>Redeem code</li>
            <li>WHOIS lookup</li>
            <li>Site map</li>
            <li>Web templates</li>
            <li>Email templates</li>
          </ul>
        </div>
        <div className={style.col}>
          <h1>Support</h1>
          <ul>
            <li>Contact us</li>
            <li>Web chat</li>
            <li>Open ticket</li>
          </ul>
        </div>
        <div className={style.col_social}>
          <h1>Social</h1>
          <ul>
            <li><img src="https://svgshare.com/i/5fq.svg" width="32" style={{ width: '32px' }} /></li>
            <li><img src="https://svgshare.com/i/5eA.svg" width="32" style={{ width: '32px' }} /></li>
            <li><img src="https://svgshare.com/i/5f_.svg" width="32" style={{ width: '32px' }} /></li>
          </ul>
        </div>
        <div className={style.clearfix}></div>
      </div>
    </div>
    {/* END OF FOOTER */}
    </>
  );
}

export default Footer;
