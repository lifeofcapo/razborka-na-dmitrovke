import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
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
    { value: "16", label: "16" }
    ];

    for (const vol of volumes) {
    await prisma.engineVolume.upsert({
      where: { value: vol.value },
      update: {},
      create: vol,
    });
  }

    const categories = [
  { slug: 'all', name: 'Все категории' },
  { slug: 'chemistry', name: 'Автохимия' },
  { slug: 'engine', name: 'Двигатель' },
  { slug: 'brake-pads', name: 'Колесные диски покрышки' },
  { slug: 'body-interior', name: 'Кузов внутри' },
  { slug: 'body-exterior', name: 'Кузов наружные элементы' },
  { slug: 'body-glass', name: 'Кузовные стекла' },
  { slug: 'optics', name: 'Оптика' },
  { slug: 'pneumatic', name: 'Пневматическая система' },
  { slug: 'engine-suspension', name: 'Подвеска двигателя и КПП' },
  { slug: 'rear-suspension', name: 'Подвеска задних колес' },
  { slug: 'front-suspension', name: 'Подвеска передних колес' },
  { slug: 'steering', name: 'Рулевое управление' },
  { slug: 'exhaust', name: 'Система выпуска отработанных газов' },
  { slug: 'conditioning', name: 'Система кондиционирования' },
  { slug: 'cooling', name: 'Система охлаждения' },
  { slug: 'related', name: 'Сопутствующие товары' },
  { slug: 'brake-system', name: 'Тормозная система' },
  { slug: 'transmission', name: 'Трансмиссия' },
  { slug: 'electrical', name: 'Электрооснащение' },
];
  
  for (const cat of categories) {
    await prisma.partCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

    const brakeCategory = await prisma.partCategory.findUnique({
    where: { slug: 'brake-system' }
  });
  
  if (brakeCategory) {
    const brakeParts = [
      { name: 'Тормозные колодки', slug: 'brake-pads' },
      { name: 'Тормозные диски', slug: 'brake-discs' },
      // ...
    ];
    
    for (const part of brakeParts) {
      await prisma.carPart.upsert({
        where: { slug: part.slug },
        update: {},
        create: {
          ...part,
          categoryId: brakeCategory.id
        },
      });
    }
  }
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });