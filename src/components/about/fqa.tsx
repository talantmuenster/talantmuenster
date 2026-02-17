'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, Minus } from 'lucide-react';

export type FAQItem = {
  question: string;
  answer: string;
};

type FQAProps = {
  items: FAQItem[];
};

export function FQA({ items }: FQAProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="mt-10 space-y-4"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-white px-4 rounded-sm"
        >
          <AccordionTrigger
            className="
              group
              flex items-center gap-4
              w-full
              justify-start
              text-left
              text-lg
              py-4
              font-medium
              text-primary
              hover:no-underline
              [&>svg]:hidden
            "
          >
            {/* PLUS / MINUS */}
            <span
              className="
                flex items-center justify-center
                w-8 h-8
                rounded-sn1
                bg-primary-light
                text-white
                shrink-0
              "
            >
              <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
              <Minus className="h-4 w-4 hidden group-data-[state=open]:block" />
            </span>

            {item.question}
          </AccordionTrigger>

          <AccordionContent className="pl-12 pb-4 text-lgg text-gray-600 leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
