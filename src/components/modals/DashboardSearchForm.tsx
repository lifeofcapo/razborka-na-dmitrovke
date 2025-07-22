"use client";

import { useEffect, useState } from "react";
import {
  FaCar,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { BsVinylFill } from "react-icons/bs";
import Link from "next/link";
import styles from "./Dashsearchform.module.css";
import { bodyTypes, fuelTypes, engineVolumes } from "@/data/SearchMainFilters";
import { carParts } from "@/data/CarParts";
import { Brand, Model, Generation } from "@/types/car";

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState<"partNumber" | "vin" | "car">(
    "partNumber"
  );
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const [selectedPart, setSelectedPart] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [engineVolume, setEngineVolume] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [bodyType, setBodyType] = useState<string>("");

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then(setBrands)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedBrand) return;
    fetch(`/api/models?brand=${selectedBrand}`)
      .then((res) => res.json())
      .then(setModels)
      .catch(console.error);
  }, [selectedBrand]);

  useEffect(() => {
    if (!selectedBrand || !selectedModel) return;
    fetch(`/api/generations?brand=${selectedBrand}&model=${selectedModel}`)
      .then((res) => res.json())
      .then(setGenerations)
      .catch(console.error);
  }, [selectedBrand, selectedModel]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel("");
    setSelectedGeneration("");
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    setSelectedGeneration("");
  };

  const clearSelection = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedGeneration("");
    setSelectedPart("");
    setEngineVolume("");
    setFuelType("");
    setBodyType("");
    setShowAdvanced(false);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchCard}>
        <div className={styles.searchTabs}>
          <button
            className={`${styles.searchTab} ${
              activeTab === "partNumber" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("partNumber")}
          >
            <FaSearch className={styles.tabIcon} /> ПО НОМЕРУ ЗАПЧАСТИ
          </button>
          <button
            className={`${styles.searchTab} ${
              activeTab === "vin" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("vin")}
          >
            <BsVinylFill className={styles.tabIcon} /> ПО VIN АВТОМОБИЛЯ
          </button>
          <button
            className={`${styles.searchTab} ${
              activeTab === "car" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("car")}
          >
            <FaCar className={styles.tabIcon} /> ПО АВТОМОБИЛЮ
          </button>
        </div>

        <div className={styles.searchContent}>
          {activeTab === "partNumber" && (
            <div className={styles.searchGroup}>
              <input
                type="text"
                placeholder="Введите номер детали"
                className={styles.searchInput}
              />
              <Link href="/catalog">
                <button className={styles.searchButton}>НАЧАТЬ ПОИСК</button>
              </Link>
            </div>
          )}

          {activeTab === "vin" && (
            <div className={styles.vinSearch}>
              <div className={styles.vinDescription}>
                <h3>ПО ОРИГИНАЛЬНЫМ КАТАЛОГАМ</h3>
                <p>
                  VIN автомобиля является самым надежным идентификатором. Если
                  ищете японский автомобиль, то введите FRAME
                </p>
                <input
                  type="text"
                  placeholder="VIN или FRAME"
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.vinAlternative}>
                <h3>ВЫБЕРИТЕ МОДЕЛЬ ПО ПАРАМЕТРАМ</h3>
                <p>
                  Если не помните VIN-номер, воспользуйтесь параметрами поиска
                </p>
                <Link href="/catalog">
                  <button className={styles.secondaryButton}>
                    ПОИСК ПО ПАРАМЕТРАМ
                  </button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === "car" && (
            <div className={styles.carSearch}>
              <div className={styles.carSelection}>
                <div className={styles.mainSelectionRow}>
                  <select
                    className={styles.carSelect}
                    value={selectedBrand}
                    onChange={handleBrandChange}
                  >
                    <option value="">Марка</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className={styles.carSelect}
                    value={selectedModel}
                    onChange={handleModelChange}
                    disabled={!selectedBrand}
                  >
                    <option value="">Модель</option>
                    {models.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className={styles.carSelect}
                    value={selectedGeneration}
                    onChange={(e) => setSelectedGeneration(e.target.value)}
                    disabled={!selectedModel}
                  >
                    <option value="">Поколение</option>
                    {generations.map((g) => (
                      <option key={g.id} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  className={styles.carSelect}
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                >
                  <option value="">Запчасть</option>
                  {carParts.map((part, i) => (
                    <option key={i} value={part}>
                      {part}
                    </option>
                  ))}
                </select>

                <div
                  className={styles.advancedParamsToggle}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <span>Дополнительные параметры</span>
                  {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {showAdvanced && (
                  <div className={styles.advancedParams}>
                    <select
                      className={styles.carSelect}
                      value={engineVolume}
                      onChange={(e) => setEngineVolume(e.target.value)}
                    >
                      <option value="">Объем двигателя</option>
                      {engineVolumes.map((v) => (
                        <option key={v.value} value={v.value}>
                          {v.label} л
                        </option>
                      ))}
                    </select>

                    <select
                      className={styles.carSelect}
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                    >
                      <option value="">Тип топлива</option>
                      {fuelTypes.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>

                    <select
                      className={styles.carSelect}
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                    >
                      <option value="">Тип кузова</option>
                      {bodyTypes.map((b, i) => (
                        <option key={i} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className={styles.searchActions}>
                <button
                  className={styles.searchButton}
                  disabled={!selectedPart || (!selectedBrand && !selectedModel)}
                >
                  НАЧАТЬ ПОИСК
                </button>
                <button className={styles.clearButton} onClick={clearSelection}>
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
