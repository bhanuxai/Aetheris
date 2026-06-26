import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ShinyText from './react-bits/ShinyText';

const arrowVariants = {
  initial: { x: 0, y: 0 },
  hover: { x: 2, y: -2 }
};

function Blog() {
  const featuredArticle = {
    title: 'What It Takes to Turn AI Into a Business Asset',
    date: 'APR 29, 2026',
    readTime: '8 MIN READ',
    image: '/featured_article_wireframe.png',
    link: '#articles'
  };

  const sideArticles = [
    {
      title: 'Why Your AI Outputs Feel Inconsistent',
      date: 'APR 29, 2026',
      readTime: '3 MIN READ',
      image: '/sails_wireframe.png',
      link: '#articles'
    },
    {
      title: 'From Prompting to Systems: The Real Shift in AI',
      date: 'APR 29, 2026',
      readTime: '2 MIN READ',
      image: '/torus_wireframe.png',
      link: '#articles'
    }
  ];

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative bg-oceanic-noir" id="blog">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left cursor-target">
          <span className="font-mono text-xs tracking-widest text-mystic-mint/45 uppercase block mb-3">
            \\\ ARTICLES
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-arctic-powder font-sans uppercase mb-4 leading-tight">
            <ShinyText text="Insights on neural logic" color="#FFC801" shineColor="#ffffff" speed={4} />
          </h2>
          <p className="text-mystic-mint/70 text-sm sm:text-base max-w-2xl leading-relaxed">
            Deep dives into AI architecture, agent automation, and the future of enterprise intelligence. Stay ahead of the neural curve.
          </p>
        </div>

        {/* Articles Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-arctic-powder/10 pt-12">
          
          {/* Left Column: Featured Article */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            whileHover="hover"
            className="lg:col-span-7 flex flex-col gap-6 text-left group cursor-pointer cursor-target"
          >
            {/* Visual Container */}
            <div className="w-full h-[260px] sm:h-[400px] rounded-lg overflow-hidden relative border border-arctic-powder/10 bg-black">
              <motion.img 
                src={featuredArticle.image}
                alt={featuredArticle.title}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              {/* Gradient Overlay for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />
              
              {/* Overlay Text Inside Visual */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug font-sans group-hover:text-forsythia transition-colors duration-300 flex items-center justify-between gap-3">
                  <span>{featuredArticle.title}</span>
                  <motion.span variants={arrowVariants} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                    <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </motion.span>
                </h3>
              </div>
            </div>

            {/* Metadata bar below visual */}
            <div className="font-mono text-[10px] text-mystic-mint/55 uppercase tracking-wider flex items-center gap-2">
              <span>{featuredArticle.date}</span>
              <span className="text-arctic-powder/20">•</span>
              <span>{featuredArticle.readTime}</span>
            </div>
          </motion.article>

          {/* Right Column: Two Side Articles stacked with a vertical line separator */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-12 lg:border-l lg:border-arctic-powder/10 lg:pl-12">
            {sideArticles.map((article, i) => (
              <motion.article 
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover="hover"
                className="flex gap-6 items-start text-left group cursor-pointer border-t border-arctic-powder/10 pt-8 first:border-none first:pt-0 cursor-target"
              >
                {/* Visual Thumbnail */}
                <div className="w-28 h-20 sm:w-36 sm:h-24 rounded overflow-hidden flex-shrink-0 border border-arctic-powder/10 bg-black">
                  <motion.img
                    src={article.image}
                    alt={article.title}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Details side */}
                <div className="flex flex-col gap-3 flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-arctic-powder leading-snug group-hover:text-forsythia transition-colors duration-300 font-sans flex items-start justify-between gap-2">
                    <span>{article.title}</span>
                    <motion.span variants={arrowVariants} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                      <ArrowUpRight className="w-5 h-5 text-mystic-mint opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                    </motion.span>
                  </h3>
                  
                  {/* Metadata bar */}
                  <div className="font-mono text-[9px] text-mystic-mint/45 uppercase tracking-wider flex items-center gap-2">
                    <span>{article.date}</span>
                    <span className="text-arctic-powder/20">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default Blog;
