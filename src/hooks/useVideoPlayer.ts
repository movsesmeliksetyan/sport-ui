import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface UseVideoPlayerProps {
  videoUrl: string;
  onError?: (error: Error) => void;
  autoPlay?: boolean;
}

interface VideoPlayerState {
  isLoading: boolean;
  error: Error | null;
  isPlaying: boolean;
}

export const useVideoPlayer = ({
  videoUrl,
  onError,
  autoPlay = true,
}: UseVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [state, setState] = useState<VideoPlayerState>({
    isLoading: true,
    error: null,
    isPlaying: false,
  });

  const playVideo = async () => {
    if (!videoRef.current) return;
    try {
      // Try to play unmuted first
      videoRef.current.muted = false;
      await videoRef.current.play();
      setState((prev) => ({ ...prev, isPlaying: true }));
    } catch (error) {
      // If unmuted play fails, don't fall back to muted playback
      setState((prev) => ({ ...prev, isPlaying: false }));
      console.warn('Autoplay failed:', error);
    }
  };

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;
    console.log('videoUrl', videoUrl);

    const video = videoRef.current;
    let hls: Hls | null = null;

    const initializePlayer = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        if (videoUrl.includes('.m3u8')) {
          // HLS stream
          if (Hls.isSupported()) {
            hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
              backBufferLength: 90,
            });
            hlsRef.current = hls;

            hls.loadSource(videoUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              setState((prev) => ({ ...prev, isLoading: false }));
              if (autoPlay) {
                playVideo();
              }
            });

            hls.on(Hls.Events.ERROR, (_, data) => {
              if (data.fatal) {
                const error = new Error(`HLS Error: ${data.type}`);
                setState((prev) => ({ ...prev, error }));
                onError?.(error);
              }
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            video.src = videoUrl;
            video.addEventListener('loadedmetadata', () => {
              setState((prev) => ({ ...prev, isLoading: false }));
              if (autoPlay) {
                playVideo();
              }
            });
          }
        } else {
          // Regular video
          video.src = videoUrl;
          setState((prev) => ({ ...prev, isLoading: false }));
          if (autoPlay) {
            playVideo();
          }
        }
      } catch (error) {
        const err =
          error instanceof Error ? error : new Error('Video playback error');
        setState((prev) => ({ ...prev, error: err }));
        onError?.(err);
      }
    };

    initializePlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, [videoUrl, autoPlay, onError]);

  return {
    videoRef,
    ...state,
    play: async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = false;
          await videoRef.current.play();
          setState((prev) => ({ ...prev, isPlaying: true }));
        } catch (error) {
          console.error('Play failed:', error);
        }
      }
    },
    pause: () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setState((prev) => ({ ...prev, isPlaying: false }));
      }
    },
    toggleMute: () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
      }
    },
    restart: async () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        try {
          await videoRef.current.play();
          setState((prev) => ({ ...prev, isPlaying: true }));
        } catch (error) {
          console.error('Restart failed:', error);
        }
      }
    },
  };
};
