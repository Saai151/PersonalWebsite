import { type TabType, TAB_LABELS, ALL_TAB_TYPES } from '@/domain/tabs';
import { useTabStore } from '@/stores/tabStore';
import { ArrowRight } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

let hasAnimatedOnce = false;

export default function HomeView() {
  const openTab = useTabStore((s) => s.openTab);
  const [isTypingDone, setIsTypingDone] = useState(hasAnimatedOnce);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
        {isTypingDone ? (
          "Hey, I'm Saai"
        ) : (
          <TypeAnimation
            sequence={['Hey, I\'m Saai', 1200, 'I\'m a Software Engineer', 1200, 'I like to build cool things', 1200, 'Hey, I\'m Saai', () => { hasAnimatedOnce = true; setIsTypingDone(true); }]}
            wrapper="span"
            speed={20}
            repeat={0}
            cursor={true}
          />
        )}
      </h1>
      <p className="text-white/50 text-lg mb-16">
        Software engineer &amp; builder
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {ALL_TAB_TYPES.map((type) => (
          <TabBox key={type} type={type} label={TAB_LABELS[type]} onOpen={openTab} />
        ))}
      </div>
    </div>
  );
}

function TabBox({
  type,
  label,
  onOpen,
}: {
  type: TabType;
  label: string;
  onOpen: (type: TabType) => void;
}) {
  return (
    <button
      onClick={() => onOpen(type)}
      className="group border border-white/20 rounded-lg p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-200"
    >
      <span className="text-lg font-medium">{label}</span>
      <ArrowRight className="w-4 h-4 mt-3 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
    </button>
  );
}
