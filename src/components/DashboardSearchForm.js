'use client';

import { useState } from 'react';
import { FaCar, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsVinylFill } from 'react-icons/bs';
import { bodyTypes, fuelTypes, engineVolumes } from '@/app/(root)/data/Filters';
import { carBrands, carGenerations, carModels, carParts } from '@/app/(root)/data/CarParts';
import Link from 'next/link';
import styles from './Dashsearchform.module.css';

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
    <div className={styles.searchContainer}>
      <div className={styles.searchCard}>
        <div className={styles.searchTabs}>
          <button 
            className={`${styles.searchTab} ${activeTab === 'partNumber' ? styles.active : ''}`}
            onClick={() => setActiveTab('partNumber')}
          >
            <FaSearch className={styles.tabIcon} /> ПО НОМЕРУ ЗАПЧАСТИ
          </button>
          <button 
            className={`${styles.searchTab} ${activeTab === 'vin' ? styles.active : ''}`}
            onClick={() => setActiveTab('vin')}
          >
            <BsVinylFill className={styles.tabIcon} /> ПО VIN АВТОМОБИЛЯ
          </button>
          <button 
            className={`${styles.searchTab} ${activeTab === 'car' ? styles.active : ''}`}
            onClick={() => setActiveTab('car')}
          >
            <FaCar className={styles.tabIcon} /> ПО АВТОМОБИЛЮ
          </button>
        </div>

        <div className={styles.searchContent}>
          {activeTab === 'partNumber' && (
            <div className={styles.searchGroup}>
              <input
                type="text"
                placeholder="Введите номер детали"
                className={styles.searchInput}
              />
              <Link href={"/catalog"}>
                <button className={styles.searchButton}>
                  НАЧАТЬ ПОИСК
                </button>
              </Link>
            </div>
          )}

          {activeTab === 'vin' && (
            <div className={styles.vinSearch}>
              <div className={styles.vinDescription}>
                <h3>ПО ОРИГИНАЛЬНЫМ КАТАЛОГАМ</h3>
                <p>VIN автомобиля является самым надежным идентификатором. Если ищете японский автомобиль, то введите FRAME</p>
                <div className={styles.searchGroup}>
                  <input
                    type="text"
                    placeholder="VIN или FRAME"
                    className={styles.searchInput}
                  />
                </div>
              </div>
              <div className={styles.vinAlternative}>
                <h3>ВЫБЕРИТЕ МОДЕЛЬ ПО ПАРАМЕТРАМ</h3>
                <p>Если не помните VIN-номер, то воспользуйтесь поиском по параметрам в оригинальных каталогах</p>
                <Link href={"/catalog"}>
                  <button className={styles.secondaryButton}>
                    ПОИСК ПО ПАРАМЕТРАМ
                  </button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'car' && (
            <div className={styles.carSearch}>
              <div className={styles.carSelection}>
                <div className={styles.mainSelectionRow}>
                  <div className={styles.selectionItem}>
                    <span>Марки</span>
                    <select 
                      className={styles.carSelect}
                      value={selectedBrand}
                      onChange={handleBrandChange}
                    >
                      <option value="">Выберите марку</option>
                      {carBrands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.selectionItem}>
                    <span>Модели</span>
                    <select 
                      className={styles.carSelect}
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
                  
                  <div className={styles.selectionItem}>
                    <span>Поколение</span>
                    <select 
                      className={styles.carSelect}
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
                
                <div className={styles.selectionRow}>
                  <span>Выберите запчасть</span>
                  <select 
                    className={styles.carSelect}
                    value={selectedPart}
                    onChange={handlePartChange}
                  >
                    <option value="">Выберите запчасть</option>
                    {carParts.map((part, index) => (
                      <option key={index} value={part}>{part}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.advancedParamsToggle} onClick={toggleAdvanced}>
                  <span>Дополнительные параметры</span>
                  {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                <div className={`${styles.advancedParams} ${showAdvanced ? styles.visible : ''}`}>
                  <div className={styles.advancedGrid}>
                    <div className={styles.advancedCol}>
                      <div className={styles.selectionRow}>
                        <span>Объем двигателя</span>
                        <select 
                          className={styles.carSelect}
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
                    
                    <div className={styles.advancedCol}>
                      <div className={styles.selectionRow}>
                        <span>Тип топлива</span>
                        <select 
                          className={styles.carSelect}
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
                    
                    <div className={styles.advancedCol}>
                      <div className={styles.selectionRow}>
                        <span>Кузов</span>
                        <select 
                          className={styles.carSelect}
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
              
              <div className={styles.searchActions}>
                <button 
                  className={styles.searchButton}
                  disabled={!selectedPart || (!selectedBrand && !selectedModel && !selectedGeneration)}
                >
                  НАЧАТЬ ПОИСК
                </button>
                <button 
                  className={styles.clearButton}
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