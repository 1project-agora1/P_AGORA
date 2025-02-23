"use client";
import { useEffect, useRef, useState } from "react";
import { Channel } from "../types/ChannerType";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Channel[] | null>(null);

  useEffect(() => {
    async function fetchChannels() {
      if (cache.current) {
        setChannels(cache.current);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/channel/list");
        const result: ApiResponse<Channel[]> = await response.json();

        if (result.success) {
          cache.current = result.data || [];
          setChannels(result.data || []);
        } else {
          setError(result.error || "Unknown error");
        }
      } catch {
        setError("Failed to fetch channels");
      } finally {
        setLoading(false);
      }
    }

    fetchChannels();
  }, []);

  return { channels, loading, error };
}
