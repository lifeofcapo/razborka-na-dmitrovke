'use client';
import styles from './Catalog.module.css';
import CartButton from './_components/CartButton';
import { useState } from 'react';
import { FaSearch, FaCar, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { BsVinylFill } from 'react-icons/bs';
import { products , categories } from '@/app/(root)/data/Products';
import { bodyTypes, transmissions, fuelTypes, engineVolumes } from '@/app/(root)/data/Filters';
import { carBrands, carGenerations, carModels, carParts } from '@/app/(root)/data/CarParts';

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [vinQuery, setVinQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Данные для поиска по автомобилю
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [engineVolume, setEngineVolume] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [transmission, setTransmission] = useState('');

  const filteredProducts = products.filter(product => {
    // Фильтрация по поиску (артикул или название)
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Фильтрация по VIN (если введен)
    const matchesVin = vinQuery 
      ? product.partNumber.toLowerCase().includes(vinQuery.toLowerCase())
      : true;
    
    // Фильтрация по автомобилю (если выбраны параметры)
    const matchesCar = selectedBrand 
      ? product.brand === selectedBrand &&
        (!selectedPart || product.name.includes(selectedPart))
      : true;
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
                       (!priceRange.max || product.price <= parseInt(priceRange.max));
    
    return matchesSearch && matchesVin && matchesCar && matchesCategory && matchesPrice;
  });

  const clearCarSearch = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedGeneration('');
    setSelectedPart('');
    setEngineVolume('');
    setFuelType('');
    setBodyType('');
    setTransmission('');
  };

  return (
    <div className={styles.catalogPage}>
      <div className="container">
        <div className={styles.catalogHeader}>
          <h1>Каталог товаров</h1>
          <p>Найдите необходимые автозапчасти и расходные материалы</p>
        </div>

        <div className={styles.catalogContent}>
          <aside className={styles.catalogSidebar}>
            <div className={styles.filterSection}>
              <h3>Поиск по артикулу</h3>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Номер запчасти"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button className={styles.searchBtn}>
                  <FaSearch />
                </button>
              </div>
            </div>


            <div className={styles.filterSection}>
              <h3>Поиск по VIN</h3>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="VIN автомобиля"
                  value={vinQuery}
                  onChange={(e) => setVinQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button className={styles.searchBtn}>
                  <BsVinylFill />
                </button>
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3>Поиск по автомобилю</h3>
              <div className={styles.carSearch}>
                <div className={styles.selectionItem}>
                  <select 
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel('');
                      setSelectedGeneration('');
                    }}
                    className={styles.carSelect}
                  >
                    <option value="">Марка</option>
                    {carBrands.map((brand, i) => (
                      <option key={i} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectionItem}>
                  <select 
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      setSelectedGeneration('');
                    }}
                    className={styles.carSelect}
                    disabled={!selectedBrand}
                  >
                    <option value="">Модель</option>
                    {selectedBrand && carModels[selectedBrand]?.map((model, i) => (
                      <option key={i} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectionItem}>
                  <select 
                    value={selectedGeneration}
                    onChange={(e) => setSelectedGeneration(e.target.value)}
                    className={styles.carSelect}
                    disabled={!selectedModel}
                  >
                    <option value="">Поколение</option>
                    {selectedBrand && selectedModel && 
                      carGenerations[`${selectedBrand} ${selectedModel}`]?.map((gen, i) => (
                        <option key={i} value={gen}>{gen}</option>
                      ))
                    }
                  </select>
                </div>

                <div className={styles.selectionItem}>
                  <select 
                    value={selectedPart}
                    onChange={(e) => setSelectedPart(e.target.value)}
                    className={styles.carSelect}
                  >
                    <option value="">Вид запчасти</option>
                    {carParts.map((part, i) => (
                      <option key={i} value={part}>{part}</option>
                    ))}
                  </select>
                </div>

                <div 
                  className={styles.advancedToggle}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <span>Дополнительные параметры</span>
                  {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {showAdvanced && (
                  <div className={styles.advancedParams}>
                    <div className={styles.selectionItem}>
                      <select
                        value={engineVolume}
                        onChange={(e) => setEngineVolume(e.target.value)}
                        className={styles.carSelect}
                      >
                        <option value="">Объем двигателя</option>
                        {engineVolumes.map((vol, i) => (
                          <option key={i} value={vol.value}>{vol.label} л</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.selectionItem}>
                      <select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className={styles.carSelect}
                      >
                        <option value="">Тип топлива</option>
                        {fuelTypes.map((type, i) => (
                          <option key={i} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.selectionItem}>
                      <select
                        value={bodyType}
                        onChange={(e) => setBodyType(e.target.value)}
                        className={styles.carSelect}
                      >
                        <option value="">Тип кузова</option>
                        {bodyTypes.map((type, i) => (
                          <option key={i} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.selectionItem}>
                      <select
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className={styles.carSelect}
                      >
                        <option value="">Коробка передач</option>
                        {transmissions.map((type, i) => (
                          <option key={i} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <button 
                  onClick={clearCarSearch}
                  className={styles.clearButton}
                >
                  <FaTimes /> Очистить
                </button>
              </div>
            </div>

            <div className={styles.filterSection}>
              <h3>Категории</h3>
              <div className={styles.categoryFilters}>
                {categories.map(category => (
                  <div 
                    key={category.id} 
                    className={`${styles.categoryOption} ${selectedCategory === category.id ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Фильтр по цене */}
            <div className={styles.filterSection}>
              <h3>Цена</h3>
              <div className={styles.priceFilter}>
                <input
                  type="number"
                  placeholder="От"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  className={styles.priceInput}
                />
                <input
                  type="number"
                  placeholder="До"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  className={styles.priceInput}
                />
              </div>
            </div>
          </aside>

          {/* Основной контент с товарами */}
          <div className={styles.catalogMain}>
            <div className={styles.catalogInfo}>
              <p>Найдено товаров: <strong>{filteredProducts.length}</strong></p>
            </div>

            <div className={styles.productsGrid}>
              {filteredProducts.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <div className={styles.imagePlaceholder}>
                      📦
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.productBrand}>{product.brand}</div>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <div className={styles.productPrice}>{product.price} ₽</div>
                    <div className={styles.productPartNumber}>Арт.: {product.partNumber}</div>
                    <CartButton product={product} />
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.noResults}>
                <p>Товары не найдены. Попробуйте изменить параметры поиска.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}