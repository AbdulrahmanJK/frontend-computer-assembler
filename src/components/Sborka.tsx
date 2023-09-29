import React, { useEffect, useState } from "react";
import style from "../css/sborka.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  fetchAssembling,
  fetchOneAssembling,
} from "../features/AssemblingSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { createCart } from "../features/CartSlice";

function Sborka() {
  const assembling = useSelector((state) => state.assemblingSlice.assembling);
  const [load, setload] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const [mb, setMb] = useState(false);
  const [gpu, setGpu] = useState(false);
  const [block, setBlock] = useState(false);
  const [body, setBody] = useState(false);
  const [cpu, setCpu] = useState(false);
  const [hdd, setHdd] = useState(false);
  const [ram, setRam] = useState(false);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    dispatch(fetchAssembling());
  }, [dispatch]);

  const addCart = () => {};

  const handleBody = () => {
    setBody(!body);
  };
  const handleGpu = () => {
    setGpu(!gpu);
  };
  const handleCpu = () => {
    setCpu(!cpu);
  };
  const handleBlock = () => {
    setBlock(!block);
  };
  const handleMB = () => {
    setMb(!mb);
  };
  const handleHdd = () => {
    setHdd(!hdd);
  };
  const handleRam = () => {
    setRam(!ram);
  };

  return (
    <div>
      {assembling.map((item) => {
        if (id === item._id) {
          return (
            <div className={style.rod}>
              <div className={style.assembling}>
                <div className={style.corpus} onClick={handleBody}>
                  <img src={item.body.scetchImg} alt="" />
                </div>
                <div className={style.mb} onClick={handleMB}>
                  <img src={item.motherboard.scetchImg} alt="" />
                </div>
                <div className={style.cpu} onClick={handleCpu}>
                  <img src={item.cpu.scetchImg} alt="" />
                </div>
                <div className={style.gpu} onClick={handleGpu}>
                  <img src={item.gpu.scetchImg} alt="" />
                </div>
                <div className={style.fan}>
                  <img src={item.fan.scetchImg} alt="" />
                </div>
                <div className={style.block} onClick={handleBlock}>
                  <img src={item.powerblock.scetchImg} alt="" />
                </div>
                <div className={style.hdd} onClick={handleHdd}>
                  {item.drive.map((element) => (
                    <img src={element.scetchImg} alt="" />
                  ))}
                </div>
                <div className={style.ram} onClick={handleRam}>
                  {item.ram.map((ram) => (
                    <img src={ram.scetchImg} alt="" />
                  ))}
                </div>
              </div>
              <div className={style.openBlock}>
                <span className={style.price}>Цена сборки:{item.price}₽</span>
                <button onClick={addCart} className={style.addCart}>
                  Добавить в корзину
                </button>
                {body ? (
                  <div className={style.body}>
                    <img src={item.body.image} alt="" />
                    <div className={style.title}>{item.body.title}</div>
                    <div>
                      <button>Убрать</button>
                    </div>
                  </div>
                ) : null}
                {gpu ? (
                  <div className={style.body}>
                    <img src={item.gpu.image} alt="" />
                    <div className={style.title}>{item.gpu.title}</div>
                    <div>
                      <button>Убрать</button>
                    </div>
                  </div>
                ) : null}
                {cpu ? (
                  <div className={style.body}>
                    <img src={item.cpu.image} alt="" />
                    <div className={style.title}>{item.cpu.title}</div>
                    <div>
                      <button>Убрать</button>
                    </div>
                  </div>
                ) : null}
                {block ? (
                  <div className={style.body}>
                    <img src={item.powerblock.image} alt="" />
                    <div className={style.title}>{item.powerblock.title}</div>
                    <div>
                      <button>Убрать</button>
                    </div>
                  </div>
                ) : null}
                {mb ? (
                  <div className={style.body}>
                    <img src={item.motherboard.image} alt="" />
                    <div className={style.title}>{item.motherboard.title}</div>
                    <div>
                      <button>Убрать</button>
                    </div>
                  </div>
                ) : null}
                {hdd ? (
                  <div className={style.body}>
                    {" "}
                    {item.drive.map((hdd) => (
                      <div>
                        <img src={hdd.image} alt="" />
                      </div>
                    ))}
                    <div className={style.title}>
                      {" "}
                      {item.drive.map((hdd) => (
                        <div>{hdd.title}</div>
                      ))}
                    </div>
                    <div>
                      <button>Убрать</button>
                    </div>
                  </div>
                ) : null}
                {ram ? (
                  <div className={style.body}>
                    {" "}
                    {item.ram.map((ram) => (
                      <div>
                        <img src={ram.image} alt="" />
                      </div>
                    ))}
                    <div className={style.title}>
                      {" "}
                      {item.ram.map((ram) => (
                        <div>{ram.title}</div>
                      ))}
                    </div>
                    <div>
                      <button>Убрать</button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Sborka;
