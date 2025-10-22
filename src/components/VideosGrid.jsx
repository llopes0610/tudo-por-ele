"use client";
import { useState } from "react";
import videos from "../data/videos.json";

export default function VideosGrid() {
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);

    return (
        <div className="max-w-5xl mx-auto">
            {/* Player principal */}
            <div className="aspect-video mb-8 rounded overflow-hidden shadow-lg">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    title={selectedVideo.title}
                    allowFullScreen
                ></iframe>
            </div>

            {/* Grid de vídeos */}
            <div className="grid md:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className={`cursor-pointer bg-white rounded shadow hover:shadow-lg transition overflow-hidden border-2 ${selectedVideo.id === video.id
                                ? "border-[#0f1724]"
                                : "border-transparent"
                            }`}
                    >
                        <img
                            src={video.thumbnail}
                            alt={`Miniatura do vídeo ${video.title}`}
                            className="w-full aspect-video object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{video.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                {video.description.substring(0, 80)}...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
