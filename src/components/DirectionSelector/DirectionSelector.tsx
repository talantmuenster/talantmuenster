import { DIRECTIONS } from '../../data/direction';
import { DirectionChip } from './DirectionChip';

export function DirectionSelector() {
  return (
    <section className="text-center">
      

      {/* Ссылки */}
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {DIRECTIONS.map((item) => (
          <DirectionChip
            key={item.id}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
