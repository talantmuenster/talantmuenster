'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Sparkle, Sparkles } from 'lucide-react';
import { SparkleSoftFilled } from '../ui/SparkleSoftFilled';

export default function WhyChoose() {
  const t = useTranslations('home.whyChoose');

  const features = [
    t('feature1'),
    t('feature2'),
    t('feature3'),
    t('feature4'),
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with decorative circles */}
          <div className="relative order-2 lg:order-1">
          
              {/* Replace with actual image */}
              <Image 
                src="/home/why-choose-image.png" 
                alt="Child learning" 
                width={384} 
                height={384}
                className="object-cover w-full h-full"
              />
  
    
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-heading-xl lg:text-5xl font-bold text-gray-900">
                {t('title')} <span className="text-primary-light">{t('titleBrand')}</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {t('subtitle')}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0  rounded-full flex items-center justify-center mt-1">
                     <SparkleSoftFilled  className="  w-4 h-4  text-primary-light"  />
 
                  </div>
                  <p className="text-gray-900 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}