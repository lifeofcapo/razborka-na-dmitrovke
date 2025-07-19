import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    const volumes = [
      { value: "0", label: "0" },
      { value: "0.6", label: "0.6" },
      { value: "0.7", label: "0.7" },
      { value: "0.8", label: "0.8" },
      { value: "0.9", label: "0.9" },
      { value: "1", label: "1" },
      { value: "1.1", label: "1.1" },
      { value: "1.2", label: "1.2" },
      { value: "1.25", label: "1.25" },
      { value: "1.3", label: "1.3" },
      { value: "1.4", label: "1.4" },
      { value: "1.5", label: "1.5" },
      { value: "1.6", label: "1.6" },
      { value: "1.7", label: "1.7" },
      { value: "1.8", label: "1.8" },
      { value: "1.9", label: "1.9" },
      { value: "2", label: "2" },
      { value: "2.1", label: "2.1" },
      { value: "2.2", label: "2.2" },
      { value: "2.3", label: "2.3" },
      { value: "2.4", label: "2.4" },
      { value: "2.5", label: "2.5" },
      { value: "2.6", label: "2.6" },
      { value: "2.7", label: "2.7" },
      { value: "2.8", label: "2.8" },
      { value: "2.9", label: "2.9" },
      { value: "3", label: "3" },
      { value: "3.1", label: "3.1" },
      { value: "3.2", label: "3.2" },
      { value: "3.3", label: "3.3" },
      { value: "3.4", label: "3.4" },
      { value: "3.5", label: "3.5" },
      { value: "3.6", label: "3.6" },
      { value: "3.7", label: "3.7" },
      { value: "3.8", label: "3.8" },
      { value: "3.9", label: "3.9" },
      { value: "4", label: "4" },
      { value: "4.2", label: "4.2" },
      { value: "4.3", label: "4.3" },
      { value: "4.4", label: "4.4" },
      { value: "4.5", label: "4.5" },
      { value: "4.6", label: "4.6" },
      { value: "4.7", label: "4.7" },
      { value: "4.8", label: "4.8" },
      { value: "5", label: "5" },
      { value: "5.3", label: "5.3" },
      { value: "5.4", label: "5.4" },
      { value: "5.5", label: "5.5" },
      { value: "5.6", label: "5.6" },
      { value: "5.7", label: "5.7" },
      { value: "5.9", label: "5.9" },
      { value: "6", label: "6" },
      { value: "6.2", label: "6.2" },
      { value: "6.9", label: "6.9" },
      { value: "10.3", label: "10.3" },
      { value: "16", label: "16" },
    ];

    for (const vol of volumes) {
      await prisma.engineVolume.upsert({
        where: { value: vol.value },
        update: {},
        create: vol,
      });
    }

    const categories = [
      { slug: "all", name: "Все категории" },
      { slug: "chemistry", name: "Автохимия" },
      { slug: "engine", name: "Двигатель" },
      { slug: "brake-pads", name: "Колесные диски покрышки" },
      { slug: "body-interior", name: "Кузов внутри" },
      { slug: "body-exterior", name: "Кузов наружные элементы" },
      { slug: "body-glass", name: "Кузовные стекла" },
      { slug: "optics", name: "Оптика" },
      { slug: "pneumatic", name: "Пневматическая система" },
      { slug: "engine-suspension", name: "Подвеска двигателя и КПП" },
      { slug: "rear-suspension", name: "Подвеска задних колес" },
      { slug: "front-suspension", name: "Подвеска передних колес" },
      { slug: "steering", name: "Рулевое управление" },
      { slug: "exhaust", name: "Система выпуска отработанных газов" },
      { slug: "conditioning", name: "Система кондиционирования" },
      { slug: "cooling", name: "Система охлаждения" },
      { slug: "related", name: "Сопутствующие товары" },
      { slug: "brake-system", name: "Тормозная система" },
      { slug: "transmission", name: "Трансмиссия" },
      { slug: "electrical", name: "Электрооснащение" },
    ];

    for (const cat of categories) {
      await prisma.partCategory.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
    }

    const brakeCategory = await prisma.partCategory.findUnique({
      where: { slug: "brake-system" },
    });

    if (brakeCategory) {
      const brakeParts = [
        { name: "Тормозные колодки", slug: "brake-pads" },
        { name: "Тормозные диски", slug: "brake-discs" },
        // ...
      ];

      for (const part of brakeParts) {
        await prisma.carPart.upsert({
          where: { slug: part.slug },
          update: {},
          create: {
            ...part,
            categoryId: brakeCategory.id,
          },
        });
      }
    }
    await prisma.post.createMany({
      data: [
        {
          title: "Новые поступления запчастей для BMW",
          content: `
          <p>Мы рады сообщить, что наш ассортимент запчастей для автомобилей BMW пополнился новыми оригинальными деталями. Теперь вы можете найти всё необходимое для серий 3, 5 и 7.</p>
          <p>В наличии:</p>
          <ul>
            <li>Тормозные колодки и диски</li>
            <li>Фильтры (воздушные, масляные, салонные)</li>
            <li>Подвеска (амортизаторы, пружины, рычаги)</li>
            <li>Осветительные приборы</li>
          </ul>
          <p>Все детали поставляются напрямую от производителя с гарантией качества.</p>
        `,
          excerpt:
            "В нашем каталоге появились новые оригинальные запчасти для BMW серий 3, 5 и 7.",
          slug: "new-bmw-parts",
          image: "/blog/bmw-parts.jpg",
          published: true,
          publishedAt: new Date("2024-05-15"),
        },
        {
          title: "Скидки на масла до 30%",
          content: `
          <p>Только до конца месяца действуют специальные предложения на моторные и трансмиссионные масла ведущих брендов: Castrol, Mobil 1, Liqui Moly.</p>
          <p>Акция распространяется на следующие продукты:</p>
          <ul>
            <li>Моторные масла для бензиновых и дизельных двигателей</li>
            <li>Трансмиссионные масла</li>
            <li>Тормозные жидкости</li>
            <li>Охлаждающие жидкости</li>
          </ul>
          <p>Успейте приобрести по выгодной цене!</p>
        `,
          excerpt:
            "Только до конца месяца специальные предложения на моторные и трансмиссионные масла.",
          slug: "oil-discounts",
          image: "/blog/oils.jpg",
          published: true,
          publishedAt: new Date("2024-05-10"),
        },
        {
          title: "Расширение ассортимента шин",
          content: `
          <p>Теперь в нашем магазине представлен полный ассортимент шин от ведущих мировых производителей: Michelin, Bridgestone, Goodyear, Pirelli.</p>
          <p>В наличии:</p>
          <ul>
            <li>Летние, зимние и всесезонные шины</li>
            <li>Шины для легковых автомобилей, внедорожников и коммерческого транспорта</li>
            <li>Шины различных размеров и скоростных индексов</li>
          </ul>
          <p>Мы предлагаем бесплатную доставку и профессиональный монтаж.</p>
        `,
          excerpt:
            "Теперь в наличии шины всех сезонов от ведущих мировых производителей.",
          slug: "tires-expansion",
          image: "/blog/tires.jpg",
          published: true,
          publishedAt: new Date("2024-05-05"),
        },
        {
          title: "Новая услуга: компьютерная диагностика",
          content: `
          <p>Спешим сообщить о запуске новой услуги - компьютерная диагностика автомобилей всех марок!</p>
          <p>Наши преимущества:</p>
          <ul>
            <li>Современное диагностическое оборудование</li>
            <li>Опытные специалисты</li>
            <li>Быстрое выявление неисправностей</li>
            <li>Честные цены</li>
          </ul>
          <p>Запишитесь на диагностику уже сегодня и получите скидку 15% на первый визит!</p>
        `,
          excerpt:
            "Теперь доступна компьютерная диагностика автомобилей всех марок.",
          slug: "new-diagnostic-service",
          image: "/blog/diagnostic.jpg",
          published: true,
          publishedAt: new Date("2024-04-20"),
        },
      ],
      skipDuplicates: true,
    });

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
