import { CarouselHome } from "./cssComponent/Carousel";
import style from '../css/homePage.module.css'
import msi from '../components/img/partnersSVGs/MSI.png'
import amd from '../components/img/partnersSVGs/AMD.png'
import gigabyte from '../components/img/partnersSVGs/gigabyte.png'
import kingston from '../components/img/partnersSVGs/kingston.png'
import intocode from '../components/img/partnersSVGs/intocode.png'
import intel from '../components/img/partnersSVGs/intel.png'
import rog from '../components/img/partnersSVGs/ROG.png'
import hyperx from '../components/img/partnersSVGs/hyperX.png'
import cyberSensorica from '../components/img/partnersSVGs/cyberSensorica.png'
import nvidia from '../components/img/partnersSVGs/nvidia.png'
import { CarouselCustom } from "./cssComponent/customsCarousel";
import  Footer  from './Footer'


function HomePage() {
  return (
    <div>
      <CarouselHome />
      <div className={style.body}>
        <div className={style.partners}>
        <h1>Лучшие комплектующие</h1>
        <h3>Мы работаем с лидерами рынка</h3>
        </div>
        <div className={style.partnersImg}>
          <img className={style.rog} src={rog} alt="rog" />
          <img className={style.amd} src={amd} alt="amd" />
          <img className={style.intel} src={intel} alt="intel" />
          <img className={style.gigabyte} src={gigabyte} alt="gigabyte" />
          <img className={style.intocode} src={intocode} alt="intocode" />
          <img className={style.msi} src={msi} alt="msi" />
          <img className={style.hyperx} src={hyperx} alt="hyperX" />
          <img className={style.kingston} src={kingston} alt="kingston" />
          <img className={style.cyberSensorica} src={cyberSensorica} alt="CyberSensorica" />
          <img className={style.intel} src={intel} alt="intel" />
          <img className={style.nvidia} src={nvidia} alt="nvidia" />
        </div>
        <div className={style.projectsText}>
          <h1>Эксклюзивные проекты</h1>
          <h3>Уникальные компьютеры, собранные для наших клиентов и друзей</h3>
        </div>
        <div className={style.carouselDiv}><CarouselCustom/></div>
      </div>
      <div>
        < Footer/> 
      </div>


    </div>
  );
}

export default HomePage;
