import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data';

interface TestimonialsProps {
  lang: 'en' | 'ar';
  t: any;
}

export default function Testimonials({ lang, t }: TestimonialsProps) {
  const testimonialQuotes: Record<string, string> = {
    t1: t.testimonial1Quote,
    t2: t.testimonial2Quote,
    t3: t.testimonial3Quote,
  };

  const testimonialRoles: Record<string, string> = {
    t1: t.testimonial1Role,
    t2: t.testimonial2Role,
    t3: t.testimonial3Role,
  };

  const testimonialAuthors: Record<string, string> = {
    t1: t.testimonial1Author,
    t2: t.testimonial2Author,
    t3: t.testimonial3Author,
  };

  return (
    <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => {
          const isRed = testimonial.colorType === 'red';
          const quoteText = testimonialQuotes[testimonial.id] || testimonial.quote;
          const authorText = testimonialAuthors[testimonial.id] || testimonial.author;
          const roleText = testimonialRoles[testimonial.id] || testimonial.role;

          return (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`p-10 rounded-3xl relative flex flex-col justify-between h-full group select-none
                ${isRed 
                  ? 'glass-card border-secondary/20 hover:border-secondary/40' 
                  : 'glass-card border-primary/20 hover:border-primary/40'}`}
            >
              {/* Back quote logo */}
              <Quote className={`w-14 h-14 absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300
                ${isRed ? 'text-secondary' : 'text-primary'}`} 
              />

              <div className="space-y-6 text-start">
                {/* Quote Text */}
                <p className="serif-value text-on-surface text-base md:text-lg italic leading-relaxed font-light">
                  {quoteText}
                </p>

                {/* Profile Detail */}
                <div className="flex items-center gap-4">
                  {/* Initials Avatar */}
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-sm select-none shrink-0
                    ${isRed 
                      ? 'bg-secondary/10 border-secondary/30 text-secondary' 
                      : 'bg-primary/10 border-primary/30 text-primary'}`}
                  >
                    {testimonial.initials}
                  </div>

                  <div>
                    <div className="font-bold text-sm md:text-base text-on-surface">
                      {authorText}
                    </div>
                    <div className="text-xs text-on-surface-variant font-medium">
                      {roleText}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
