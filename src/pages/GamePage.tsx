import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Game } from '../types';

export function GamePage() {
  const { slug } = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setGame(data);
      } catch (error) {
        console.error('Error fetching game:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchGame();
    }
  }, [slug]);

  // Toggle fullscreen for the game container
  const toggleFullScreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error('Error enabling full-screen mode:', err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error('Error disabling full-screen mode:', err);
        });
    }
  };

  // Attempt to remove common ad elements from the iframe (works only if same-origin)
  const handleIframeLoad = () => {
    if (iframeRef.current) {
      try {
        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow?.document;
        if (iframeDoc) {
          const adSelectors = [
            '.ad-container',
            '[id^="ad-"]',
            'iframe[src*="ads"]',
            '.advertisement',
            '.adsbygoogle',
          ];
          adSelectors.forEach((selector) => {
            const ads = iframeDoc.querySelectorAll(selector);
            ads.forEach((ad) => ad.remove());
          });
        }
      } catch (error) {
        console.warn(
          'Unable to access iframe content for ad removal. It may be due to cross-origin restrictions.',
          error
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold">Game not found</h1>
      </div>
    );
  }

  // Structured data for SEO (using schema.org's VideoGame)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description,
    "image": game.thumbnail,
    "url": window.location.href,
    "genre": game.category,
    // Optional properties:
    // "datePublished": "2023-01-01",
    // "publisher": {
    //   "@type": "Organization",
    //   "name": "Your Publisher Name"
    // }
  };

  return (
    <>
      {/* Inject structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-4"
      >
        <div
          ref={containerRef}
          className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl relative"
        >
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              // Exit fullscreen icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 10V7a2 2 0 012-2h3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 14v3a2 2 0 01-2 2h-3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 14v3a2 2 0 002 2h3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 10V7a2 2 0 00-2-2h-3"
                />
              </svg>
            ) : (
              // Enter fullscreen icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 3H5a2 2 0 00-2 2v3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 3h3a2 2 0 012 2v3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 21H5a2 2 0 01-2-2v-3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 21h3a2 2 0 002-2v-3"
                />
              </svg>
            )}
          </button>

          {/* Responsive iframe container */}
          <div className="aspect-[16/9] relative">
            <iframe
              ref={iframeRef}
              src={game.iframe_url}
              title={game.title}
              className="absolute inset-0 w-full h-full"
              allow="fullscreen; autoplay; encrypted-media"
              allowFullScreen
              onLoad={handleIframeLoad}
              sandbox="allow-scripts allow-same-origin allow-fullscreen"
            />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">
              {game.title}
            </h1>
            <p className="text-gray-300 mb-6">{game.description}</p>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                {game.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}