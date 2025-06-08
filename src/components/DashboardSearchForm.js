'use client';

import { useState } from 'react';
import { FaCar, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsVinylFill } from 'react-icons/bs';
import { bodyTypes, fuelTypes, engineVolumes } from '@/app/(root)/data/Filters';
import { carBrands, carGenerations, carModels, carParts } from '@/app/(root)/data/CarParts';
import Link from 'next/link';

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState('partNumber');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [engineVolume, setEngineVolume] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [bodyType, setBodyType] = useState('');

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setSelectedGeneration('');
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSelectedGeneration('');
  };

  const handleGenerationChange = (e) => {
    setSelectedGeneration(e.target.value);
  };

  const handlePartChange = (e) => {
    setSelectedPart(e.target.value);
  };

  const clearSelection = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedGeneration('');
    setSelectedPart('');
    setEngineVolume('');
    setFuelType('');
    setBodyType('');
    setShowAdvanced(false);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="search-container">
      <div className="search-card">
        <div className="search-tabs">
          <button 
            className={`search-tab ${activeTab === 'partNumber' ? 'active' : ''}`}
            onClick={() => setActiveTab('partNumber')}
          >
            <FaSearch className="tab-icon" /> ПО НОМЕРУ ЗАПЧАСТИ
          </button>
          <button 
            className={`search-tab ${activeTab === 'vin' ? 'active' : ''}`}
            onClick={() => setActiveTab('vin')}
          >
            <BsVinylFill className="tab-icon" /> ПО VIN АВТОМОБИЛЯ
          </button>
          <button 
            className={`search-tab ${activeTab === 'car' ? 'active' : ''}`}
            onClick={() => setActiveTab('car')}
          >
            <FaCar className="tab-icon" /> ПО АВТОМОБИЛЮ
          </button>
        </div>

        <div className="search-content">
          {activeTab === 'partNumber' && (
            <div className="search-group">
              <input
                type="text"
                placeholder="Введите номер детали"
                className="search-input"
              />
              <Link href={"/catalog"}>
                <button className="search-button">
                  НАЧАТЬ ПОИСК
                </button>
              </Link>
            </div>
          )}

          {activeTab === 'vin' && (
            <div className="vin-search">
              <div className="vin-description">
                <h3>ПО ОРИГИНАЛЬНЫМ КАТАЛОГАМ</h3>
                <p>VIN автомобиля является самым надежным идентификатором. Если ищете японский автомобиль, то введите FRAME</p>
                <div className="search-group">
                  <input
                    type="text"
                    placeholder="VIN или FRAME"
                    className="search-input"
                  />
                </div>
              </div>
              <div className="vin-alternative">
                <h3>ВЫБЕРИТЕ МОДЕЛЬ ПО ПАРАМЕТРАМ</h3>
                <p>Если не помните VIN-номер, то воспользуйтесь поиском по параметрам в оригинальных каталогах</p>
                <button className="secondary-button">
                  ПОИСК ПО ПАРАМЕТРАМ
                </button>
              </div>
            </div>
          )}

          {activeTab === 'car' && (
            <div className="car-search">
              <div className="car-selection">
                <div className="main-selection-row">
                  <div className="selection-item">
                    <span>Марки</span>
                    <select 
                      className="car-select"
                      value={selectedBrand}
                      onChange={handleBrandChange}
                    >
                      <option value="">Выберите марку</option>
                      {carBrands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="selection-item">
                    <span>Модели</span>
                    <select 
                      className="car-select"
                      value={selectedModel}
                      onChange={handleModelChange}
                      disabled={!selectedBrand}
                    >
                      <option value="">Выберите модель</option>
                      {selectedBrand && carModels[selectedBrand]?.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="selection-item">
                    <span>Поколение</span>
                    <select 
                      className="car-select"
                      value={selectedGeneration}
                      onChange={handleGenerationChange}
                      disabled={!selectedModel}
                    >
                      <option value="">Выберите поколение</option>
                      {selectedBrand && selectedModel && carGenerations[`${selectedBrand} ${selectedModel}`]?.map((gen, index) => (
                        <option key={index} value={gen}>{gen}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="selection-row">
                  <span>Выберите запчасть</span>
                  <select 
                    className="car-select"
                    value={selectedPart}
                    onChange={handlePartChange}
                  >
                    <option value="">Выберите запчасть</option>
                    {carParts.map((part, index) => (
                      <option key={index} value={part}>{part}</option>
                    ))}
                  </select>
                </div>

                <div className="advanced-params-toggle" onClick={toggleAdvanced}>
                  <span>Дополнительные параметры</span>
                  {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <div className={`advanced-params ${showAdvanced ? 'visible' : ''}`}>
                  <div className="advanced-grid">
                    <div className="advanced-col">
                      <div className="selection-row">
                        <span>Объем двигателя</span>
                        <select 
                          className="car-select"
                          value={engineVolume}
                          onChange={(e) => setEngineVolume(e.target.value)}
                        >
                          <option value="">Не указан</option>
                          {engineVolumes.map((volume) => (
                            <option key={volume.value} value={volume.value}>
                              {volume.label} л
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="advanced-col">
                      <div className="selection-row">
                        <span>Тип топлива</span>
                        <select 
                          className="car-select"
                          value={fuelType}
                          onChange={(e) => setFuelType(e.target.value)}
                        >
                          <option value="">Не указан</option>
                          {fuelTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="advanced-col">
                      <div className="selection-row">
                        <span>Кузов</span>
                        <select 
                          className="car-select"
                          value={bodyType}
                          onChange={(e) => setBodyType(e.target.value)}
                        >
                          <option value="">Не указан</option>
                          {bodyTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="search-actions">
                <button 
                  className="search-button"
                  disabled={!selectedPart || (!selectedBrand && !selectedModel && !selectedGeneration)}
                >
                  НАЧАТЬ ПОИСК
                </button>
                <button 
                  className="clear-button"
                  onClick={clearSelection}
                >
                  Очистить <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}