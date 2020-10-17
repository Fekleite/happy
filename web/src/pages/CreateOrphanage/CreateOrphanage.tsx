import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus, FiX, FiInfo } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

import '../../styles/pages/create-orphanage.css';

import Sidebar from "../../components/Sidebar/Sidebar";
import Tooltip from "../../components/Tooltip/Tolltip";

import mapIcon from "../../utils/mapIcon";
import api from "../../services/api";


const CreateOrphanage: React.FC = () =>{
  const history = useHistory();

  const [showTooltip, setShowTooltip] = useState(false);

  const [position, setPosition] = useState({latitude: 0, longitude: 0});
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(e: LeafletMouseEvent){
    const { lat, lng } = e.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    const selectedImages = Array.from(e.target.files)
    setImages([...images, ...selectedImages]);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  function handleRemoveImages(imgIndex: number) {
    const removedImages = images.filter((image, index) => index !== imgIndex);
    setImages(removedImages);

    const removedPreviewImages = previewImages.filter((image, index) => index !== imgIndex);
    setPreviewImages(removedPreviewImages);
  }

  async function handleSubmit(e: FormEvent){
    e.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));

    images.forEach(image => {
      data.append('images', image);
    });
    
    const result = await api.post("orphanages", data);
    
    if(result.status === 201) {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false)
        history.push('/app');
      }, 3000)
    }
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        {showTooltip && (
          <Tooltip id="success" message="Cadastro realizado com sucesso!">
            <FiInfo size={24} color="#39CC83" />
          </Tooltip>
        )}

        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-19.9342589,-43.176509]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              
              {position.latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div className="image-content">
                      <img src={image} alt={name}/>
                      <span onClick={() => handleRemoveImages(index)}>
                        <FiX size={24} color="#FF669D"/>
                      </span>
                    </div>
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple type="file" id="image[]" onChange={handleSelectImages} />
     
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input id="opening_hours" value={openingHours} onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                  type="button"
                  className={!openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
