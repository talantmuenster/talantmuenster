'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SparkleSoftFilled } from '../ui/SparkleSoftFilled';
import { SectionTitle } from '../ui/Sectiontitle';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';
import styles from './style/home.module.scss'; // ✅ ВАЖНО

export default function HowWeHelp() {
  const t = useTranslations('home.howWeHelp');

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const categories = [
    {
      title: t('category1Title'),
      items: [
        t('category1Item1'),
        t('category1Item2'),
        t('category1Item3'),
      ],
    },
    {
      title: t('category2Title'),
      items: [
        t('category2Item1'),
        t('category2Item2'),
      ],
    },
    {
      title: t('category3Title'),
      items: [
        t('category3Item1'),
        t('category3Item2'),
        t('category3Item3'),
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">

          {/* LEFT */}
          <div className="bg-background-orange rounded-[32px] p-8 lg:p-12 flex flex-col">
            <div className="text-center lg:text-left">
              <SectionTitle
                primary={t('title')}
                secondary={t('titleHighlight')}
                secondaryColor="text-accent"
              />

              <p className="mt-4 text-text-secondary max-w-md mx-auto lg:mx-0">
                {t('subtitle')}
              </p>
            </div>

            {/* Categories */}
            <div className="mt-8">
              <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-6" // ✅ теперь работает
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`bg-white rounded-2xl p-5 ${styles.card}`}
                  >
                    <h3 className="font-medium text-text-primary mb-3">
                      {category.title}
                    </h3>

                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-text-secondary"
                        >
                          <SparkleSoftFilled className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mt-8 text-center lg:text-left">
              <Button withArrow>Узнать больше</Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative rounded-[32px] overflow-hidden">
            <Image
              src="/home/help-image.png"
              alt="Hands together"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
 